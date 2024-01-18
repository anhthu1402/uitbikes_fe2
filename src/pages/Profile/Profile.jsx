import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import EditProfile from "./EditProfile";
import ChangePassword from "../Change Password/ChangePassword";
import BalanceManagement from "../BalanceManagement/BalanceManagement";
import ChargeRequest from "../Charge Request/ChargeRequest";
import EInvoice from "../EInvoice/EInvoice";
import "./Profile.css";
import { Outlet, useLocation } from "react-router-dom";
import Review from "../Review/Review";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/profile",
    children: [
      {
        index: true,
        element: <EditProfile />,
      },
      {
        path: "charge-request",
        element: <ChargeRequest />,
      },
    ],
  },
]);

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const from = location.state === "charge-request" ? location.state : "";
  const [path, setPath] = useState(from !== "" ? "charge-request" : "profile");
  return (
    <Box
      sx={{
        paddingTop: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <SideBar path={path} setPath={setPath} />
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
