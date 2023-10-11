import { EditRounded } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { formatDate } from "../../service";

function EditProfile() {
  const [gender, setGender] = useState(0);
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const [date, setDate] = useState("");
  return (
    <Box>
      <Grid
        container
        columnSpacing={{ xs: 1, md: 12 }}
        columns={{ xs: 6, md: 12 }}
        sx={{ marginBottom: 5 }}
      >
        <Grid item xs={12} sm={8} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Tên đăng nhập"
              fullWidth
              sx={{ marginBottom: 3 }}
            />
            <TextField label="Họ và tên" fullWidth sx={{ marginBottom: 3 }} />
            <FormControl sx={{ marginBottom: 3 }}>
              <FormLabel id="gender">Giới tính</FormLabel>
              <RadioGroup value={gender} onChange={handleChange} row>
                <FormControlLabel value={0} control={<Radio />} label="Nữ" />
                <FormControlLabel value={1} control={<Radio />} label="Nam" />
                <FormControlLabel value={2} control={<Radio />} label="Khác" />
              </RadioGroup>
            </FormControl>
            <TextField label="Địa chỉ" fullWidth sx={{ marginBottom: 3 }} />
            <TextField
              label="Số điện thoại"
              fullWidth
              sx={{ marginBottom: 3 }}
            />
            <TextField label="CCCD" fullWidth sx={{ marginBottom: 3 }} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Ngày sinh"
                  onChange={(e) => setDate(formatDate(e.$D, e.$M + 1, e.$y))}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Badge
            sx={{ cursor: "pointer" }}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar sx={{ bgcolor: "black" }}>
                <EditRounded color="inherit" />
              </Avatar>
            }
          >
            <Avatar
              sx={{ width: 180, height: 180 }}
              src="https://ibighit.com/bts/images/bts/discography/love_yourself-answer/album-cover.jpg"
            />
          </Badge>
        </Grid>
      </Grid>
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

export default EditProfile;
