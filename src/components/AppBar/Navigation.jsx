import React, { useContext, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  InputBase,
  Toolbar,
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
import SearchFilterContext from "../../SearchFilterContext";
import axios from "axios";

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

  const searchFilter = useContext(SearchFilterContext);
  const handleOpenSearchFilter = () => {
    localStorage.setItem("openSearchFilter", !searchFilter.open);
    searchFilter.setOpen(!searchFilter.open);
  };

  const searchRef = useRef();
  const handleSearchInput = () => {
    const searchInput = searchRef.current.value;
    if (searchInput === "") {
      alert("Vui lòng nhập từ khóa bạn cần tìm.");
    }
    axios
      .get("http://localhost:9090/api/products/name/" + searchInput)
      .then((response) => {
        searchFilter.setResult(response.data);
        localStorage.setItem("searchResult", JSON.stringify(response.data));
        navigate("/search");
      })
      .catch((error) => console.log(error));
  };

  const handleEnterSearchInput = (e) => {
    if (e.key === "Enter") {
      handleSearchInput();
    }
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
        <div
          onClick={() => {
            handleSearchInput();
            setOpen(false);
          }}
        >
          <Search className="icons" />
        </div>
        <InputBase
          className="inputBase"
          inputRef={searchRef}
          onChange={(e) => {
            searchRef.current.value = e.target.value;
          }}
          sx={{
            color: "black",
            alignItems: "center",
            margin: "0 20px",
          }}
          placeholder="Tìm kiếm ..."
          inputProps={{ "aria-label": "search" }}
        />
        <div
          onClick={() => {
            handleOpenSearchFilter();
            setOpen(false);
          }}
        >
          <TuneRounded className="icons" />
        </div>
      </div>
      {isAuthed ? (
        <Box
          className="icons-signed-in"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: open ? "40%" : "auto",
          }}
        >
          <Link to={"cart"} onClick={() => setOpen(false)}>
            <Badge
              className="icons"
              showZero={false}
              color="error"
              variant="standard"
              badgeContent={cartNumber > 0 ? cartNumber : null}
              sx={{ marginRight: open ? 0 : 3 }}
            >
              <ShoppingCart />
            </Badge>
          </Link>
          <Link to={"notification"} onClick={() => setOpen(false)}>
            <NotificationsRounded
              sx={{
                marginRight: open ? 0 : 3,
              }}
              className="icons"
            />
          </Link>
          <Link to={"profile/edit-profile"} onClick={() => setOpen(false)}>
            <Avatar
              className="icons"
              sx={{
                width: 30,
                height: 30,
                marginRight: open ? 0 : 3,
              }}
              title={user.username}
              alt={user.username}
              src={user.avatar}
            />
          </Link>
          <div
            onClick={() => {
              handleClickOpenLogout();
              setOpen(false);
            }}
          >
            <ExitToApp className="icons" />
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
            <div
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
                  <Link
                    to={"/"}
                    style={{ cursor: "pointer" }}
                    className="link-logo"
                  >
                    <img
                      src="https://res.cloudinary.com/dpwehcnso/image/upload/v1705577082/uitbikes/UIT_Bikes_n2jqiz.png?fbclid=IwAR1xyvl474-4rRs5qjzDar8eqFDJ_sPRAJ2BL9nlAB00YkcFrvAN9_FfxAM"
                      alt=""
                      width={90}
                    />
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
                      <div onClick={handleSearchInput}>
                        <Search sx={{ color: "#306c6c", cursor: "pointer" }} />
                      </div>
                      <InputBase
                        className="searchBarInputDesktop"
                        onChange={(e) => {
                          searchRef.current.value = e.target.value;
                        }}
                        onKeyDown={handleEnterSearchInput}
                        inputRef={searchRef}
                        sx={{
                          color: "black",
                          alignItems: "center",
                          margin: "0 20px",
                          width: 300,
                        }}
                        placeholder="Tìm kiếm ..."
                        inputProps={{ "aria-label": "search" }}
                      />
                      <div onClick={handleOpenSearchFilter}>
                        <TuneRounded
                          sx={{ color: "#306c6c", cursor: "pointer" }}
                        />
                      </div>
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
            </div>
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
              src="https://res.cloudinary.com/dvmxvwqev/image/upload/v1705575247/uitbikes/image-project/ae5xwqhigm9thfjmsefx.png"
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
              <ForgotPassword handleOpenForgotPw={handleOpenForgotPw} />
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
