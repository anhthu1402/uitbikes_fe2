import { Box } from "@mui/material";
import React from "react";
import { SideBarData } from "../Data/SideBarData";
import SideBarItem from "../Item/SideBar/SideBarItem";

function SideBar({ hanldeSetPage }) {
  return (
    <Box
      sx={{
        paddingRight: 5,
      }}
    >
      {SideBarData.map((child, index) => (
        <SideBarItem item={child} key={index} hanldeSetPage={hanldeSetPage} />
      ))}
    </Box>
  );
}

export default SideBar;
