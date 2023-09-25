import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  ButtonGroup,
  Typography,
  InputBase,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const product = location.state;
  const color = ["Đen", "Đỏ", "Vàng", "Xanh"];
  const [quantity, setQuantity] = useState(0);
  const quantityRef = useRef();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (quantity > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [disabled, quantity]);
  const handleIncrease = () => {
    let q = quantity + 1;
    setQuantity(q);
  };
  const handleDecrease = () => {
    let q = quantity - 1;
    setQuantity(q);
  };
  return (
    <Box sx={{ flexGrow: 1, marginTop: 10 }}>
      <Grid container spacing={{ xs: 1, md: 4 }} columns={{ xs: 4, md: 12 }}>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardMedia component={"img"} image={product.image} alt="" />
            <CardContent
              sx={{
                backgroundColor: "lightgray",
                padding: "20px",
                "&:last-child": {
                  paddingBottom: "20px",
                },
              }}
            >
              <Typography variant="h5" component={"div"}>
                Giá bán lẻ đề xuất:{" "}
                <span
                  style={{
                    color: "#306c6c",
                    fontWeight: "bold",
                    fontSize: "26px",
                    marginLeft: 8,
                  }}
                >
                  {product.price} VNĐ
                </span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography
            variant="h4"
            component={"div"}
            sx={{ color: "#306c6c", fontWeight: "bold", marginBottom: 5 }}
          >
            {product.name}
          </Typography>
          <Typography variant="h6" component={"div"}>
            Màu sắc:
          </Typography>
          <Grid container sx={{ marginTop: 3 }}>
            {color.map((child, index) => (
              <Button
                variant="outlined"
                color="success"
                sx={{
                  padding: "5px 10px",
                  marginLeft: 2,
                  textTransform: "none",
                  borderColor: "gray",
                  marginBottom: 3,
                }}
              >
                {child}
              </Button>
            ))}
          </Grid>
          <Typography variant="h6" component={"div"}>
            Số lượng:
          </Typography>
          <ButtonGroup sx={{ margin: 2, marginTop: 3 }}>
            <Button
              onClick={() => handleDecrease()}
              variant="outlined"
              sx={{ borderColor: "#306c6c", color: "#306c6c" }}
              color="success"
              disabled={disabled}
            >
              -
            </Button>
            <InputBase
              onChange={() => {
                if (quantityRef.current.value !== "") {
                  setQuantity(parseInt(quantityRef.current.value));
                } else setQuantity(quantityRef.current.value);
              }}
              inputRef={quantityRef}
              value={quantity}
              inputMode="numeric"
              sx={{
                border: "1px solid #306c6c",
                width: "25%",
                color: "#306c6c",
              }}
              inputProps={{ style: { textAlign: "center" } }}
            />
            <Button
              onClick={() => handleIncrease()}
              variant="outlined"
              sx={{ borderColor: "#306c6c", color: "#306c6c" }}
              color="success"
            >
              +
            </Button>
          </ButtonGroup>
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#306c6c",
                padding: "10px 20px",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#306c60",
                },
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 7 }}>
        <h2>Thông số kỹ thuật</h2>
      </Box>
    </Box>
  );
}

export default ProductDetail;
