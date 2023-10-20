import { Button, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useState } from "react";
import { formatDate } from "../../service";

function ChargeRequest() {
  const [date, setDate] = useState("");
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
                  sx={{ width: "100%" }}
                  label="Ngày nạp tiền"
                  onChange={(e) => setDate(formatDate(e.$D, e.$M + 1, e.$y))}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              label="Số tài khoản"
              fullWidth
              sx={{ marginBottom: 3 }}
            />
            <TextField label="Số tiền" fullWidth sx={{ marginBottom: 3 }} />
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
              Nạp tiền
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChargeRequest;
