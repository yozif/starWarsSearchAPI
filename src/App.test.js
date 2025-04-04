import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("App Functionality", () => {
  test("renders the app correctly", () => {
    render(<App />);
  });

  test("API returns category data when category button is clicked", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [{ title: "A new hope", director: "George Lucas" }],
      })
    );

    render(<App />);

    const categoryButton = screen.getAllByTestId("category-cta")[0];
    fireEvent.click(categoryButton);

    expect(await screen.findByText(/A new hope/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://swapi.dev/api/films?search="
      );
    });
  });

  test("Displays loading state during API call", async () => {
    fetchMock.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ body: JSON.stringify({ results: [] }) }),
            100
          )
        )
    );

    render(<App />);

    const categoryButton = screen.getAllByTestId("category-cta")[0];
    fireEvent.click(categoryButton);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await screen.findByText(/Do you have the correct category selected/i); // For empty results
  });
});
