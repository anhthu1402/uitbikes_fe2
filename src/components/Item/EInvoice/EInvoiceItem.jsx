import { Box, Button, Grid, Paper } from "@mui/material";
import React from "react";
import { currency_format, getEInvoiceStatus } from "../../../service";

function EInvoiceItem({ child }) {
  return (
    <Box>
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        margin={"15px auto"}
      >
        <Grid item xs={8} md={8} sx={{ fontWeight: "bold" }}>
          Hóa đơn số {child.id}
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
        >
          {getEInvoiceStatus(child.status)}
          {child.status === 0 && (
            <Button
              variant="contained"
              sx={{ marginLeft: 2, textTransform: "none" }}
            >
              Hủy
            </Button>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {child.details.map((item, ind) => (
          <Paper
            key={ind}
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <Grid
              container
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              maxHeight={{ xs: 350, md: 150 }}
              minHeight={{ xs: 350, md: 150 }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                maxHeight={{ xs: 250, md: 120 }}
                minHeight={{ xs: 250, md: 120 }}
                component={"img"}
                src={item.product.image}
                minWidth={100}
              />
              <Grid item xs={7} sm={7} md={6}>
                <div style={{ paddingLeft: "15px" }}>
                  <h5>{item.product.name}</h5>
                  <p>
                    {item.product.color} x{item.quantity}
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={5}
                sm={5}
                md={3}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <p style={{ paddingRight: 2 }}>
                  {currency_format(item.quantity * item.product.price)} VNĐ
                </p>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
      <p style={{ textAlign: "right" }}>
        <b>Thành tiền:</b>{" "}
        <span
          style={{
            color: "#306c6c",
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: 8,
          }}
        >
          {currency_format(child.total)} VNĐ
        </span>
      </p>
    </Box>
  );
}

export default EInvoiceItem;
