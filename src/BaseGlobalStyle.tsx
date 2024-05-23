import { createGlobalStyle } from 'styled-components';
const BaseGlobalStyle = createGlobalStyle`
/***** base *****/

* {
  margin: 0;
  padding:0;
  box-sizing: border-box;
  font-family:"DM Sans", sans-serif;
  letter-spacing: 0.2px;
}
:root {
  height: 100%;
}
#root{
  height: 100%;
}
html {
  margin: 0 auto;
}

body {
  height:100%;
  font-weight: 400;
  line-height: 2rem;
}
button {
  cursor: pointer;
  background-color:inherit;
  border: none;
  outline: none;
}
input{
  outline: none;
  border: 1px solid black;
}
ul,
ol {
  list-style: none;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}



`;

export default BaseGlobalStyle;
