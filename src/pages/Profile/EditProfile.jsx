import { EditRounded } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import React, { useEffect, useRef, useState } from "react";
import { FormatDate, formatDate } from "../../service";
import axios from "axios";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

function EditProfile() {
  const { isAuthed, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState(user.customer);
  const processFileImage = async (e) => {
    var file = e.target.files[0];

    var POST_URL = "https://api.cloudinary.com/v1_1/dvmxvwqev/upload";
    processFile();
    var uniqueId;

    function processFile(e) {
      console.log("changed");
      uniqueId = "dvmxvwqev" + new Date().getTime();
      var size = file.size;
      var sliceSize = 10 * 1000000;
      var start = 0;

      setTimeout(loop, 500);

      function loop() {
        console.log("looping");
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = file.slice(start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 500);
        }
      }
    }

    async function send(piece, start, end, size) {
      // console.log("end", end);

      var formdata = new FormData();

      formdata.append("file", piece);
      formdata.append("cloud_name", "dvmxvwqev");
      formdata.append("upload_preset", "uitbikes_image");

      const headers = {
        Accept: "/",
        "Content-Type": "multipart/form-data",
      };
      headers["X-Unique-Upload-Id"] = uniqueId;
      headers["X-Requested-With"] = "XMLHttpRequest";
      headers["Content-Range"] = "bytes " + start + "-" + end + "/" + size;
      const requestConfig = {
        url: POST_URL,
        method: "POST",
        data: formdata,
        headers,
      };
      const response = await axios(requestConfig);
      if (response?.data?.asset_id) {
        //Here i am trying to print the output of the response after the video is posted in cloudinary
        console.log(response.data.url, "response");
        const avatarDto = {
          avatar: response.data.url,
        };
        axios
          .put(
            "http://localhost:9090/api/accounts/" + user.username + "/avatar",
            avatarDto
          )
          .then((res) => {
            const account = {
              username: user.username,
              customer: customer,
              email: user.email,
              isAdmin: user.isAdmin,
              avatar: response.data.url,
            };
            dispatch(authActions.setAuth(account));
            handleOpen();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const cccdRef = useRef();
  const [gender, setGender] = useState(customer.gender);
  const [date, setDate] = useState(
    customer.date === null ? undefined : dayjs(customer.date)
  );
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = () => {
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;
    const cccd = cccdRef.current.value;
    const customerDetail = {
      name: name,
      address: address,
      phone: phone,
      idNumber: cccd,
      date: date,
      gender: gender,
    };
    axios
      .put(
        "http://localhost:9090/api/customers/" + user.username,
        customerDetail
      )
      .then((response) => {
        console.log(response.data);
        dispatch(authActions.setAuth(response.data));
        handleOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box>
      <Grid
        container
        columnSpacing={{ xs: 1, md: 8 }}
        columns={{ xs: 6, md: 12 }}
        sx={{ marginBottom: 2 }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={{ xs: "center", md: "flex-start" }}
          alignItems={"center"}
        >
          <Box>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Avatar
                  sx={{ bgcolor: "black", cursor: "pointer" }}
                  className="upload-file"
                >
                  <EditRounded color="inherit" />
                  <input type="file" onChange={processFileImage} />
                </Avatar>
              }
            >
              <Avatar sx={{ width: 180, height: 180 }} src={user.avatar} />
            </Badge>
            <h6 style={{ margin: "30px auto" }}>
              Ngày tham gia: {FormatDate(customer.registerDate)}
            </h6>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              defaultValue={user.username}
              label="Tên đăng nhập"
              fullWidth
              disabled
              sx={{ marginBottom: 3 }}
            />
            <TextField
              defaultValue={customer.name}
              label="Họ và tên"
              fullWidth
              sx={{ marginBottom: 3 }}
              inputRef={nameRef}
            />
            <FormControl sx={{ marginBottom: 3 }}>
              <FormLabel id="gender">Giới tính</FormLabel>
              <RadioGroup value={gender} onChange={handleChangeGender} row>
                <FormControlLabel value={1} control={<Radio />} label="Nữ" />
                <FormControlLabel value={0} control={<Radio />} label="Nam" />
                <FormControlLabel value={2} control={<Radio />} label="Khác" />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Địa chỉ"
              fullWidth
              sx={{ marginBottom: 3 }}
              defaultValue={customer.address}
              inputRef={addressRef}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              type="number"
              sx={{ marginBottom: 3 }}
              defaultValue={customer.phone}
              inputRef={phoneRef}
            />
            <TextField
              label="CCCD"
              type="number"
              fullWidth
              sx={{ marginBottom: 3 }}
              defaultValue={customer.idNumber}
              inputRef={cccdRef}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ marginBottom: 3 }}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  value={date}
                  sx={{ width: "100%" }}
                  label="Ngày sinh"
                  onChange={(e) => setDate(e)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
      <p style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handleChange}
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
      </p>
      <Dialog
        open={open}
        onClose={handleOpen}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cập nhật thành công.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditProfile;
