import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d50000",
      light: "#ff5131",
      dark: "#9b0000"
    },
    secondary: {
      main: "#ffd740",
      light: "#ffff74",
      dark: "#c8a600"
    },
  },
});

export default theme;