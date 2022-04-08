import {
  alpha,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import CompanyContext from "../context/companyContext";
import { STATUS_TYPES } from "../utils/commons";

function DataTable() {
  const [data, setData] = useState([]);
  const { partnerCompanies, isFiltering, filteredCompanies } =
    useContext(CompanyContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
    if (!isFiltering) {
      setData(partnerCompanies);
    } else {
      setData(filteredCompanies);
    }
  }, [filteredCompanies, isFiltering, partnerCompanies]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment Modes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{page * rowsPerPage + (index + 1)}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{Badgify(item.status)}</TableCell>
                <TableCell>
                  {item.paymentModes.join(", ").replaceAll("_", " ")}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        colSpan={4}
      />
    </TableContainer>
  );
}

function Badgify(text) {
  if (text === STATUS_TYPES.new) {
    return (
      <Chip
        size="small"
        sx={{
          fontWeight: 500,
          color: "#fff",
          textTransform: "capitalize",
          bgcolor: alpha("#198754", 1),
          border: "0.5px solid #198754",
          borderRadius: "4px",
        }}
        label={text.toLowerCase()}
      />
    );
  } else if (text === STATUS_TYPES.live) {
    return (
      <Chip
        size="small"
        sx={{
          fontWeight: 500,
          color: "#fff",
          bgcolor: alpha("#f00", 1),
          border: "0.5px solid #f00",
          textTransform: "capitalize",
          borderRadius: "4px",
        }}
        label={text.toLowerCase()}
      />
    );
  } else {
    return (
      <Chip
        size="small"
        sx={{
          fontWeight: 500,
          color: "#000",
          bgcolor: alpha("#d3d3d3", 1),
          border: "0.5px solid #222",
          textTransform: "capitalize",
          borderRadius: "4px",
        }}
        label={text.toLowerCase()}
      />
    );
  }
}
export default DataTable;
