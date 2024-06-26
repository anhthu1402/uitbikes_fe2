import { Box } from "@mui/material";
import React from "react";
import "./SideBarItem.css";
import { useNavigate } from "react-router-dom";

function SideBarItem({ item }) {
  const navigate = useNavigate();
  return (
    <Box
      className="btn-chooseItem"
      onClick={() => {
        if (item.path !== "profile") {
          navigate("/profile/" + item.path);
        } else {
          navigate("/profile");
        }
      }}
      title={item.title}
      sx={
        window.location.pathname.includes(item.path)
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
