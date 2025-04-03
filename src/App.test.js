import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Functionality", () => {
  test("shows up correctly", () => {
    render(<App />);
  });

  test("API returns category data when category button clicked", () => {
    render(<App />);

    const button = screen.getAllByTestId("category-cta");

    button.forEach(async (btn) => {
      fireEvent.click(btn);
      btn.getAttribute("value") === "films" 
        ? expect(await screen.findByText(/Director/i)).toBeInTheDocument()
        : expect(await screen.findByText(/Model/i)).toBeInTheDocument();
    });
  });
});
