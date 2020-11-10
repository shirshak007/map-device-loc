import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import Loading from "./components/childcomponents/LoadingAnimation";
import { BrowserRouter } from "react-router-dom";

const App = lazy(() => import("./components/App"));
const renderLoader = () => <Loading />;

ReactDOM.render(
  <Suspense fallback={renderLoader()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
  document.querySelector("#root")
);
