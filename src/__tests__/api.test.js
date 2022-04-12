import { fetchData } from "../utils/api";
import { filterFunction, STATUS_TYPES } from "../utils/commons";

test("Fetch data actually fetches a company list", async () => {
  const companies = await fetchData();

  expect(companies).not.toHaveLength(0);
});

describe("Tests for the filter function", () => {
  test("Company name filter works correctly and is case insensitive", async () => {
    const companies = await fetchData();
    const filterParams = {
      // use a name that's available in the data
      searchText: "kemmer",
      status: "",
      paymentModes: [],
    };
    const filteredData = filterFunction(companies, filterParams);
    expect(filteredData[0].name).toMatch(
      new RegExp(`${filterParams.searchText}`, "i")
    );
  });

  test("Status filter works correctly", async () => {
    const companies = await fetchData();
    const filterParams = {
      searchText: "",
      status: STATUS_TYPES.live,
      paymentModes: [],
    };

    const filteredData = filterFunction(companies, filterParams);
    expect(filteredData[0].status).toMatch(new RegExp(`${STATUS_TYPES.live}`));
  });

  test("Payment modes filter works correctly", async () => {
    const companies = await fetchData();
    const filterParams = {
      searchText: "",
      status: "",
      paymentModes: ["CREDIT_CARD", "PAYPAL"],
    };
    const filteredData = filterFunction(companies, filterParams);
    expect(filteredData[0].paymentModes).toEqual(
      expect.arrayContaining(["CREDIT_CARD", "PAYPAL"])
    );
  });
});
