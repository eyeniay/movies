import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "layouts";
import React from "react";
import { Paths } from "utils/constants";
import { Spin } from "antd";
import "styles/global.scss";

const LazyMovies = React.lazy(() => import("pages/movies/list"));
const LazyMovieDetailsPage = React.lazy(() => import("pages/movies/detail"));
const LazyNotFound = React.lazy(() => import("pages/404"));
const LazyError = React.lazy(() => import("pages/500"));

function App() {
  const AppLayouts = () => {
    return (
      <AppLayout>
        <Routes>
          <Route path="*" element={<LazyNotFound />} />
          <Route
            path={Paths.Home}
            element={<Navigate to={Paths.Movies} replace />}
          />
          <Route path={Paths.Error} element={<LazyError />} />
          <Route path={Paths.Movies} element={<LazyMovies />} />
          <Route path={Paths.MoviesDetail} element={<LazyMovieDetailsPage />} />
        </Routes>
      </AppLayout>
    );
  };

  return (
    <React.Suspense fallback={<Spin />}>
      <AppLayouts />
    </React.Suspense>
  );
}

export default App;
