import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Signin.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

function Signin({ handleCloseSignin, handleOpenRegister }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const handleSignin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) {
      return setError("Vui lòng điền đầy đủ các thông tin!");
    }
    const loginForm = {
      email: email,
      pw: password,
    };
    axios
      .post("http://localhost:9090/api/accounts/signin", loginForm)
      .then((response) => {
        if (response.data.email === undefined) {
          setError("Email hoặc mật khẩu chưa đúng.");
        } else {
          dispatch(authActions.setAuth(response.data));
          handleCloseSignin();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="signin">
      <h3 style={{ textAlign: "center", margin: "30px" }}>Đăng nhập</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className="signin-form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            variant="standard"
            label="Email"
            fullWidth
            className="email"
            inputRef={emailRef}
            autoComplete="true"
          />
          <FormControl
            variant="standard"
            sx={{ margin: 3 }}
            fullWidth
            className="password"
          >
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
          {error && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            className="signin-btn"
            variant="contained"
            sx={{
              textTransform: "none",
              margin: 5,
              backgroundColor: "#306c6c",
              "&:hover": {
                backgroundColor: "#306c60",
              },
            }}
            fullWidth
            onClick={handleSignin}
          >
            Đăng nhập
          </Button>

          <div
            className="signin-footer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to={""}>Quên mật khẩu?</Link>
            <p style={{ marginTop: "8px" }}>
              Chưa có tài khoản?{" "}
              <Link onClick={handleOpenRegister}>Đăng kí ngay</Link>
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Signin;
