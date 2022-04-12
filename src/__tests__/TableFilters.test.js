import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CompanyContext from "../context/companyContext";
import TableFilters from "../components/TableFilters";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <CompanyContext.Provider {...providerProps}>{ui}</CompanyContext.Provider>,
    renderOptions
  );
};

test("Table Filter renders without crashing", () => {
  const providerProps = {
    value: {
      selectedPaymentModes: [],
      setSelectedPaymentModes: () => {},
      status: "",
      setStatus: () => {},
      searchText: "",
      setSearchText: () => {},
      isFiltering: false,
    },
  };
  customRender(<TableFilters />, { providerProps });
  const filterText = screen.getByText(/^filters$/i);
  expect(filterText).toBeInTheDocument();
});

test("Filter button is disabled on mount", () => {
  const providerProps = {
    value: {
      selectedPaymentModes: [],
      setSelectedPaymentModes: () => {},
      status: "",
      setStatus: () => {},
      searchText: "",
      setSearchText: () => {},
      isFiltering: false,
    },
  };
  customRender(<TableFilters />, { providerProps });
  const clearFilterBtn = screen.getByTestId("filterBtn");
  expect(clearFilterBtn).toBeDisabled();
});
