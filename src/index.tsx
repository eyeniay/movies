import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "api/store";
import en from "translations/en";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ea5861",
        },
      }}
    >
      <IntlProvider messages={en} locale="en" defaultLocale="en">
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    </ConfigProvider>
  </React.StrictMode>
);
