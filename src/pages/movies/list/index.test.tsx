/* eslint-disable testing-library/prefer-screen-queries */
import { screen, render, getByText } from "test/utils";
import MoviesPage from "pages/movies/list";
import { MockListData } from "mocks/handlers";

describe("movies list page tests", () => {
  it("should match snapshot", async () => {
    const { asFragment } = render(<MoviesPage />);
    await screen.findByText(MockListData.Search[0].imdbID);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should list expected columns", async () => {
    render(<MoviesPage />);

    const columns = ["IMDB ID", "Name", "Release Date"];
    const table = await screen.findByRole("table");
    columns.forEach((column) => {
      const element = getByText(
        table.querySelector("thead") as any,
        new RegExp(column, "i")
      );
      expect(element).toBeInTheDocument();
    });
  });
});
