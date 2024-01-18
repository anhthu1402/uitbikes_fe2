import { Box, Paper, Rating } from "@mui/material";
import { Button, Grid } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { FormatDateTime } from "../../../service";
import "./BeenReviewedItem.css";
import { useSelector } from "react-redux";

function BeenReviewedItem({ item }) {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="been-reviewed-item">
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 2,
          padding: "15px",
        }}
      >
        <div className="item-header">
          <div>
            <h4>{item.username}</h4>
            <Rating value={item.rate} readOnly />
          </div>
          <div style={{ textAlign: "right" }}>
            {item.username === user.username && (
              <Link to={"/edit-review/" + item.id} state={item}>
                <Button>Sửa đánh giá</Button>
              </Link>
            )}
            <div>{FormatDateTime(item.timestamp)}</div>
          </div>
        </div>
        <div className="item-content">
          <div className="item-image">
            <img src={item.product.image} alt={item.product.name} width={150} />
            <div>
              <h6>{item.product.name}</h6>
              <p>Màu: {item.product.color}</p>
            </div>
          </div>
          {item.text !== "" && (
            <div className="review-content">
              <label>{item.text}</label>
            </div>
          )}
          {item.images.length > 0 && (
            <div className="review-images">
              {item.images.map((child, index) => (
                <img src={child.image} alt="" width={150} />
              ))}
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
}

export default BeenReviewedItem;
