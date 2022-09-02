import { useCallback, useRef, useState, useEffect } from 'react';
import { angleIsVertical, getAngle } from '../util/angle';

interface SlideInfo<T, K> {
  offsetRef: React.RefObject<T>;
  scrollRef: React.RefObject<K>;
  key: string | number;
}

const VELOCITY = 1.2;
const PADDING = 100;

/**
 *
 * @param {}
 * @returns
 * offsetRef: 화면에 보이는 부분을 나타내는 ref
 * scrollRef: 실제 scroll 해야하는 ref
 */
const useSlide = <T extends HTMLElement, K extends HTMLElement>({
  offsetRef,
  scrollRef,
  key,
}: SlideInfo<T, K>) => {
  const [mouseInfo, _] = useState(() => ({
    /** 마우스, 펜, 터치 (클릭여부) */
    isDown: false,
    prevClientY: 0,
    prevClientX: 0,
    startClientY: 0,
    /** 이동한 거리 */
    moveY: 0,
  }));
  const maxInfoRef = useRef<{ maxY: number }>({ maxY: 0 });

  const calcMaxY = () => {
    if (!(offsetRef && offsetRef.current && scrollRef.current)) {
      return;
    }
    const currentScrollHeight = offsetRef.current.offsetHeight;
    const fullScrollHeight = scrollRef.current.scrollHeight;
    const maxTranslateY = fullScrollHeight - currentScrollHeight + PADDING;

    maxInfoRef.current = { maxY: maxTranslateY };
  };

  useEffect(() => {
    mouseInfo.isDown = false;
    mouseInfo.prevClientY = 0;
    mouseInfo.prevClientX = 0;
    mouseInfo.startClientY = 0;
    mouseInfo.moveY = 0;
  }, [key]);

  const isOverLimit = useCallback(
    (y: number) => {
      if (!maxInfoRef.current) {
        return;
      }

      const { maxY } = maxInfoRef.current;

      if (y > -maxY && y <= 0) {
        return true;
      }
      return false;
    },
    [maxInfoRef.current, offsetRef.current, scrollRef.current]
  );

  const scrollStart = ({ clientY, clientX }: React.PointerEvent) => {
    calcMaxY();
    mouseInfo.isDown = true;
    mouseInfo.prevClientY = clientY;
    mouseInfo.prevClientX = clientX;
    mouseInfo.startClientY = clientY;
  };

  const scroll = ({ clientY, clientX }: React.PointerEvent) => {
    if (!scrollRef.current || !mouseInfo.isDown || !maxInfoRef.current) {
      return;
    }
    const { prevClientX, prevClientY } = mouseInfo;
    const angle = getAngle({ x: clientX, y: clientY }, { x: prevClientX, y: prevClientY });
    const isVertical = angleIsVertical(angle);

    if (!isVertical) {
      mouseInfo.prevClientX = clientX;
      mouseInfo.prevClientY = clientY;
      return;
    }

    const { maxY } = maxInfoRef.current;

    const distance = clientY - mouseInfo.prevClientY; // 이동한 거리
    let newMoveY = mouseInfo.moveY + VELOCITY * distance; // 새롭게 이동할 거리를 구한다.

    const isUp = distance > 0;
    const maxValue = isUp ? 0 : -maxY;

    newMoveY = isOverLimit(newMoveY) ? newMoveY : maxValue;

    scrollRef.current.style.transform = `translateY(${newMoveY}px)`;

    mouseInfo.prevClientY = clientY;
    mouseInfo.moveY = newMoveY;
  };

  const scrollStop = ({ clientY }: React.PointerEvent) => {
    if (!scrollRef.current) {
      return;
    }
    const isScrollDown = clientY < mouseInfo.startClientY;
    let distance = scrollRef.current.scrollHeight * 0.1;

    if (isScrollDown) {
      distance *= -1;
    }

    mouseInfo.isDown = false;
    mouseInfo.startClientY = 0;
  };

  const pointerLeave = () => {
    mouseInfo.isDown = false;
  };

  const pointerProps = {
    onPointerUp: scrollStop,
    onPointerDown: scrollStart,
    onPointerMove: scroll,
    onPointerLeave: pointerLeave,
  };

  return pointerProps;
};

export default useSlide;
