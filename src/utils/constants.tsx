import { FormattedMessage } from "react-intl";

export const BASE_URL = "https://www.omdbapi.com/";
export const API_KEY = "11f1c5ff";
export const DEFAULT_SEARCH_KEY = "Pokemon";

export const Paths = {
  Home: "/",
  Movies: "/movies",
  MoviesDetail: "/movies/:id/details",
};

export const PaginationDefaults = {
  page: 1,
  pageSize: 10,
};

export const MovieTypes = [
  {
    label: <FormattedMessage id="Movies" />,
    value: "movie",
  },
  { label: <FormattedMessage id="TVSeries" />, value: "series" },
  {
    label: <FormattedMessage id="TVSeriesEpisodes" />,
    value: "episode",
  },
];
