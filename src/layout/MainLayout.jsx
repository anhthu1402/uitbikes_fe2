import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/AppBar/Navigation";
import { Container } from "@mui/material";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <Container>
      <Navigation />
      <div className="main-content" style={{ marginTop: 81, marginBottom: 50 }}>
        <Outlet />
      </div>
      <hr
        style={{
          height: "2px",
          borderWidth: 0,
          color: "gray",
          backgroundColor: "gray",
        }}
      />
      <div
        style={{
          marginTop: 40,
        }}
      >
        <Footer />
      </div>
    </Container>
  );
}

export default MainLayout;
