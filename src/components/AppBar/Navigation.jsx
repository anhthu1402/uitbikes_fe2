import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/uit_bikes_logo.svg";
import {
  Avatar,
  Badge,
  Box,
  Button,
  InputBase,
  Toolbar,
  Container,
  CssBaseline,
  useScrollTrigger,
  Collapse,
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AppAppBar from "./AppAppBar";
import {
  CloseRounded,
  ExitToApp,
  LoginRounded,
  NotificationsRounded,
  Search,
  ShoppingCart,
  TuneRounded,
  ViewStreamRounded,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import Signin from "../../pages/Signin/Signin";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";

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
  const { isAuthed, user, cartNumber } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const [openSignin, setOpenSignin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => {
    setOpenRegister(!openRegister);
  };
  const [openForgotPw, setOpenForgotPw] = useState(false);
  const handleOpenForgotPw = () => {
    setOpenForgotPw(!openForgotPw);
  };

  const handleClickOpenSignin = () => {
    setOpenSignin(true);
  };

  const handleCloseSignin = () => {
    setOpenSignin(false);
    setOpenForgotPw(false);
    setOpenRegister(false);
  };

  const [openLogout, setOpenLogout] = useState(false);

  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleLogout = () => {
    setOpenLogout(false);
    dispatch(authActions.logout(user));
    navigate("/");
  };

  const menuDetail = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="menuDetail"
    >
      <div
        className="searchBarPhone"
        style={{
          height: "100%",
          display: "none",
        }}
      >
        <Search sx={{ color: "#306c6c", cursor: "pointer" }} />
        <InputBase
          className="inputBase"
          sx={{
            color: "black",
            alignItems: "center",
            margin: "0 20px",
          }}
          placeholder="Search.."
          inputProps={{ "aria-label": "search" }}
        />
        <TuneRounded sx={{ color: "#306c6c", cursor: "pointer" }} />
      </div>
      {isAuthed ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: open ? "45%" : "auto",
          }}
        >
          <Link to={"cart"}>
            <Badge
              badgeContent={cartNumber > 0 ? cartNumber : null}
              color="primary"
              sx={{ marginRight: open ? 0 : 3 }}
            >
              <ShoppingCart sx={{ color: "#306c6c", cursor: "pointer" }} />
            </Badge>
          </Link>
          <Link to={"notification"}>
            <NotificationsRounded
              sx={{
                color: "#306c6c",
                cursor: "pointer",
                marginRight: open ? 0 : 3,
              }}
            />
          </Link>
          <Link to={"profile"}>
            <Avatar
              sx={{
                color: "#306c6c",
                cursor: "pointer",
                width: 30,
                height: 30,
                marginRight: open ? 0 : 3,
              }}
              title={user.username}
              alt={user.username}
              src={user.avatar}
            />
          </Link>
          <div onClick={handleClickOpenLogout}>
            <ExitToApp sx={{ color: "#306c6c", cursor: "pointer" }} />
          </div>
        </Box>
      ) : (
        <Button variant="text" onClick={handleClickOpenSignin}>
          <LoginRounded sx={{ color: "#306c6c" }} />
        </Button>
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppAppBar
          position="fixed"
          style={{
            backgroundColor: "white",
          }}
        >
          <Toolbar>
            <Container
              maxWidth="lg"
              className="container"
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "auto",
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link to={"/"} style={{ cursor: "pointer" }}>
                    <img src={Logo} alt="" width={90} />
                  </Link>
                  <Box
                    className="searchBarDesktop"
                    sx={{
                      marginLeft: 4,
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
                        className="searchBarInputDesktop"
                        sx={{
                          color: "black",
                          alignItems: "center",
                          margin: "0 20px",
                          width: 300,
                        }}
                        placeholder="Search.."
                        inputProps={{ "aria-label": "search" }}
                      />
                      <TuneRounded
                        sx={{ color: "#306c6c", cursor: "pointer" }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="menuDesktop">{menuDetail}</Box>
                <Box
                  className="menuPhone"
                  style={{ display: "none" }}
                  onClick={handleOpen}
                >
                  <ViewStreamRounded
                    sx={{ color: "#306c6c", cursor: "pointer" }}
                  />
                </Box>
              </Box>
              <Collapse in={open} timeout={"auto"}>
                {menuDetail}
              </Collapse>
            </Container>
          </Toolbar>
        </AppAppBar>
      </ElevationScroll>
      <Dialog
        open={openSignin}
        onClose={handleCloseSignin}
        maxWidth="lg"
        fullWidth
      >
        <Grid container spacing={0} columns={{ xs: 4, sm: 12, md: 12 }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            display={{ xs: "none", sm: "none", md: "block" }}
          >
            <img
              src={require("../../assets/images/signin-image.png")}
              alt=""
              style={{ objectFit: "contain" }}
              width={"100%"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div
              style={{
                textAlign: "right",
                padding: "15px 5px 0 0",
              }}
            >
              <Button
                onClick={() => {
                  handleCloseSignin();
                  if (openRegister) {
                    handleOpenRegister();
                  }
                }}
              >
                <CloseRounded sx={{ color: "#306c6c" }} />
              </Button>
            </div>
            {openRegister ? (
              <Register
                handleCloseSignin={handleCloseSignin}
                handleOpenRegister={handleOpenRegister}
              />
            ) : openForgotPw ? (
              <ForgotPassword />
            ) : (
              <Signin
                handleCloseSignin={handleCloseSignin}
                handleOpenRegister={handleOpenRegister}
                handleOpenForgotPw={handleOpenForgotPw}
              />
            )}
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        open={openLogout}
        onClose={handleClickOpenLogout}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn đăng xuất?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogout}>Không</Button>
          <Button onClick={handleLogout} autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Navigation;
