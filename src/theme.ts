import { DefaultTheme } from 'styled-components';

//styled-components.com/docs/api#create-a-declarations-file
const appTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    primary: 'rgba(0, 122, 255, 1)',
    primaryText: '#fff',
    main: 'cyan',
    secondary: 'magenta',
    background: 'rgba(102, 200, 255, 1)',
    backgroundText: '#000',
  },
};

export { appTheme };
