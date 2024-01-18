import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./NotificationItem.css";
import { FormatDateTime, notiEInvoiceStatus } from "../../../service";
import axios from "axios";
import { Link } from "react-router-dom";

function NotificationItem({ item, customerId }) {
  const noti = notiEInvoiceStatus(item.id, item.status);
  const [beenReviewed, setBeenReviewed] = useState(true);
  useEffect(() => {
    if (item.status === 2) {
      axios
        .get("http://localhost:9090/api/reviews/invoice/" + item.id)
        .then((res) => {
          if (!res.data) {
            setBeenReviewed(false);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [beenReviewed, item.status, item.id]);
  return (
    <div className="noti-div">
      <Card
        className="noti-item"
        sx={
          beenReviewed
            ? {}
            : {
                opacity: 0.6,
                position: "relative",
              }
        }
      >
        <CardContent
          className="noti-item-content"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component={"div"}
            className="noti-status"
          >
            {noti.statusNoti}
          </Typography>
          <Typography gutterBottom variant="body2" component={"div"}>
            Hóa đơn số {item.id}
          </Typography>
          {item.details.map(
            (child, index) =>
              index < 1 && (
                <CardMedia
                  key={index}
                  className="noti-item-image"
                  sx={{ maxHeight: 250, minHeight: 250, objectFit: "contain" }}
                  component={"img"}
                  image={child.product.image}
                  alt=""
                />
              )
          )}
          <Typography
            gutterBottom
            variant="body"
            component={"div"}
            className="noti-date"
          >
            Ngày hóa đơn: {FormatDateTime(item.date)}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component={"div"}
            className="noti-noti"
          >
            {noti.noti}
          </Typography>
        </CardContent>
      </Card>
      {!beenReviewed && (
        <Link
          style={{ position: "absolute" }}
          to={"/review-invoice/" + item.id}
          state={{ details: item.details, customerId: item.customerId }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#306c6c",
              textTransform: "none",
            }}
          >
            Đánh giá
          </Button>
        </Link>
      )}
    </div>
  );
}

export default NotificationItem;
