import React from "react";
import EmptyCart from "../../assets/images/empty_cart.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Cart() {
  const auth = false;
  return (
    <div>
      {auth ? (
        <div>true</div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src={EmptyCart} alt="" width={300} />
          <Link to={"/"}>
            <Button
              variant="contained"
              sx={{
                marginTop: 5,
                backgroundColor: "#306c6c",
                padding: "10px 20px",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#306c60",
                },
              }}
            >
              Trang chủ
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
