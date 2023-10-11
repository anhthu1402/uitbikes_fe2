import { Box } from "@mui/material";
import React from "react";

function SideBarItem({ item, hanldeSetPage }) {
  return (
    <Box
      onClick={() => hanldeSetPage(item.path)}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: 5,
        color: "gray",
        "&:hover": {
          color: "#306c6c",
        },
      }}
    >
      <item.icon />
      <div style={{ marginLeft: 20 }}>{item.title}</div>
    </Box>
  );
}

export default SideBarItem;
