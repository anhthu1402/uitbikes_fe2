import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function ChangePassword() {
  const [email, setEmail] = useState("123@gmail.com");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
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
      <Button
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
    </Box>
  );
}

export default ChangePassword;
