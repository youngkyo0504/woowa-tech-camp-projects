import { createGlobalStyle } from 'styled-components';
import reset from './reset';
import {
  colorVariable,
  shadowVariable,
  borderRadiusVariable,
  fontSizeVariable,
  spaceVariable,
} from './variables';
import fontVariable from './variables/fontVariable';

const GlobalStyle = createGlobalStyle`
${reset}

@font-face {
    font-family: 'BMDOHYEON';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMDOHYEON.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard-dynamic-subset.css");

#root{
  height: 100%;
}

:root{
    ${colorVariable}
    ${shadowVariable}
    ${borderRadiusVariable}
    ${fontSizeVariable}
    ${spaceVariable}
    ${fontVariable}
}

html,body{
  height:100%;
  font-family: var(--body-font);
  color: var(--body-text-color);
}
#modal-root{
  width:100%;
  height: 100vh;
  position: absolute;
  top:0;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}
`;

export default GlobalStyle;
