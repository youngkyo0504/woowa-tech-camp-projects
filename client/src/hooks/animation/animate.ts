import React from 'react';

export const getSharedAnimationKeyFrame = <T extends HTMLElement, F extends HTMLElement>(
  sharedElementRef: React.RefObject<T> | undefined,
  AnimatedElementRef: React.RefObject<F>,
) => {
  if (!sharedElementRef) {
    return;
  }

  const sharedElement = sharedElementRef.current;
  const animatedElement = AnimatedElementRef.current;
  if (!(sharedElement && animatedElement)) {
    // eslint-disable-next-line consistent-return
    return [{}];
  }
  const containerCoordinate = sharedElement.getBoundingClientRect();
  const modalCoordinate = animatedElement.getBoundingClientRect();

  const initialScaleX = containerCoordinate.width / modalCoordinate.width;
  const initialScaleY = containerCoordinate.height / modalCoordinate.height;

  const containerCenter = {
    x: (containerCoordinate.left + containerCoordinate.right) / 2,
    y: (containerCoordinate.top + containerCoordinate.bottom) / 2,
  };
  const initialTranslateOriginX = containerCenter.x - modalCoordinate.left;
  const initialTranslateOriginY = containerCenter.y - modalCoordinate.top;
  animatedElement.style.transformOrigin = `${initialTranslateOriginX}px ${initialTranslateOriginY}px`;
  const result = [
    {
      transform: `scaleX(${initialScaleX})  scaleY(${initialScaleY})`,
      opacity: '0',
    },
    {
      opacity: '1',
      transform: 'scale(1) translate3d(0,0,0)',
    },
  ];

  // eslint-disable-next-line consistent-return
  return result;
};
