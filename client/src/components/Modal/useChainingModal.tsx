import React, { createContext, useContext, useMemo, useState } from 'react';
import CashModal from './CashModal';
import OrderModal, { OrderModalProps } from './OrderModal';
import PaymentModal from './PaymentModal';
import ConfirmModal from './ConfirmModal';
import CreditModal from './CreditModal';

interface ModalMap {
  cash: React.FC;
  confirm: React.FC;
  payment: React.FC;
  order: React.FC<OrderModalProps>;
  credit: React.FC;
  none: React.ExoticComponent<{
    children?: React.ReactNode;
  }>;
}
type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<infer TProps>
  ? TProps
  : TComponentOrTProps;

type ModalType = keyof ModalMap;
type ModalComponent = ModalMap[ModalType];
interface ModalInfo {
  type: ModalType;
  props: ExtractProps<ModalComponent>;
}

interface Actions {
  closeModal: () => void;
  openModal: (modalInfo: ModalInfo) => () => void;
}

interface ModalContext {
  modalActions: Actions;
  modalMap: ModalMap;
  modalInfo: ModalInfo;
}

const ModalContext = createContext<ModalContext>(null!);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ type: 'none', props: {} });
  const modalMap: ModalMap = useMemo(() => {
    return {
      cash: CashModal,
      confirm: ConfirmModal,
      payment: PaymentModal,
      order: OrderModal,
      credit: CreditModal,
      none: React.Fragment,
    };
  }, []);

  const modalActions = {
    closeModal: () => {
      setModalInfo({ type: 'none', props: {} });
    },
    openModal:
      ({ type, props }: ModalInfo) =>
      () => {
        setModalInfo({ type, props });
      },
  };

  return (
    <ModalContext.Provider value={{ modalInfo, modalMap, modalActions }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useChainingModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalContext does not exist in react tree');
  }

  return context;
};
