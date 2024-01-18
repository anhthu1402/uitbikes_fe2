import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EInvoiceItem from "../../components/Item/EInvoice/EInvoiceItem";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import axios from "axios";
import { useSelector } from "react-redux";
import { optionsEInvoice } from "../../service";

function EInvoice() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState({
    status: -1,
    value: "Tất cả",
  });
  useEffect(() => {
    axios
      .get(
        "http://localhost:9090/api/invoices/customer/" +
          user.customer.id +
          "/status/" +
          selectedIndex.status
      )
      .then((response) => {
        setData(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data, selectedIndex, user.customer.id]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <ButtonGroup variant="outlined" ref={anchorRef}>
          <Button
            fullWidth
            sx={{
              textTransform: "none",
              color: "#306c6c",
              borderColor: "#306c6c",
              "&:hover": {
                borderColor: "#306c6c",
              },
            }}
          >
            {selectedIndex.value}
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: "#306c6c",
              borderColor: "#306c6c",
              "&:hover": {
                borderColor: "#306c6c",
              },
            }}
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {optionsEInvoice.map((child, index) => (
                      <MenuItem
                        key={child.status}
                        sx={{
                          color: "#306c6c",
                        }}
                        selected={child.value === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, child)}
                      >
                        {child.value}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
      <Box>
        {data && data.length > 0 ? (
          data.map((child, index) => <EInvoiceItem child={child} key={index} />)
        ) : (
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <img
              src="https://res.cloudinary.com/dvmxvwqev/image/upload/v1705575248/uitbikes/image-project/fhemxtokqdfxwua8jolf.png"
              alt=""
              width={200}
            />
            <p>Không tìm thấy hóa đơn nào.</p>
          </div>
        )}
      </Box>
    </div>
  );
}

export default EInvoice;
