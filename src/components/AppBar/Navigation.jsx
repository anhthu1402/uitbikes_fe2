import React, { useState } from "react";
import Logo from "../../assets/images/uit_bikes_logo.svg";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  InputBase,
  Menu,
  Toolbar,
  Container,
  CssBaseline,
  useScrollTrigger,
} from "@mui/material";
import AppAppBar from "./AppAppBar";
import {
  ExitToApp,
  NotificationsRounded,
  Search,
  ShoppingCart,
  TuneRounded,
} from "@mui/icons-material";
import RegisterIcon from "../../assets/images/register.png";
import SigninIcon from "../../assets/images/sigin.png";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresist: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
}

function Navigation(props) {
  const authed = true;
  const count = 4;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppAppBar
          position="fixed"
          style={{
            height: "4.5rem",
            backgroundColor: "white",
          }}
        >
          <Toolbar>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <img src={Logo} alt="" width={90} />
                </Box>
                <Box
                  sx={{
                    marginLeft: 5,
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Search sx={{ color: "#306c6c", cursor: "pointer" }} />
                    <InputBase
                      sx={{
                        color: "black",
                        alignItems: "center",
                        margin: "0 20px",
                        width: 300,
                      }}
                      placeholder="Search.."
                      inputProps={{ "aria-label": "search" }}
                    />
                    <TuneRounded sx={{ color: "#306c6c", cursor: "pointer" }} />
                  </Box>
                </Box>
              </Box>
              {authed ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Badge
                    badgeContent={count}
                    color="primary"
                    sx={{ marginRight: 3 }}
                  >
                    <ShoppingCart
                      sx={{ color: "#306c6c", cursor: "pointer" }}
                    />
                  </Badge>
                  <NotificationsRounded
                    sx={{ color: "#306c6c", cursor: "pointer", marginRight: 3 }}
                  />
                  <Avatar
                    sx={{
                      color: "#306c6c",
                      cursor: "pointer",
                      width: 30,
                      height: 30,
                      marginRight: 3,
                    }}
                    title="Anh Thu"
                    alt="Anh Thu"
                    src="https://res.cloudinary.com/dpwehcnso/image/upload/v1695480885/uitbikes/uitbiker1_pwb3z9.png?fbclid=IwAR0wlDrmAZq-7ltfJ62phszK9Y-J98ly2em7OvIa5_pH2dSKdJDskZymumE"
                  />
                  <ExitToApp sx={{ color: "#306c6c", cursor: "pointer" }} />
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "none",
                      color: "black",
                      fontSize: "16px",
                      marginRight: 2,
                    }}
                  >
                    <img
                      src={RegisterIcon}
                      alt=""
                      width={20}
                      style={{ marginRight: 6 }}
                    />
                    Đăng ký
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "none",
                      color: "black",
                      fontSize: "16px",
                    }}
                  >
                    <img
                      src={SigninIcon}
                      alt=""
                      width={20}
                      style={{ marginRight: 6 }}
                    />
                    Đăng nhập
                  </Button>
                </Box>
              )}
            </Container>
          </Toolbar>
        </AppAppBar>
      </ElevationScroll>
    </Box>
  );
}

export default Navigation;
