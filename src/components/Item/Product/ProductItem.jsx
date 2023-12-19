import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Slide,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { currency_format } from "../../../service";
import "./ProductItem.css";

function ProductItem({ item }) {
  const [hover, setHover] = useState(false);
  const handleChange = (val) => {
    setHover(val);
  };
  const containerRef = useRef(null);
  return (
    <div
      onMouseOver={() => handleChange(true)}
      onMouseLeave={() => handleChange(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        className="product-item"
        sx={
          hover
            ? {
                opacity: "0.5",
                transition: "linear 0.1s",
              }
            : {}
        }
      >
        <CardMedia
          className="product-item-image"
          sx={{ maxHeight: 250, minHeight: 250, objectFit: "contain" }}
          component={"img"}
          image={item.image}
          alt=""
          ref={containerRef}
        />
        <CardContent
          className="product-item-content"
          sx={{
            backgroundColor: "#3c7474",
            color: "white",
            height: 130,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component={"div"}
            className="product-item-content-name"
          >
            {item.name}
          </Typography>
          <Typography variant="body1" className="product-item-content-price">
            {currency_format(item.price)} VNĐ
          </Typography>
        </CardContent>
      </Card>
      <Slide
        direction="up"
        in={hover}
        container={containerRef.current}
        style={{ position: "absolute" }}
      >
        <Button
          color="success"
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#77c9c9",
            padding: "8px 13px",
            fontSize: "large",
            color: "black",
            "&:hover": {
              color: "white",
              backgroundColor: "#306c6c",
            },
          }}
        >
          Xem chi tiết
        </Button>
      </Slide>
    </div>
  );
}

export default ProductItem;
