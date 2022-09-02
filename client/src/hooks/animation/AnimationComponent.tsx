/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react';
import { getSharedAnimationKeyFrame } from './animate';
import { usePresence } from './PresenceChild';

export type AnimatedKeyFrame = {
  [key in keyof React.CSSProperties]: string;
};

interface AnimatedComponentProps<T extends HTMLElement>
  extends React.DetailedHTMLProps<React.HTMLAttributes<T>, T> {
  onExit?: AnimatedKeyFrame[];
  onEnter?: AnimatedKeyFrame[];
  children?: React.ReactNode;
  isVisible?: boolean;
  sharedRef?: React.RefObject<T>;
  slideRef?: React.RefObject<T>;
  // eslint-disable-next-line no-undef
  keyframeOption?: KeyframeAnimationOptions | undefined;
  onExitAnimationDone?: () => void;
}

function AnimatedComponent<T extends HTMLElement>(Tag: keyof React.ReactHTML) {
  return function ({
    onExit = [{}],
    onEnter = [{}],
    keyframeOption,
    children,
    slideRef,
    sharedRef,
    ref,
    ...otherProps
  }: AnimatedComponentProps<T>) {
    const { isVisible, onExitAnimationDone } = usePresence();

    const elementRef = slideRef || useRef<HTMLElement>(null);
    const defaultKeyFrameOption: KeyframeAnimationOptions = {
      duration: 500,
      easing: 'ease-in-out',
      fill: 'forwards',
    };

    useEffect(() => {
      if (!elementRef.current) return;
      const sharedKeyframe = getSharedAnimationKeyFrame(sharedRef, elementRef);
      if (isVisible) {
        const animation = elementRef.current.animate(sharedKeyframe || onEnter, {
          ...defaultKeyFrameOption,
          ...keyframeOption,
        });

        // eslint-disable-next-line consistent-return
        return () => animation.cancel();
      }
      const animation = elementRef.current.animate(sharedKeyframe || onExit, {
        ...defaultKeyFrameOption,
        direction: sharedKeyframe ? 'reverse' : 'normal',
        ...keyframeOption,
      });
      animation.commitStyles();

      animation.finished.then(() => {
        // eslint-disable-next-line no-unused-expressions
        onExitAnimationDone && onExitAnimationDone();
      });

      // eslint-disable-next-line consistent-return
      return () => animation.cancel();
    }, [isVisible]);

    return React.createElement(Tag, { ...otherProps, ref: elementRef }, children);
  };
}

export default AnimatedComponent;
