import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import Logo from "./Logo";

function Navbar() {
  return (
    <Box sx={{ bgcolor: "green", flex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
