import { createGlobalStyle } from 'styled-components';

import { defaultTheme } from './theme';

export default createGlobalStyle`
  *{
    margin: 0;
    padding:0;
    outline: 0;
    box-sizing: border-box
  }

  body{
    background: ${defaultTheme.colors.background};
    color:  ${defaultTheme.colors.letters};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: Arial, Helvetica, sans-serif	;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .react-confirm-alert {
    margin: 20px;
  }

  .react-confirm-alert-body {
    width: auto;
    h1{
      font-size: 22px;
      color: #363f5f;
      margin-bottom: 10px;
    }

    .react-confirm-alert-button-group {
      button:first-child {
        background: #e83f5b;
      }
      button:last-child {
        background: #fff;
        color: #3e3b47;
        border: 1px solid #3e3b47;
      }
    }
  }


`;
