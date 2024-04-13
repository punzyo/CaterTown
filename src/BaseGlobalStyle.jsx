import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const BaseGlobalStyle = createGlobalStyle`/* 

*/

/***** base *****/

* {
  margin: 0;
  padding:0;
  box-sizing: border-box;
  font-family:"DM Sans", sans-serif;
}
:root {
  height: 100%;
}
html {
  margin: 0 auto;
}

body {
  font-weight: 400;
  overflow: hidden;
  line-height: 2rem;
}
button {
  border: none;
  outline: none;
}
ul,
ol {
  list-style: none
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}


.hide {
  display: none;
}

${theme.breakpoints.sm} {
  .hide {
    display: none;
  }

}
`;

export default BaseGlobalStyle;
