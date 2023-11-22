import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import "./NotificationItem.css";
import { FormatDateTime, notiEInvoiceStatus } from "../../../service";

function NotificationItem({ item }) {
  const noti = notiEInvoiceStatus(item.id, item.status);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card className="noti-item">
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
    </div>
  );
}

export default NotificationItem;
