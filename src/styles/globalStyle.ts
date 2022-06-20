import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
      --blue: #64a8ff;
      --blue400: #4593fc;
      --blue600: #2272eb;
  }

  body {
    background: #e9ecef;
  }
`;

export default GlobalStyle;
