import axios from "axios";
import qs from "query-string";
import { API_KEY, BASE_URL, PaginationDefaults } from "utils/constants";

export interface IMovieRes {
  Response?: string;
  Search: IMovie[];
  totalResults?: string;
}

export interface IMovie {
  Title: string;
  Year: string;
  Poster: string;
  Type: "movie" | "series" | "episode";
  imdbID: string;
}

interface IMovieDetail extends IMovie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  totalSeasons: string;
  Response: string;
}

export interface IMovieFilter {
  s: string;
  y?: string;
  type?: "movie" | "series" | "episode";
  page?: number;
}

const fetchAll = async (
  page: number = PaginationDefaults.page,
  filter?: IMovieFilter
) => {
  const url = qs.stringifyUrl({
    url: BASE_URL,
    query: {
      apikey: API_KEY,
      page: page,
      ...filter,
    },
  });
  const res = await axios.get<IMovieRes>(url);
  return res.data;
};

const findMovie = async (id: string) => {
  const url = qs.stringifyUrl({
    url: BASE_URL,
    query: {
      i: id,
      apikey: API_KEY,
    },
  });
  const res = await axios.get<IMovieDetail>(url);
  return res.data;
};

const moviesAPI = {
  fetchAll,
  findMovie,
};

export default moviesAPI;
