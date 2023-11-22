import React, { useEffect, useState } from "react";
import EmptyCart from "../../assets/images/empty_cart.png";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./Cart.css";
import { currency_format } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/auth";

function Cart() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthed, cartNumber, user } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get("http://localhost:9090/api/carts/customer/" + user.customer.id)
      .then((response) => {
        setData(response.data);
        dispatch(authActions.updateCartNumber(response.data.length));
      })
      .catch((error) => console.log(error));
  }, [data, user, dispatch]);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const [cartId, setCartId] = useState();
  const updateQuantity = (cartId, quantity) => {
    axios
      .put(
        "http://localhost:9090/api/carts/" + cartId + "/quantity/" + quantity
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  const handleDeleteCart = (cartId) => {
    axios
      .delete("http://localhost:9090/api/carts/" + cartId)
      .then((response) => {
        console.log(response);
        handleOpenDelete();
      })
      .catch((error) => {
        console.log(error);
        handleOpenDelete();
      });
  };
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
              disabled={params.row.quantity === 1 ? true : false}
              onClick={() => {
                var quantity = params.row.quantity - 1;
                updateQuantity(params.row.id, quantity);
              }}
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
                width: 60,
              }}
              inputProps={{ style: { textAlign: "center" } }}
            />
            <Button
              variant="outlined"
              sx={{ borderColor: "#306c6c", color: "#306c6c" }}
              disabled={
                params.row.quantity === params.row.product.quantity
                  ? true
                  : false
              }
              onClick={() => {
                var quantity = params.row.quantity + 1;
                updateQuantity(params.row.id, quantity);
              }}
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
        return (
          <div>
            {currency_format(params.row.product.price * params.row.quantity)}{" "}
            VNĐ
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 80,
      renderCell: (params) => {
        return (
          <div>
            <Button
              sx={{
                textTransform: "none",
                color: "#306c6c",
              }}
              onClick={() => {
                handleOpenDelete();
                setCartId(params.row.id);
              }}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];
  const [openDischarge, setOpenDischarge] = useState(false);
  const [contentDialog, setContentDialog] = useState("");
  const [buttonDialog, setButtonDialog] = useState("");
  const handleOpenDischarge = (val) => {
    if (val) {
      setContentDialog(
        "Tài khoản của bạn không đủ để thanh toán, vui lòng nạp thêm tiền vào tài khoản."
      );
      setButtonDialog("Nạp tiền");
    } else {
      setContentDialog("Vui lòng điền đầy đủ thông tin cá nhân để giao hàng.");
      setButtonDialog("Trang cá nhân");
    }
    setOpenDischarge(!openDischarge);
  };
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
  const handleDischarge = () => {
    if (user.customer.balance < total) {
      handleOpenDischarge(true);
    } else if (
      user.customer.phone === undefined ||
      user.customer.address === undefined ||
      user.customer.name === undefined ||
      user.customer.idNumber === undefined
    ) {
      handleOpenDischarge(false);
    } else {
      const invoice = {
        total: total,
        customer: user.customer,
      };
      axios
        .post("http://localhost:9090/api/invoices", invoice)
        .then((response) => {
          var newBalance = user.customer.balance - total;
          axios
            .put(
              "http://localhost:9090/api/customers/" +
                user.customer.id +
                "/balance/" +
                newBalance
            )
            .then((result) => {
              selectedRows.map((child) => {
                axios
                  .put(
                    "http://localhost:9090/api/invoices/" +
                      response.data.id +
                      "/product/" +
                      child.product.id +
                      "/quantity/" +
                      child.quantity
                  )
                  .then((res) => {
                    axios
                      .delete("http://localhost:9090/api/carts/" + child.id)
                      .then((result) => {
                        console.log(result);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch((error) => console.log(error));
              });
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
      {cartNumber > 0 ? (
        <Box sx={{ marginTop: 12 }}>
          <DataGrid
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
            <Button
              variant="contained"
              onClick={handleDischarge}
              disabled={numberOfCart === 0 ? true : false}
            >
              Thanh toán ({numberOfCart})
            </Button>
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
                padding: "8px 15px",
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
      <Dialog
        open={openDelete}
        onClose={handleOpenDelete}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa sản phẩm khỏi giỏ hàng?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDelete}>Không</Button>
          <Button onClick={() => handleDeleteCart(cartId)}>Xóa</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDischarge}
        onClose={handleOpenDischarge}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentDialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDischarge}>Đóng</Button>
          <Button>
            <Link to={"/profile"} state={"cart"}>
              {buttonDialog}
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Cart;
