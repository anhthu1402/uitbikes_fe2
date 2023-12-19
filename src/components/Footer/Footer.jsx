import { Box, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: 2,
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, sm: 3, md: 3 }}
        columns={{ xs: 4, sm: 4, md: 12 }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          textAlign={{ xs: "center", sm: "center", md: "left" }}
          item
          xs={12}
          sm={12}
          md={4}
          alignItems={{ xs: "center", sm: "center", md: "baseline" }}
        >
          <h5 style={{ marginBottom: 15 }}>UIT BIKES</h5>
          <Box>
            <p>
              <b>Địa chỉ: </b>Trường Đại học CNTT, Khu phố 6, P.Linh Trung,
              TP.Thủ Đức, TP. HCM
            </p>
            <p>
              <b>Điện thoại: </b>1234567890
            </p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 180,
            }}
          >
            <Link to={"http://localhost:3000"} target="_blank">
              <img
                title="Template 1"
                src={require("../../assets/images/github.png")}
                alt=""
                width={30}
              />
            </Link>
            <Link to={"http://localhost:3000"} target="_blank">
              <img
                title="Template 2"
                src={require("../../assets/images/github.png")}
                alt=""
                width={30}
              />
            </Link>
            <Link to={"http://localhost:3000"} target="_blank">
              <img
                title="Template 3"
                src={require("../../assets/images/github.png")}
                alt=""
                width={30}
              />
            </Link>
            <Link to={"http://localhost:3000"} target="_blank">
              <img
                title="Admin"
                src={require("../../assets/images/github.png")}
                alt=""
                width={30}
              />
            </Link>
          </Box>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          item
          xs={12}
          sm={12}
          md={4}
          textAlign={{ xs: "center", sm: "center", md: "left" }}
        >
          <div>
            <h5 style={{ marginBottom: 15 }}>VỀ CHÚNG TÔI</h5>
            <Box>
              <p>
                <Link to={"/about"}>Giới thiệu</Link>
              </p>
              <p>
                <Link>Quy chế hoạt động</Link>
              </p>
              <p>
                <Link>Trung tâm khách hàng</Link>
              </p>
              <p>
                <Link>Hỏi đáp (FAQ)</Link>
              </p>
            </Box>
          </div>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          item
          xs={12}
          sm={12}
          md={4}
          textAlign={{ xs: "center", sm: "center", md: "left" }}
        >
          <div>
            <h5 style={{ marginBottom: 15 }}>HỖ TRỢ KHÁCH HÀNG</h5>
            <Box>
              <p>
                <b>Hotline: </b>1234567890 (9:00 - 21:00)
              </p>
              <p>
                <b>Email: </b>uitbikes@gmail.com
              </p>
            </Box>
            <Box>
              <p>
                <Link>Chính sách giải quyết khiếu nại</Link>
              </p>
              <p>
                <Link>Chính sách bảo mật</Link>
              </p>
            </Box>
          </div>
        </Grid>
      </Grid>
      <hr
        style={{
          height: "1px",
          borderWidth: 0,
          color: "gray",
          backgroundColor: "gray",
        }}
      />
      <Box>
        <Box></Box>
      </Box>
    </Box>
  );
}

export default Footer;
