import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Clear Filter button is enabled once filtering begins", () => {
  render(<App />);

  const clearFilterBtn = screen.getByTestId("filterBtn");
  userEvent.type(screen.getByLabelText(/By Name/), "hello");
  expect(clearFilterBtn).toBeEnabled();
});

test("should clear search input when clear button is clicked", () => {
  render(<App />);

  const clearFilterBtn = screen.getByTestId("filterBtn");
  const searchInput = screen.getByLabelText(/By Name/);
  userEvent.type(searchInput, "hello");
  userEvent.click(clearFilterBtn);
  expect(searchInput.getAttribute("value")).toBe("");
});
