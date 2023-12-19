import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import EditProfile from "./EditProfile";
import ChangePassword from "../Change Password/ChangePassword";
import BalanceManagement from "../BalanceManagement/BalanceManagement";
import ChargeRequest from "../Charge Request/ChargeRequest";
import EInvoice from "../EInvoice/EInvoice";
import "./Profile.css";
import { useLocation } from "react-router-dom";

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const from = location.state === "charge-request" ? location.state : "";
  const [page, setPage] = useState(
    from !== "" ? <ChargeRequest /> : <EditProfile />
  );
  const [path, setPath] = useState(from !== "" ? "charge-request" : "profile");
  const hanldeSetPage = (path) => {
    switch (path) {
      case "profile": {
        setPage(<EditProfile />);
        setPath(path);
        break;
      }
      case "change-password": {
        setPage(<ChangePassword />);
        setPath(path);
        break;
      }
      case "balance": {
        setPage(<BalanceManagement hanldeSetPage={hanldeSetPage} />);
        setPath(path);
        break;
      }
      case "charge-request": {
        setPage(<ChargeRequest />);
        setPath(path);
        break;
      }
      default: {
        setPage(<EInvoice />);
        setPath(path);
        break;
      }
    }
  };
  return (
    <Box
      sx={{
        paddingTop: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <SideBar hanldeSetPage={hanldeSetPage} path={path} />
      <div
        className="profile-page"
        style={{
          borderLeft: "1px solid lightgrey",
          paddingLeft: "40px",
        }}
      >
        {page}
      </div>
    </Box>
  );
}

export default Profile;
