import useTranslate from "hooks/useTranslate";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "layouts";
import React from "react";
import { Paths } from "utils/constants";
import "styles/global.scss";

const LazyMovies = React.lazy(() => import("pages/movies"));

function App() {
  const { locale } = useTranslate();

  const AppLayouts = () => {
    return (
      <AppLayout>
        <Routes>
          <Route path="*" element={<div>{locale("NoFoundText")}</div>} />
          <Route
            path={Paths.Home}
            element={<Navigate to={Paths.Movies} replace />}
          />
          <Route path={Paths.Movies} element={<LazyMovies />}>
            <Route path={Paths.MoviesDetail} element={<LazyMovies />} />
          </Route>
        </Routes>
      </AppLayout>
    );
  };

  return (
    <React.Suspense fallback={<p>{locale("Loading")}</p>}>
      <AppLayouts />
    </React.Suspense>
  );
}

export default App;
