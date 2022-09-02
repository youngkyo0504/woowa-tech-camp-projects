import React from 'react';
import { createPortal } from 'react-dom';

interface IPortalUtil {
  portalRoot: HTMLElement;
  setPortalRoot: (portalRoot: HTMLElement) => void;
  openPortal: () => ({ children }: { children: React.ReactNode }) => React.ReactPortal | null;
}

const defaultPortalRoot = document.getElementById('root') as HTMLElement;

const portalUtil: IPortalUtil = {
  portalRoot: defaultPortalRoot,

  setPortalRoot(newPortalRoot: HTMLElement) {
    this.portalRoot = newPortalRoot;
  },

  openPortal() {
    return ({ children }: { children: React.ReactNode }) => createPortal(children, this.portalRoot);
  },
};

export default portalUtil;
