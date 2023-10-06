import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Slide,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";

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
        sx={
          hover
            ? {
                maxWidth: 345,
                borderRadius: 3,
                opacity: "0.5",
                transition: "linear 0.1s",
              }
            : {
                maxWidth: 345,
                borderRadius: 3,
              }
        }
      >
        <CardMedia
          component={"img"}
          height={250}
          image={require("../../../assets/images/XTG_1.png")}
          alt=""
          ref={containerRef}
        />
        <CardContent
          sx={{ backgroundColor: "#3c7474", color: "white", height: 130 }}
        >
          <Typography gutterBottom variant="h5" component={"div"}>
            {item.name}
          </Typography>
          <Typography variant="body1">{item.price} VNĐ</Typography>
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
