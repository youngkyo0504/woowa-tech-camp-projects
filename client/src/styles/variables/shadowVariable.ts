import { css } from 'styled-components';

const shadowVariable = css`
  --shadow-sm: 0 0 4px 0 var(--greyOpacity100), 0 4px 16px 0 var(--greyOpacity100);
  --shadow-md: 0 8px 16px 0 var(--greyOpacity200), 0 4px 8px 0 var(--greyOpacity100);
  --shadow-lg: 0 24px 40px 0 var(--greyOpacity50), 0 16px 24px 0 var(--greyOpacity200),
    0 0 8px 0 var(--greyOpacity100);
`;

export default shadowVariable;
