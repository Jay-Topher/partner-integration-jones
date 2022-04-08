import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import CompanyContext from "../context/companyContext";

function TableFilters() {
  const selectStatuses = ["NEW", "LIVE", "OFFLINE"];
  const paymentModes = [
    { label: "Credit Card", value: "CREDIT_CARD" },
    { label: "Paypal", value: "PAYPAL" },
    { label: "Bank Transfer", value: "BANK_TRANSFER" },
  ];

  const {
    selectedPaymentModes,
    setSelectedPaymentModes,
    status,
    setStatus,
    searchText,
    setSearchText,
    isFiltering,
  } = useContext(CompanyContext);

  const handleMultiSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPaymentModes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(value);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const clearFilters = () => {
    setSearchText("");
    setStatus("");
    setSelectedPaymentModes([]);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontSize: "0.875rem" }}>
        Filters
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <TextField
            type="search"
            fullWidth
            label="By Name"
            size="small"
            value={searchText}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            select
            label="By status"
            size="small"
            value={status}
            sx={{ textTransform: "capitalize" }}
            fullWidth
            onChange={handleSelectChange}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            {selectStatuses.map((item) => (
              <MenuItem
                key={item}
                value={item}
                sx={{ textTransform: "capitalize" }}
              >
                {item.toLowerCase()}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={3}>
          <FormControl fullWidth>
            <InputLabel sx={{ lineHeight: "0.8rem" }}>
              By Payment Mode
            </InputLabel>
            <Select
              label="By Payment Mode"
              size="small"
              fullWidth
              multiple
              value={selectedPaymentModes}
              onChange={handleMultiSelectChange}
            >
              {paymentModes.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  sx={{ textTransform: "capitalize" }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={3}>
          <Button
            type="button"
            variant="contained"
            disableElevation
            fullWidth
            sx={{ textTransform: "capitalize" }}
            disabled={!isFiltering}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TableFilters;
