import { useContext, createContext, ReactNode, useState, useMemo, useEffect } from 'react';

export type ToastType = 'SUCCESS' | 'ERROR';

interface IToastMessage {
  toastType: ToastType;
  content: string;
}

interface IToastState {
  isOpened: boolean;
  message?: IToastMessage;
}

const initialToastState = { isOpened: false };
const ToastStateContext = createContext<IToastState>(initialToastState);
const ToastDispatchContext = createContext({
  toastSuccess: (message: string) => {},
  toastError: (error: unknown) => {},
});

export const useToastState = () => {
  const toastContext = useContext(ToastStateContext);
  if (!toastContext) throw new Error('Cannot use Toast provider');
  return toastContext;
};

export const useToast = () => {
  const dispatchToast = useContext(ToastDispatchContext);
  if (!dispatchToast) throw new Error('Cannot use Toast provider');
  return dispatchToast;
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toastState, setToastState] = useState<IToastState>(initialToastState);

  const toastSuccess = (successMessage: string) => {
    setToastState({
      isOpened: true,
      message: {
        toastType: 'SUCCESS',
        content: successMessage,
      },
    });
  };

  const toastError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'error connecting to server';
    setToastState({
      isOpened: true,
      message: {
        toastType: 'ERROR',
        content: errorMessage,
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setToastState(initialToastState);
    }, 2000);
  }, [toastState]);

  const actions = useMemo(() => ({ toastSuccess, toastError }), [setToastState]);

  return (
    <ToastStateContext.Provider value={toastState}>
      <ToastDispatchContext.Provider value={actions}>{children}</ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}
