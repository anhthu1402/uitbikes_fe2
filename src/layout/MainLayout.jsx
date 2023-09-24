import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/AppBar/Navigation";
import { Container } from "@mui/material";

function MainLayout() {
  return (
    <Container>
      <Navigation />
      <div className="main-content" style={{ marginTop: 81 }}>
        <Outlet />
      </div>
    </Container>
  );
}

export default MainLayout;
