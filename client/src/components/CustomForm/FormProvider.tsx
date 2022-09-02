import { useMemo, createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';

export interface ValidatorOption {
  isInitialValid?: boolean;
}

export interface FormValidatorMapAction {
  add: (key: string, validator: unknown) => void;
  checkAllValidate: () => boolean;
  setErrorGlobal: () => void;
}

export interface FormInputMapAction {
  onChange: (key: string, value: unknown) => void;
}

// 각 input값이 validate한지 확인하는 함수와 그에 따른 에러메세지를 제공하는 validator가 있다.
export type Validator<T> = {
  validate: (value: T) => boolean;
  errorMessage: string;
};

/**
 * {
 *  max: {
 *          validate : (value: number) => value < 16,
 *          errorMessage : "16보다 작아야합니다."
 *        }
 *
 *  mix :{
 *          validate : (value: number) => value < 12 ,
 *          errorMessage : "12보다 커야합니다."
 *        }
 * }
 * 각 input들은 이런식으로 여러 validator를 map으로 가질 수 있습니다.
 */
export type ValidatorMap<T, S> = { [K in keyof S]: Validator<T> };

// 전체 form의 validate 상태를 알 수 있는 context
// const FormValidatorMapContext = createContext<Record<string, Validator<any>>>({});

/** 전체 form에 있는 input 값을 알 수 있는 키 밸류 형태 객체 context */
const FormInputMapContext = createContext<Record<string, any>>({});

/**
 *  전체 form에 있는 input 변경 시킬 수 함수등 다양한 액션이 있는 context
 */
const FormInputMapActionContext = createContext<FormInputMapAction>({
  onChange(key, value) {
    return true;
  },
});

// 전체 form에 validator를 등록하는 action, 그리고 전체 validation을 실행할 수 있는 함수
const FormValidatorMapActionContext = createContext<FormValidatorMapAction>({
  add: () => true,
  checkAllValidate: () => true,
  setErrorGlobal: () => undefined,
});

const FormValidationStateContext = createContext<boolean>(false);

export function FormProvider({ children }: { children?: ReactNode }) {
  const [validatorMap, setValidatorMap] = useState<{
    [key: string]: {
      isValid: boolean;
      errorMessage: string;
      validate: (value: any) => boolean;
    };
  }>({});
  const [isAllValidated, setIsAllValidated] = useState(false);
  const formInputMap = useRef<Record<string, unknown>>({}).current;

  const formInputMapAction = useMemo(
    () => ({
      onChange: (key: string, value: unknown) => {
        formInputMap[key] = value;
        // setFormInputMap((prev) => ({ ...prev, [key]: value }));
      },
    }),
    [],
  );

  const formValidatorMapAction = useMemo(
    () => ({
      add: (key: string, validator: any) => {
        setValidatorMap((prev) => ({ ...prev, [key]: validator }));
      },

      checkAllValidate: () => {
        const unValidValues = Object.values(validatorMap).filter(
          (validator: any) => !validator.isValid,
        );
        return unValidValues.length === 0;
      },
      setErrorGlobal() {
        Object.keys(validatorMap).forEach((key) => {
          const { validate } = validatorMap[key];

          validate(formInputMap[key]);
          // validatorMap.image.validate([]);
          // validatorMap[key].validate(formInputMap[key]);
        });
      },
    }),
    [validatorMap],
  );

  useEffect(() => {
    setIsAllValidated(formValidatorMapAction.checkAllValidate());
  }, [validatorMap]);

  return (
    <FormValidationStateContext.Provider value={isAllValidated}>
      <FormValidatorMapActionContext.Provider value={formValidatorMapAction}>
        <FormInputMapActionContext.Provider value={formInputMapAction}>
          <FormInputMapContext.Provider value={formInputMap}>
            {children}
          </FormInputMapContext.Provider>
        </FormInputMapActionContext.Provider>
      </FormValidatorMapActionContext.Provider>
    </FormValidationStateContext.Provider>
  );
}

export function useFormInputMap() {
  const formInputMap = useContext(FormInputMapContext);
  if (!formInputMap) {
    throw new Error('there is no form context in react tree');
  }

  return { formInputMap };
}

export function useFormInputMapAction() {
  const formInputMapAction = useContext(FormInputMapActionContext);
  if (!formInputMapAction) {
    throw new Error('there is no form context in react tree');
  }

  return { formInputMapAction };
}

export function useFormValidatorMapAction() {
  const formValidatorMapAction = useContext(FormValidatorMapActionContext);
  if (!formValidatorMapAction) {
    throw new Error('there is no form context in react tree');
  }

  return { formValidatorMapAction };
}

export function useFormValidationState() {
  const isAllValidated = useContext(FormValidationStateContext);
  if (isAllValidated === null || isAllValidated === undefined) {
    throw new Error('there is no FormValidationStateContext in react tree');
  }

  return { isAllValidated };
}
