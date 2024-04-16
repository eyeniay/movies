/* eslint-disable testing-library/prefer-screen-queries */
import { screen, render, getByText } from "test/utils";
import MovieDetailsPage from "pages/movies/detail";
import { Paths } from "utils/constants";
import { MockDetailData } from "mocks/handlers";

const getDetailPage = async () => {
  const { asFragment } = render(<MovieDetailsPage />, {
    route: Paths.MoviesDetail.replace(":id", MockDetailData.imdbID),
    path: Paths.MoviesDetail,
  });
  await screen.findByText(MockDetailData.Title);
  return asFragment;
};

describe("movie detail page tests", () => {
  it("should match snapshot", async () => {
    const view = await getDetailPage();
    expect(view()).toMatchSnapshot();
  });
  it("should display expected titles and values", async () => {
    await getDetailPage();

    const titles = ["Plot", "Director", "Cast", "Duration", "Genre", "Year"];
    const values = [
      MockDetailData.Plot,
      MockDetailData.Director,
      MockDetailData.Actors,
      MockDetailData.Runtime,
      MockDetailData.Genre,
      MockDetailData.Year,
    ];
    const table = await screen.findByRole("table");
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
      if (index >= rows.length - 1) return;
      const title = getByText(
        row.querySelector("th span") as any,
        new RegExp(titles[index], "i")
      );
      const value = getByText(
        row.querySelector("td span") as any,
        new RegExp(values[index], "i")
      );
      expect(title).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });
  });
});
