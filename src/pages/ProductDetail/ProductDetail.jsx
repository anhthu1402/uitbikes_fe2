import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  ButtonGroup,
  Typography,
  InputBase,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
  const location = useLocation();
  const product = location.state;
  const [productDetail, setProductDetail] = useState([]);
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9090/api/products/detail/names/" + product.name)
      .then((response) => {
        setProductDetail(response.data);
        setDetail(response.data.detail);
      });
  }, [product, productDetail]);
  const [quantity, setQuantity] = useState(1);
  const [chooseProduct, setChooseProduct] = useState(product.id);
  const [maxQuantity, setMaxQuantity] = useState(product.quantity);
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    detail.map((child) => {
      if (chooseProduct === child.id) {
        setPrice(child.price);
        setImage(child.image);
      }
    });
  }, [image, price, chooseProduct, detail]);
  const quantityRef = useRef();
  const [disabledDecrease, setDisabledDecrease] = useState(true);
  const [disabledIncrease, setDisabledIncrease] = useState(false);
  useEffect(() => {
    if (quantity > 1) {
      setDisabledDecrease(false);
    } else {
      setDisabledDecrease(true);
    }
    if (quantity === maxQuantity) {
      setDisabledIncrease(true);
    } else {
      setDisabledIncrease(false);
    }
  }, [disabledDecrease, disabledIncrease, quantity, maxQuantity]);
  const handleIncrease = () => {
    let q = quantity + 1;
    setQuantity(q);
  };
  const handleDecrease = () => {
    let q = quantity - 1;
    setQuantity(q);
  };
  return (
    <Box sx={{ flexGrow: 1, marginTop: 12 }}>
      <Grid container spacing={{ xs: 1, md: 4 }} columns={{ xs: 4, md: 12 }}>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardMedia
              component={"img"}
              image={require("../../assets/images/XTG_1.png")}
              alt=""
            />
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
                  {price} VNĐ
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
            {detail.map((child, index) => (
              <Button
                variant={chooseProduct === child.id ? "contained" : "outlined"}
                color="success"
                sx={{
                  padding: "5px 10px",
                  marginLeft: 2,
                  textTransform: "none",
                  borderColor: "gray",
                  marginBottom: 3,
                }}
                onClick={() => {
                  setChooseProduct(child.id);
                  setMaxQuantity(child.quantity);
                  setQuantity(1);
                }}
              >
                {child.color}
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
              disabled={disabledDecrease}
            >
              -
            </Button>
            <InputBase
              onChange={() => {
                if (quantityRef.current.value !== "") {
                  if (quantityRef.current.value <= maxQuantity) {
                    setQuantity(parseInt(quantityRef.current.value));
                  }
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
              disabled={disabledIncrease}
            >
              +
            </Button>
          </ButtonGroup>
          <Box>{maxQuantity} sản phẩm có sẵn</Box>
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
        <h2>Thông tin chi tiết</h2>
        <table className="detailTable">
          <tr>
            <td>Hãng xe</td>
            <td>{product.brand.name}</td>
          </tr>
          <tr>
            <td>Loại xe</td>
            <td>{product.type.name}</td>
          </tr>
          <tr>
            <td>Năm sản xuất</td>
            <td>{product.date}</td>
          </tr>
          <tr>
            <td>Phân khối</td>
            <td>{product.cc} cc</td>
          </tr>
        </table>
      </Box>
      <Box>
        <h2>Mô tả</h2>
        <p>{product.describe}</p>
      </Box>
    </Box>
  );
}

export default ProductDetail;
