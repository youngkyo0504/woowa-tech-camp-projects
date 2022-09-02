import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextObject {
  path: string;
  navigate: (href: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const RouterContext = createContext<RouterContextObject>(null!);

export const useRouter = () => useContext(RouterContext);

interface Props {
  children: React.ReactNode;
}

export default function ClientRouter({ children }: Props) {
  const [path, setPath] = useState<string>(window.location.pathname);

  const navigate = (href: string) => {
    if (href !== path) {
      window.history.pushState(null, '', href);
      setPath(href);
    } else {
      window.history.replaceState(null, '', href);
    }
  };

  useEffect(() => {
    // 변하면 setPath를 통해 path를 바꾼다.
    const onPopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}
