import { Box } from "@mui/material";
import React from "react";
import { SideBarData } from "../Data/SideBarData";
import SideBarItem from "../Item/SideBar/SideBarItem";

function SideBar({ path, setPath }) {
  return (
    <Box
      sx={{
        paddingRight: "2em",
      }}
    >
      {SideBarData.map((child, index) => (
        <SideBarItem item={child} key={index} path={path} setPath={setPath} />
      ))}
    </Box>
  );
}

export default SideBar;
