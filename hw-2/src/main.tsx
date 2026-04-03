import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App";
import { store } from "./app/store";

import "./fonts/fonts.css";
import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);