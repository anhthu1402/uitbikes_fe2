import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { currency_format } from "../../../service";
import axios from "axios";
import "../EInvoice/EInvoiceItem.css";
import { Link } from "react-router-dom";

function NotBeenReviewedItem({ child }) {
  const [openCancel, setOpenCancel] = useState(false);
  const [beenReviewed, setBeenReviewed] = useState(true);
  const handleSetCancel = () => {
    setOpenCancel(!openCancel);
  };
  const handleCancelInvoice = (id) => {
    setOpenCancel(false);
    axios
      .put("http://localhost:9090/api/invoices/" + id + "/status/3")
      .then((res) => {
        alert("Hủy hóa đơn " + child.id + " thành công.");
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (child.status === 2) {
      axios
        .get("http://localhost:9090/api/reviews/invoice/" + child.id)
        .then((res) => {
          if (!res.data) {
            setBeenReviewed(false);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [beenReviewed, child.status, child.id]);
  return (
    <div>
      {!beenReviewed ? (
        <Box>
          <Grid
            className="grid-1"
            container
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            margin={"15px auto"}
          >
            <Grid
              item
              xs={5}
              sm={6}
              md={8}
              sx={{ fontWeight: "bold" }}
              className="invoice-number"
            >
              Hóa đơn số {child.id}
            </Grid>
            <Grid
              className="status"
              item
              xs={7}
              sm={6}
              md={4}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              {!beenReviewed && (
                <Link
                  to={"/review-invoice/" + child.id}
                  state={{
                    details: child.details,
                    customerId: child.customerId,
                  }}
                >
                  <Button
                    className="btn-cancel"
                    variant="contained"
                    color="info"
                    sx={{ marginLeft: 2, textTransform: "none" }}
                  >
                    Đánh giá
                  </Button>
                </Link>
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
                  maxHeight={{ sm: 500, md: 160 }}
                  minHeight={{ sm: 500, md: 160 }}
                >
                  <Grid
                    item
                    className="product-image"
                    xs={12}
                    sm={12}
                    md={3}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    maxHeight={{ xs: 200, sm: 350, md: 130 }}
                    minHeight={{ xs: 200, sm: 350, md: 130 }}
                    component={"img"}
                    src={item.product.image}
                    minWidth={{ xs: 150, sm: 300, md: 100 }}
                    sx={{ objectFit: "contain" }}
                  />
                  <Grid item xs={7} sm={7} md={6}>
                    <div style={{ paddingLeft: "15px" }}>
                      <h5 className="name">{item.product.name}</h5>
                      <p className="color">
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
                    <p style={{ paddingRight: 2 }} className="price">
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
              className="total-price"
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
          <Dialog
            open={openCancel}
            onClose={handleSetCancel}
            fullWidth
            maxWidth="xs"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có muốn hủy hóa đơn này?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={handleSetCancel}>
                Không
              </Button>
              <Button
                color="error"
                onClick={() => handleCancelInvoice(child.id)}
              >
                Hủy
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default NotBeenReviewedItem;
