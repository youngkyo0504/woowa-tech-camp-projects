import React, { createContext, useContext } from 'react';

interface PresenceChildProps {
  isVisible: boolean;
  onExitAnimationDone?: () => void;
  children?: React.ReactNode;
}

export interface PresenceContextProps {
  isVisible: boolean;
  onExitAnimationDone?: () => void;
}

const PresenceContext = createContext<PresenceContextProps>(null!);

export function PresenceChild({ isVisible, onExitAnimationDone, children }: PresenceChildProps) {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PresenceContext.Provider value={{ isVisible, onExitAnimationDone }}>
      {children}
    </PresenceContext.Provider>
  );
}

export function usePresence() {
  const context = useContext(PresenceContext);
  if (!context) {
    return {
      isVisible: true,
    };
  }

  return context;
}
