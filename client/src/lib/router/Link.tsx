import React, { useContext } from 'react';
import { useRouter } from './Router';

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  children: React.ReactNode;
}

function Link(props: LinkProps) {
  const { children, ...anchorProps } = props;
  const { href } = anchorProps;
  const { navigate } = useRouter();

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (href) {
      navigate(href);
    }
  };

  return <a onClick={onClick}>{children}</a>;
}

export default Link;
