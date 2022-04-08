import "./App.css";
import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import DataTable from "./components/DataTable";
import { useEffect, useState } from "react";
import { fetchData } from "./utils/api";
import TableFilters from "./components/TableFilters";
import CompanyContext from "./context/companyContext";
import { filterFunction } from "./utils/commons";

function App() {
  const [partnerCompanies, setPartnerCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const isFiltering =
    selectedPaymentModes.length > 0 || Boolean(status) || Boolean(searchText);
  useEffect(() => {
    fetchData(setPartnerCompanies);
  }, []);
  useEffect(() => {
    const filtered = filterFunction(partnerCompanies, {
      searchText,
      status,
      paymentModes: selectedPaymentModes,
    });
    setFilteredCompanies(filtered);
  }, [selectedPaymentModes, status, searchText, partnerCompanies]);

  return (
    <CompanyContext.Provider
      value={{
        partnerCompanies,
        filteredCompanies,
        setFilteredCompanies,
        selectedPaymentModes,
        setSelectedPaymentModes,
        status,
        setStatus,
        searchText,
        setSearchText,
        isFiltering,
      }}
    >
      <Box>
        <Navbar />
        <Box component="main" sx={{ mt: 3 }}>
          <Container maxWidth="lg">
            <TableFilters />
            <DataTable />
          </Container>
        </Box>
      </Box>
    </CompanyContext.Provider>
  );
}

export default App;
