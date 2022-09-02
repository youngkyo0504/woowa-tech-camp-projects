import { useEffect, useState, useRef } from 'react';
import {
  useFormInputMapAction,
  useFormValidatorMapAction,
  ValidatorMap,
  ValidatorOption,
} from './FormProvider';

/**
 *
 * @param key
 * @param initialValue
 * @param validatorMap
 * @returns
 */
export function useForm<T, S>(
  key: string,
  initialValue: T,
  validatorMap: ValidatorMap<T, S>,
  option?: ValidatorOption,
) {
  /**
   * 첫번째 랜더링에는 validation을 진행하지 않는다.
   */
  const isInitialRender = useRef<boolean>(true);

  /**
   * validate를 함수를 호출하면 자동으로 input에 대한 validateState값을 결정한다.
   * 그러나 validation의 결과만 받고 validateState는 변경하지 않고 싶을 때 validate함수의 파라미터 중 option에서 canChangeValidateState를 false로 처리한다.
   */
  const canChangeValidStateRef = useRef<boolean>(true);

  /**
   * formValidator (모든 input에 대한 검증 결과와 error메시지가 담겨져 있는 객체)에 값을 추가하고 모든 input이 검증을 통과했는 지 확인할 수 있는 메소드가 있다.
   */
  const { formValidatorMapAction } = useFormValidatorMapAction();

  /**
   * 전체 input 값들을 관리하는 formInputMap에 값을 업데이트 할 수 있는 메소드가 존재한다.
   */
  const { formInputMapAction } = useFormInputMapAction();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(!!option?.isInitialValid);
  const [inputValue, setInputValue] = useState<T>(initialValue);

  const [inputValidatorMap, setInputValidatorMap] = useState(() =>
    Object.keys(validatorMap).reduce((prev: { [K in keyof S]: boolean }, cur) => {
      // eslint-disable-next-line no-param-reassign
      prev[cur as keyof S] = false;
      return prev;
    }, {} as { [K in keyof S]: boolean }),
  );

  useEffect(() => {
    const unValidProperties = Object.keys(inputValidatorMap).filter(
      (property) => !inputValidatorMap[property as keyof S],
    );

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (unValidProperties.length === 0) {
      setIsValid(true);
      setErrorMessage(null);
    } else {
      if (canChangeValidStateRef.current) {
        // valid값만 검사하고 input값을 변경하지 않는다면 option에 canChangeValidState를 false로 한다.
        setIsValid(false);
      }
      const firstUnValidateProperty = unValidProperties[0] as keyof S;
      setErrorMessage(validatorMap[firstUnValidateProperty].errorMessage);
    }
  }, [inputValidatorMap]);

  // initial validation
  function validate({
    value,
    canChangeValidState = true,
    validateProperties,
  }: {
    value: T;
    validateProperties?: (keyof ValidatorMap<T, S>)[];
    canChangeValidState?: boolean;
  }) {
    canChangeValidStateRef.current = canChangeValidState;
    const newInputValidatorMap = { ...inputValidatorMap };

    const PropertiesToValidate = (validateProperties ||
      Object.keys(validatorMap)) as (keyof ValidatorMap<T, S>)[];

    const validationResult = PropertiesToValidate.filter((property) => {
      const result = validatorMap[property].validate(value);
      newInputValidatorMap[property] = result;
      return !result;
    }).length;

    setInputValidatorMap(newInputValidatorMap);

    return validationResult === 0;
  }

  /**
   * formValidatorMapAction에 key와 벨류로 등록
   */
  useEffect(() => {
    formValidatorMapAction.add(key, {
      isValid,
      errorMessage,
      validate,
    });
  }, [isValid]);

  useEffect(() => {
    formInputMapAction.onChange(key, inputValue);
  }, [inputValue]);

  return { setIsValid, setErrorMessage, errorMessage, inputValue, setInputValue, validate };
}
