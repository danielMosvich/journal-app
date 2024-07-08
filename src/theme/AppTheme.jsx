/* eslint-disable react/prop-types */
import { CssBaseline, ThemeProvider } from "@mui/material";
import { PurpleTheme } from "./purpleTheme";

const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={PurpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
