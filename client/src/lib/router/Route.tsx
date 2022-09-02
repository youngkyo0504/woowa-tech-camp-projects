import React from 'react';

interface RouteProps {
  path: string;
  children?: React.ReactNode;
}

export default function Route({ children }: RouteProps) {
  return <>{children};</>;
}
