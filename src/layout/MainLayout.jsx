import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/AppBar/Navigation";
import { Container } from "@mui/material";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <Container>
      <Navigation />
      <div className="main-content" style={{ marginTop: 81 }}>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </Container>
  );
}

export default MainLayout;
