import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

function ProductItem() {
  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 3,
        }}
      >
        <CardMedia
          component={"img"}
          height={250}
          image={require("../../../assets/images/XTG_1.png")}
          alt=""
        />
        <CardContent sx={{ backgroundColor: "#3c7474", color: "white" }}>
          <Typography gutterBottom variant="h5" component={"div"}>
            Air Blade 125 Phiên bản Đặc biệt
          </Typography>
          <Typography variant="body1">42.502.909 VNĐ</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductItem;
