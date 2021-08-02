import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: indigo,
    secondary: pink,
  },
});

export default theme;
