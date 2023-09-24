import React from "react";
import MuiAppBar from "@mui/material/AppBar";

function AppAppBar(props) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default AppAppBar;
