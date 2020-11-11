import React from "react";
import { Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./childcomponents/Header";
import InputForm from "./childcomponents/InputForm";
import Map from "./childcomponents/Map";
import NotFound from "./childcomponents/NotFound";
import Home from "./childcomponents/Home.js";
export default function App() {
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
        //props from child to parent to handle theme change
        onchangetheme={(e) => {
          handleChangeTheme(e);
        }}
      />
      <div>
        <Switch>
          {/*All routing happens here*/}
          <Route exact path="/" component={Home} />
          <Route path="/select-sensor" component={InputForm} />
          <Route
            path="/map/:SensorID/:DeviceID"
            render={(props) => <Map {...props} />}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}
