import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      primary: string;
      primaryText: string;
      main: string;
      secondary: string;
      background: string;
      backgroundText: string;
    };
  }
}
