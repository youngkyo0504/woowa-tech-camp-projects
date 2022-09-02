import AnimatedComponent, { AnimatedKeyFrame } from '@hooks/animation/AnimationComponent';
import { useNavigationType } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';

interface TransitionPageProps {
  depth?: number;
  children: React.ReactNode;
  mountAnimation?: AnimatedKeyFrame[];
  unmountAnimation?: AnimatedKeyFrame[];
  // eslint-disable-next-line no-undef
  keyframeOption?: KeyframeAnimationOptions;
}

export default function TransitionPage({
  mountAnimation,
  unmountAnimation,
  depth = 0,
  children,
  keyframeOption,
}: TransitionPageProps) {
  const navigationType = useNavigationType();
  const hasMountAnimation = navigationType !== 'POP';
  const hasUnmountAnimation = navigationType === 'POP';

  const mountAnimationKeyFrames = mountAnimation || [
    { transform: 'translateX(100%)' },
    { transform: 'translate(0%)' },
  ];
  const unmountAnimationKeyFrames = unmountAnimation || [
    { transform: 'translateX(0%)' },
    { transform: 'translate(100%)' },
  ];

  return (
    <StyledAnimatedDiv
      style={{ zIndex: depth }}
      keyframeOption={keyframeOption}
      onEnter={hasMountAnimation ? mountAnimationKeyFrames : []}
      onExit={hasUnmountAnimation ? unmountAnimationKeyFrames : []}
    >
      {children}
    </StyledAnimatedDiv>
  );
}

const AnimatedDiv = AnimatedComponent('div');
const StyledAnimatedDiv = styled(AnimatedDiv)`
  position: absolute;
  background-color: white;
  width: 100%;
  top: 0;
  overflow-y: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
