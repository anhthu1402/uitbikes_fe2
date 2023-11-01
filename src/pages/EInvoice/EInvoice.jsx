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

function EInvoice() {
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
  }, [data, selectedIndex]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const options = [
    {
      status: -1,
      value: "Tất cả",
    },
    {
      status: 0,
      value: "Chờ xác nhận",
    },
    {
      status: 1,
      value: "Đang giao",
    },
    {
      status: 2,
      value: "Đã giao",
    },
    {
      status: 3,
      value: "Đã hủy",
    },
  ];
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
                    {options.map((child, index) => (
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
        {data &&
          data.map((child, index) => (
            <EInvoiceItem child={child} key={index} />
          ))}
      </Box>
    </div>
  );
}

export default EInvoice;
