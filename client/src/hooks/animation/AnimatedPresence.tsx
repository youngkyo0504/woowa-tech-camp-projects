import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PresenceChild } from './PresenceChild';

/**
 * ReactElement인지 확인 (reactNode라면 cloneElement가 안됨)
 */
function getAllValidChildren(children: React.ReactNode) {
  const validChildren: React.ReactElement[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      validChildren.push(child);
    }
  });

  return validChildren;
}

function getKey(element: React.ReactElement) {
  return element.key ?? 'defaultKey';
}

/**
 *
 * @param validChildren
 * @param map
 * @returns
 *
 * 바로 아래 계층 자식 reactElement를 key를 통해 찾기 쉽게 map을 만든다.
 */
function getElementByKeyMap(
  validChildren: React.ReactElement[],
  map: Record<string, React.ReactElement>,
) {
  return validChildren.reduce((acc, child) => {
    const key = getKey(child);
    acc[key] = child;
    return acc;
  }, map);
}

/**
 *
 * @returns
 * 랜더를 강제하는 함수
 */
function useForceRender() {
  const [_, setCount] = useState(0);

  return useCallback(() => setCount((prev) => prev + 1), []);
}

/**
 *
 * @param param0
 * @returns
 *
 * 애니메이션을 가진 컴포넌트(animationComponent.tsx)들은 isVisible이란 값을 컨텍스트를 통해 받는다.
 * isVisible이 true면 onEnter애니메이션 , false라면 onExit애니메이션이 실행된다.
 *
 * 1. 현재 리액트 랜더트리에 있는 children를 기억한다.
 * 2. 임의의 state가 변하면 다시 랜더링된다.
 * 3. 기억했던 children 중 랜더트리에 없어진다면(기억한 children과 현재 children을 key로 비교)
 * 4. 사라져야할 child을 contextProvider(isVisible=false 값을 가짐)로 감싼 컴포넌트로 바꿔 랜더링한다.
 * 5. 새로 생긴 children도 contextProvider(isVisible = true)로 감싼 컴포넌트로 바꿔 랜더링한다.
 * 6. 애니메이션이 끝나면 강제 랜더링 한다.
 */
export function AnimatePresence({
  children,
  animateBeforeExit = false,
}: {
  children: React.ReactNode;
  animateBeforeExit?: boolean;
}) {
  const forceRender = useForceRender();

  const validChildren = getAllValidChildren(children);
  const childrenOfPreviousRender = useRef(validChildren);
  const elementByKey = useRef(getElementByKeyMap(validChildren, {}));

  useEffect(() => {
    childrenOfPreviousRender.current = validChildren;
  });

  useLayoutEffect(() => {
    elementByKey.current = getElementByKeyMap(validChildren, elementByKey.current);
  });

  const currentKeys = validChildren.map(getKey);
  const previousKeys = childrenOfPreviousRender.current.map(getKey);
  const removedChildrenKey = new Set(previousKeys.filter((key) => !currentKeys.includes(key)));

  let childrenToRender: React.ReactElement<any, string | React.JSXElementConstructor<any>>[] = [];

  // (새로운 children 랜더링)
  if (animateBeforeExit || !removedChildrenKey.size) {
    childrenToRender = validChildren.map((child) => (
      <PresenceChild key={getKey(child)} isVisible>
        {child}
      </PresenceChild>
    ));
  }

  removedChildrenKey.forEach((removedKey) => {
    const element = elementByKey.current[removedKey];

    const elementIndex = previousKeys.indexOf(removedKey);

    const onExitAnimationDone = () => {
      removedChildrenKey.delete(removedKey);

      if (!removedChildrenKey.size) {
        forceRender();
      }
    };

    childrenToRender.splice(
      elementIndex,
      0,
      <PresenceChild
        key={getKey(element)}
        isVisible={false}
        onExitAnimationDone={onExitAnimationDone}
      >
        {element}
      </PresenceChild>,
    );
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{childrenToRender}</>;
}
