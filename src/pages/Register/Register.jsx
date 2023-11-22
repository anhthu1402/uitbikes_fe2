import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Register({ handleCloseSignin, handleOpenRegister }) {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9090/api/accounts")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((error) => console.log(error));
  }, [userList]);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);

  const checkUsername = (username) => {
    userList.map((child, index) => {
      if (child.username === username) {
        return true;
      }
    });
    return false;
  };
  const checkEmail = (email) => {
    userList.map((child, index) => {
      if (child.email === email) {
        return true;
      }
    });
    return false;
  };
  const handleRegister = () => {
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (!email || !password || !username) {
      setError("Vui lòng điền đầy đủ các thông tin!");
    }
    if (checkUsername(username)) {
      setError("Tên đăng nhập này đã được sử dụng");
    }
    if (checkEmail(email)) {
      setError("Email này đã được sử dụng");
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
    }
    const registerForm = {
      email: email,
      username: username,
      pw: password,
    };
    axios
      .post("http://localhost:9090/api/accounts", registerForm)
      .then((response) => {
        dispatch(authActions.setAuth(response.data));
        handleCloseSignin();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="register">
      <h3 style={{ textAlign: "center", margin: "25px" }}>Đăng ký</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className="register-form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            variant="standard"
            label="Tên đăng nhập"
            fullWidth
            className="email"
            inputRef={usernameRef}
          />
          <TextField
            variant="standard"
            label="Email"
            fullWidth
            className="email"
            inputRef={emailRef}
            sx={{ margin: 2 }}
          />
          <FormControl variant="standard" fullWidth className="password">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ backgroundColor: "white" }}
            >
              Mật khẩu
            </InputLabel>
            <Input
              inputRef={passwordRef}
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
          <FormControl
            variant="standard"
            fullWidth
            className="password"
            sx={{ margin: 2 }}
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ backgroundColor: "white" }}
            >
              Nhập lại mật khẩu
            </InputLabel>
            <Input
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
          {error && (
            <Alert severity="error" sx={{ marginTop: 1 }}>
              {error}
            </Alert>
          )}
          <Button
            className="register-btn"
            variant="contained"
            sx={{
              textTransform: "none",
              margin: 3,
              backgroundColor: "#306c6c",
              "&:hover": {
                backgroundColor: "#306c60",
              },
            }}
            fullWidth
            onClick={handleRegister}
          >
            Đăng ký
          </Button>

          <div
            className="register-footer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ marginTop: "8px" }}>
              Đã có tài khoản?{" "}
              <Link onClick={handleOpenRegister}>Đăng nhập ngay</Link>
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Register;
