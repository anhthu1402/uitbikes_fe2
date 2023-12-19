import { Box } from "@mui/material";
import React from "react";
import "./SideBarItem.css";

function SideBarItem({ item, hanldeSetPage, path }) {
  return (
    <Box
      className="btn-chooseItem"
      onClick={() => {
        hanldeSetPage(item.path);
      }}
      title={item.title}
      sx={
        item.path === path
          ? {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: 5,
              color: "#306c6c",
            }
          : {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: 5,
              color: "gray",
              "&:hover": {
                color: "#306c6c",
              },
            }
      }
    >
      <item.icon />
      <div className="sidebarItemTitle" style={{ marginLeft: 20 }}>
        {item.title}
      </div>
    </Box>
  );
}

export default SideBarItem;
