import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/AppBar/Navigation";
import { Container, Fab } from "@mui/material";
import Footer from "../components/Footer/Footer";
import SearchFilter from "../components/Search/SearchFilter";
import { ChatRounded } from "@mui/icons-material";
import "./MainLayout.css";
import CustomerService from "../components/CustomerService/CustomerService";
import { useSelector } from "react-redux";

function MainLayout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [chatBox, setChatBox] = useState(false);
  const { isAuthed } = useSelector((state) => state.auth);
  return (
    <Container sx={{ position: "relative" }}>
      <Navigation />
      {isAuthed && (
        <div className="chatBtnDiv" onClick={() => setChatBox(!chatBox)}>
          <Fab sx={{ backgroundColor: "#306c6c" }}>
            <ChatRounded sx={{ color: "white" }} />
          </Fab>
        </div>
      )}
      {chatBox === true && <CustomerService setChatBox={setChatBox} />}
      <div
        className="main-content"
        style={{
          marginTop: 81,
          marginBottom: 25,
          minHeight: "45vh",
        }}
      >
        <Outlet />
      </div>

      <SearchFilter />
      <div
        style={{
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
