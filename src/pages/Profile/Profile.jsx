import { Box } from "@mui/material";
import React, { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import EditProfile from "./EditProfile";
import ChangePassword from "../Change Password/ChangePassword";
import BalanceManagement from "../BalanceManagement/BalanceManagement";
import ChargeRequest from "../Charge Request/ChargeRequest";
import EInvoice from "../EInvoice/EInvoice";

function Profile() {
  const [page, setPage] = useState(<EditProfile />);
  const hanldeSetPage = (path) => {
    switch (path) {
      case "profile": {
        setPage(<EditProfile />);
        break;
      }
      case "change-password": {
        setPage(<ChangePassword />);
        break;
      }
      case "balance": {
        setPage(<BalanceManagement />);
        break;
      }
      case "charge-request": {
        setPage(<ChargeRequest />);
        break;
      }
      default: {
        setPage(<EInvoice />);
        break;
      }
    }
  };
  return (
    <Box
      sx={{
        marginTop: 13,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <SideBar hanldeSetPage={hanldeSetPage} />
      <Box
        sx={{
          borderLeft: "1px solid lightgrey",
          paddingLeft: 5,
          width: "80%",
        }}
      >
        {page}
      </Box>
    </Box>
  );
}

export default Profile;
