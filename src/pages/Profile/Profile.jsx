import { Box } from "@mui/material";
import React, { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./Profile.css";
import { Outlet } from "react-router-dom";

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box
      sx={{
        paddingTop: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <SideBar />
      <div
        className="profile-page"
        style={{
          borderLeft: "1px solid lightgrey",
          paddingLeft: "40px",
        }}
      >
        <Outlet />
      </div>
    </Box>
  );
}

export default Profile;
