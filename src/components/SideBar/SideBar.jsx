import { Box } from "@mui/material";
import React from "react";
import { SideBarData } from "../Data/SideBarData";
import SideBarItem from "../Item/SideBar/SideBarItem";

function SideBar({ hanldeSetPage, path }) {
  return (
    <Box
      sx={{
        paddingRight: "2em",
      }}
    >
      {SideBarData.map((child, index) => (
        <SideBarItem
          item={child}
          key={index}
          hanldeSetPage={hanldeSetPage}
          path={path}
        />
      ))}
    </Box>
  );
}

export default SideBar;
