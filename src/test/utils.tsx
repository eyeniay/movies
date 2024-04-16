import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "api/store";
import en from "translations/en";
import { IntlProvider } from "react-intl";
import "@testing-library/jest-dom/extend-expect";

const customRender = (
  ui: ReactElement,
  { route = "/", path = "/" } = {},
  options?: Omit<RenderOptions, "wrapper">
) => {
  const wrapper: FC<any> = ({ children }) => (
    <IntlProvider messages={en} locale="en" defaultLocale="en">
      <Provider store={store}>
        <Router initialEntries={route ? [route] : undefined}>
          <Routes>
            <Route index path={path} element={children} />
          </Routes>
        </Router>
      </Provider>
    </IntlProvider>
  );
  return render(ui, { wrapper: wrapper, ...options });
};

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

export * from "@testing-library/react";
export { customRender as render };
