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

export interface IMovieDetail extends IMovie {
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
