import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ChangePassword() {
  const dispatch = useDispatch();
  const { isAuthed, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(user.email);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [openDialog, setOpenDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState("");
  const handleOpenDialog = (val) => {
    if (val) {
      setContentDialog("Đổi mật khẩu thành công.");
    } else {
      setContentDialog("Đổi mật khẩu không thành công.");
    }
    setOpenDialog(!openDialog);
  };
  const handleReset = () => {
    if (oldPasswordRef.current) {
      oldPasswordRef.current.value = null;
    }
    if (newPasswordRef.current) {
      newPasswordRef.current.value = null;
    }
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.value = null;
    }
    setError(null);
  };
  const [error, setError] = useState(null);
  const handleChangePassword = () => {
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setError("Vui lòng điền đầy đủ các thông tin!");
    }
    var loginForm = {
      email: email,
      pw: oldPassword,
    };
    axios
      .post("http://localhost:9090/api/accounts/signin", loginForm)
      .then((response) => {
        if (response.data.email === undefined) {
          return setError("Mật khẩu không đúng.");
        } else {
          if (newPassword !== confirmPassword) {
            return setError("Mật khẩu mới không khớp.");
          } else {
            loginForm.pw = newPassword;
            axios
              .put("http://localhost:9090/api/accounts/password", loginForm)
              .then((res) => {
                handleOpenDialog(res.data);
                handleReset();
              })
              .catch((error) => console.log(error));
          }
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Box>
      <Box>
        <TextField
          label="Email"
          fullWidth
          sx={{ marginBottom: 5 }}
          defaultValue={email}
          disabled
        />
        <FormControl sx={{ marginBottom: 5 }} fullWidth variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ backgroundColor: "white" }}
          >
            Mật khẩu cũ *
          </InputLabel>
          <OutlinedInput
            autoComplete="new-password"
            inputRef={oldPasswordRef}
            id="outlined-adornment-password"
            type={showOldPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowOldPassword}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ marginBottom: 5 }} fullWidth variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ backgroundColor: "white" }}
          >
            Mật khẩu mới *
          </InputLabel>
          <OutlinedInput
            inputRef={newPasswordRef}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ marginBottom: 5 }} fullWidth variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ backgroundColor: "white" }}
          >
            Nhập lại mật khẩu *
          </InputLabel>
          <OutlinedInput
            inputRef={confirmPasswordRef}
            id="outlined-adornment-password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 5 }}>
          {error}
        </Alert>
      )}
      <Button
        onClick={handleChangePassword}
        variant="contained"
        sx={{
          backgroundColor: "#306c6c",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "#306c60",
          },
        }}
      >
        Lưu thay đổi
      </Button>
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
            {contentDialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ChangePassword;
