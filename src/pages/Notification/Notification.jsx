import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationItem from "../../components/Item/Notification/NotificationItem";
import axios from "axios";
import { useSelector } from "react-redux";

function Notification() {
  const [invoiceData, setInvoiceData] = useState([]);
  const { isAuthed, user } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get(
        "http://localhost:9090/api/invoices/customer/" +
          user.customer.id +
          "/status/-1"
      )
      .then((response) => {
        setInvoiceData(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [invoiceData]);
  return (
    <Box sx={{ marginTop: "90px", flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 2, sm: 8, md: 8, lg: 12 }}
      >
        {invoiceData &&
          invoiceData.map((child, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} marginBottom={2}>
              <NotificationItem item={child} key={index} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Notification;
