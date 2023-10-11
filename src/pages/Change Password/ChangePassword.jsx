import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

function ChangePassword() {
  const [email, setEmail] = useState("123@gmail.com");
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
        <TextField
          required
          label="Mật khẩu mới"
          fullWidth
          sx={{ marginBottom: 5 }}
        />
        <TextField
          required
          label="Nhập lại mật khẩu"
          fullWidth
          sx={{ marginBottom: 5 }}
        />
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
