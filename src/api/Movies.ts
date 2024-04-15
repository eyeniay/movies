import axios from "axios";
import qs from "query-string";
import { BASE_URL, PaginationDefaults } from "utils/constants";

export interface IMovieRes {
  Response?: string;
  Search: IMovie[];
  totalResults?: string;
}

interface IMovie {
  Title: string;
  Year: string;
  Poster: string;
  Type: "movie" | "series" | "episode";
  imdbID: string;
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
      i: "tt3896198",
      apikey: "11f1c5ff",
      page: page,
      ...filter,
    },
  });
  const res = await axios.get<IMovieRes>(url);
  return res.data;
};

const moviesAPI = {
  fetchAll,
};

export default moviesAPI;
