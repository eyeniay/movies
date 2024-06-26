import { rest } from "msw";
import { BASE_URL } from "utils/constants";

export const MockDetailData = {
  Title: "Pokémon: Detective Pikachu",
  Year: "2019",
  Rated: "PG",
  Released: "10 May 2019",
  Runtime: "104 min",
  Genre: "Action, Adventure, Comedy",
  Director: "Rob Letterman",
  Writer: "Dan Hernandez, Benji Samit, Rob Letterman",
  Actors: "Ryan Reynolds, Justice Smith, Kathryn Newton",
  Plot: "In a world where people collect Pokémon to do battle, a boy comes across an intelligent talking Pikachu who seeks to be a detective.",
  Language: "English, Japanese",
  Country: "United States, Japan, United Kingdom, Canada",
  Awards: "10 nominations",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMDkxNzRmNDYtMDY0OS00N2JhLTkzZWUtMWE3MzZkNDk1MmJiXkEyXkFqcGdeQXVyNTA3MTU2MjE@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "6.5/10",
    },
    {
      Source: "Rotten Tomatoes",
      Value: "68%",
    },
    {
      Source: "Metacritic",
      Value: "53/100",
    },
  ],
  Metascore: "53",
  imdbRating: "6.5",
  imdbVotes: "181,696",
  imdbID: "tt5884052",
  Type: "movie",
  DVD: "23 Jul 2019",
  BoxOffice: "$144,174,568",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};
export const MockListData = {
  Search: [
    {
      Title: "Pokémon: Detective Pikachu",
      Year: "2019",
      imdbID: "tt5884052",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMDkxNzRmNDYtMDY0OS00N2JhLTkzZWUtMWE3MzZkNDk1MmJiXkEyXkFqcGdeQXVyNTA3MTU2MjE@._V1_SX300.jpg",
    },
  ],
  totalResults: "1",
  Response: "True",
};

export const handlers = [
  rest.get(BASE_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(req.url.searchParams.get("i") ? MockDetailData : MockListData)
    );
  }),
];
