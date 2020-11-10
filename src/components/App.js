import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./childcomponents/Header";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [Theme, setTheme] = React.useState("");
  const handleChangeTheme = (theme) => {
    setTheme(theme);
  };
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: Theme ? "light" : "dark",
        },
      }),
    [Theme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        value={Theme}
        onchangetheme={(e) => {
          handleChangeTheme(e);
        }}
      />
    </ThemeProvider>
  );
}
