import styled from 'styled-components';
import AnimatedComponent from '../lib/animation/animationComponent';

export const FlexCenter = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Mockup = styled.div`
  background-color: black;
  height: var(--screen-height);
  width: var(--screen-width);
  border-width: calc(var(--screen-width) / 50);
  overflow-x: hidden;
  border-radius: calc(var(--screen-width) / (20));
  z-index: 100;
  position: relative;
  box-shadow: 0 0.5em 2em 0.2em rgba(0, 0, 0, 0.33), 0 0 0 0.5px #000 inset;
`;

export const Button = styled.button`
  --px: var(--space-3);
  --py: var(--space-2);
  --w: var(--space-4);
  --bg-color: var(--grey100);
  --text-color: var(--grey700);

  padding: var(--py) var(--px);
  background-color: var(--bg-color);
  color: var(--text-color);

  cursor: pointer;
`;

const animatedDiv = AnimatedComponent('div');
export const ModalWrapper = styled(animatedDiv)`
  position: absolute;
  z-index: 3000;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: var(--rounded-xl);
  width: 60%;
  height: 600px;

  display: flex;
  box-shadow: var(--shadow-lg);
  flex-direction: column;
  padding: var(--space-6);
`;

export const RelativeContainer = styled.div`
  position: relative;
`;
