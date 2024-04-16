import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "utils/constants";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["movies", "moviesDetail"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}),
});

export default api;
