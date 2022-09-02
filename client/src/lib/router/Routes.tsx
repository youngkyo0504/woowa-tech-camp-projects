import React from 'react';
import { useRouter } from './Router';

interface RoutesProps {
  children?: React.ReactNode;
  path: string;
}

export default function Routes({ children, path }: RoutesProps) {
  const matches: React.ReactElement[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }
    if (child.props.path === path) {
      matches.push(child.props.children);
    }
  });

  if (matches.length === 0) {
    window.history.pushState(null, '', '/404');
  }

  return <>{matches}</>;
}
