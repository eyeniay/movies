import api from "api";
import { IMovieDetail, IMovieFilter, IMovieRes } from "api/types";
import { API_KEY } from "utils/constants";

const movieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<IMovieRes, IMovieFilter>({
      query: (params) =>
        `?apikey=${API_KEY}&${new URLSearchParams(
          params as Record<string, any>
        ).toString()}`,
      providesTags: ["movies"],
    }),
    getMovieDetails: builder.query<IMovieDetail, string>({
      query: (id) => `?apikey=${API_KEY}&i=${id}`,
      providesTags: ["moviesDetail"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMoviesQuery, useGetMovieDetailsQuery } = movieApi;
