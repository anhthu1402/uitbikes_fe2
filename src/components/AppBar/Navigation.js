import React, { useState } from "react";
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
} from "@mui/material";
import AppAppBar from "./AppAppBar";
import {
  ExitToApp,
  NotificationsRounded,
  Search,
  ShoppingCart,
  TuneRounded,
  ViewStreamRounded,
} from "@mui/icons-material";
import RegisterIcon from "../../assets/images/register.png";
import SigninIcon from "../../assets/images/sigin.png";
import { Link } from "react-router-dom";
import "./Navigation.css"

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const menuDetail = (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    }} className="menuDetail">
      <div className="searchBarPhone"
        style={{
          height: "100%", display: 'none'
        }}
      >
        <Search sx={{ color: "#306c6c", cursor: "pointer" }} />
        <InputBase className="inputBase"
          sx={{
            color: "black",
            alignItems: "center",
            margin: "0 20px"
          }}
          placeholder="Search.."
          inputProps={{ "aria-label": "search" }}
        />
        <TuneRounded sx={{ color: "#306c6c", cursor: "pointer" }} />
      </div>
      {authed ? <Box style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", width: open ? "45%" : "auto"
      }}
      >
        <Link to={"cart"}>
          <Badge
            badgeContent={count}
            color="primary"
            sx={{ marginRight: open ? 0 : 3 }}
          >
            <ShoppingCart
              sx={{ color: "#306c6c", cursor: "pointer" }}
            />
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
            title="Anh Thu"
            alt="Anh Thu"
            src="https://res.cloudinary.com/dpwehcnso/image/upload/v1695480885/uitbikes/uitbiker1_pwb3z9.png?fbclid=IwAR0wlDrmAZq-7ltfJ62phszK9Y-J98ly2em7OvIa5_pH2dSKdJDskZymumE"
          />
        </Link>
        <ExitToApp sx={{ color: "#306c6c", cursor: "pointer" }} />
      </Box> : <Box>
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
      </Box>}
    </Box>
  )

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
            <Container maxWidth="lg" className="container"
              sx={{
                display: "flex",
                flexDirection: "column", height: "auto"
              }}
            >
              <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link to={"/"} style={{ cursor: 'pointer' }}>
                    <img src={Logo} alt="" width={90} />
                  </Link>
                  <Box className="searchBarDesktop"
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
                      <InputBase className="searchBarInputDesktop"
                        sx={{
                          color: "black",
                          alignItems: "center",
                          margin: "0 20px", width: 300
                        }}
                        placeholder="Search.."
                        inputProps={{ "aria-label": "search" }}
                      />
                      <TuneRounded sx={{ color: "#306c6c", cursor: "pointer" }} />
                    </Box>
                  </Box>
                </Box>
                <Box className="menuDesktop">
                  {menuDetail}
                </Box>
                <Box className="menuPhone" style={{ display: "none" }} onClick={handleOpen}>
                  <ViewStreamRounded
                    sx={{ color: "#306c6c", cursor: "pointer" }}
                  />

                </Box>
              </Box>
              <Collapse in={open} timeout={"auto"} >
                {menuDetail}
              </Collapse>
            </Container>

          </Toolbar>
        </AppAppBar>
      </ElevationScroll>
    </Box>
  );
}

export default Navigation;