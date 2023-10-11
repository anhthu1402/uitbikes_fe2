import React, { useState } from "react";
import EmptyCart from "../../assets/images/empty_cart.png";
import { Box, Button, ButtonGroup, InputBase, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CartData } from "../../components/Data/CartData";
import { DataGrid } from "@mui/x-data-grid";
import "./Cart.css";
import { currency_format } from "../../service";

function Cart() {
  const auth = true;
  const [data, setData] = useState(CartData);
  const columns = [
    {
      field: "image",
      headerName: "Ảnh",
      width: 140,
      renderCell: (params) => {
        return (
          <div>
            <img
              src={params.row.product.image}
              alt=""
              style={{ maxHeight: 60, minHeight: 60 }}
            />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 350,
      renderCell: (params) => {
        return <div>{params.row.product.name}</div>;
      },
    },
    {
      field: "color",
      headerName: "Màu",
      width: 120,
      renderCell: (params) => {
        return <div>{params.row.product.color}</div>;
      },
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 180,
      renderCell: (params) => {
        return (
          <ButtonGroup>
            <Button
              variant="outlined"
              sx={{ borderColor: "#306c6c", color: "#306c6c" }}
              color="success"
              disabled={params.row.quantity === 1 ? true : false}
            >
              -
            </Button>
            <InputBase
              value={params.row.quantity}
              contentEditable={false}
              inputMode="numeric"
              sx={{
                border: "1px solid #306c6c",
                color: "#306c6c",
                width: 55,
              }}
              inputProps={{ style: { textAlign: "center" } }}
            />
            <Button
              variant="outlined"
              sx={{ borderColor: "#306c6c", color: "#306c6c" }}
              color="success"
            >
              +
            </Button>
          </ButtonGroup>
        );
      },
    },
    {
      field: "total",
      headerName: "Đơn giá",
      width: 180,
      renderCell: (params) => {
        return <div>{currency_format(params.row.product.price)} VNĐ</div>;
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 70,
      renderCell: (params) => {
        return (
          <div>
            <Button>Xóa</Button>
          </div>
        );
      },
    },
  ];
  const [numberOfCart, setNumberOfCart] = useState(0);
  const [total, setTotal] = useState(0);
  const handleChooseCart = (array) => {
    setNumberOfCart(array.length);
    let price = 0;
    array.map((child) => {
      price += child.product.price * child.quantity;
    });
    setTotal(price);
  };
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <div>
      {auth ? (
        <Box sx={{ marginTop: 12 }}>
          <DataGrid
            hideFooterPagination
            hideFooter
            rowHeight={90}
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            checkboxSelection
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = data.filter((row) =>
                selectedIDs.has(row.id)
              );
              handleChooseCart(selectedRows);
              setSelectedRows(selectedRows);
            }}
          />
          <Box
            sx={{
              margin: "50px auto",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">
              Tổng tiền: {currency_format(total)} VNĐ
            </Typography>
            <Button variant="contained">Thanh toán ({numberOfCart})</Button>
          </Box>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src={EmptyCart} alt="" width={300} />
          <Link to={"/"}>
            <Button
              variant="contained"
              sx={{
                marginTop: 5,
                backgroundColor: "#306c6c",
                padding: "10px 20px",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#306c60",
                },
              }}
            >
              Trang chủ
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
