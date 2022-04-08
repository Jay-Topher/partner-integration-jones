import { Box } from "@mui/material";
import React from "react";
import logoSrc from "../assets/holidu-logo.png";

function Logo() {
  return (
    <Box
      sx={{
        width: "7.5rem",
        "& img": {
          width: "100%",
        },
      }}
    >
      <img alt="holidu" src={logoSrc} />
    </Box>
  );
}

export default Logo;
