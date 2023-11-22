import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/AppBar/Navigation";
import { Container } from "@mui/material";
import Footer from "../components/Footer/Footer";
import SearchFilter from "../components/Search/SearchFilter";

function MainLayout() {
  return (
    <Container sx={{ position: "relative" }}>
      <Navigation />
      <div
        className="main-content"
        style={{
          marginTop: 81,
          marginBottom: 50,
          minHeight: "45vh",
        }}
      >
        <Outlet />
      </div>

      <SearchFilter />
      <div
        style={{
          marginTop: 40,
          bottom: 0,
        }}
      >
        <hr
          style={{
            height: "2px",
            borderWidth: 0,
            color: "gray",
            backgroundColor: "gray",
            marginBottom: 40,
          }}
        />
        <Footer />
      </div>
    </Container>
  );
}

export default MainLayout;
