import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ChargeRequest() {
  const user = useSelector((state) => state.auth.user);
  const [date, setDate] = useState(null);
  const moneyRef = useRef();
  const accountNumberRef = useRef();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };
  const handleReset = () => {
    if (moneyRef.current) {
      moneyRef.current.value = null;
    }
    if (accountNumberRef.current) {
      accountNumberRef.current.value = null;
    }
    setDate(null);
  };
  const handleRequest = () => {
    const money = moneyRef.current.value;
    const accountNumber = accountNumberRef.current.value;
    if (!money || !accountNumber || !date) {
      alert("Vui lòng điền đầy đủ thông tin.");
    }
    const request = {
      customer: user.customer,
      date: date,
      money: money,
      accountNumber: accountNumber,
    };
    axios
      .post("http://localhost:9090/api/requests", request)
      .then((response) => {
        console.log(response.data);
        handleOpenDialog();
        handleReset();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <h2>Nạp tiền qua MOMO</h2>
      <p>
        Thời gian phản hồi trong vòng ít nhất 24h kể từ thời gian khách hàng
        nhập thông tin nạp tiền bên dưới.
      </p>
      <Grid
        container
        spacing={{ xs: 1, md: 4 }}
        columns={{ xs: 4, md: 12 }}
        direction={"row"}
        alignItems={"center"}
      >
        <Grid item xs={12} sm={6} md={6}>
          <div style={{ textAlign: "center" }}>
            <img
              style={{ objectFit: "contain" }}
              width={300}
              src="https://res.cloudinary.com/dpwehcnso/image/upload/v1697043439/uitbikes/momo2_riu6sp.png?fbclid=IwAR1G31BaMzRSz9oGLHketHjUqVB8tLkuw0YykcZyekr2f4cXd2zz6fIKGgw"
              alt=""
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <div style={{ textAlign: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ marginBottom: 3 }}
              >
                <DatePicker
                  value={date}
                  format="DD/MM/YYYY"
                  sx={{ width: "100%" }}
                  label="Ngày nạp tiền"
                  onChange={(e) => setDate(e)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              label="Số tài khoản"
              fullWidth
              sx={{ marginBottom: 3 }}
              inputRef={accountNumberRef}
            />
            <TextField
              label="Số tiền"
              fullWidth
              sx={{ marginBottom: 3 }}
              inputRef={moneyRef}
            />
            <Button
              onClick={handleRequest}
              variant="contained"
              sx={{
                backgroundColor: "#306c6c",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#306c60",
                },
              }}
            >
              Nạp tiền
            </Button>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleOpenDialog}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Gửi thông tin nạp tiền thành công. Vui lòng chờ quản trị viên xác
            nhận yêu cầu.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChargeRequest;
