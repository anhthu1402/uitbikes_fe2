import React, { useEffect, useRef, useState } from "react";
import "./ReviewItem.css";
import { Alert, Rating, Slide, Snackbar } from "@mui/material";
import useFileSelection from "../../../hooks/useFileSelection";
import Card from "antd/es/card/Card";
import DragAndDrop from "../../DragAndDrop/DragAndDrop";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

type TransitionProps = Omit<SlideProps, "direction">;
function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

function ReviewItem({ child, customerId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [processing, setProcessing] = useState(false);
  const [text, setText] = useState("");
  const [rateValue, setRateValue] = useState(5);
  const [addFile, removeFile, imageUrls, handleUploadImage, isUploading] =
    useFileSelection();
  const [disabled, setDisabled] = useState(false);
  const handleSendReview = () => {
    setProcessing(true);
    const review = {
      rate: rateValue,
      text: text,
      detailId: child.id,
      customerId: customerId,
      images: imageUrls,
    };
    axios
      .post("http://localhost:9090/api/reviews", review)
      .then((res) => {
        if (res) {
          setOpen(true);
          setProcessing(false);
          setDisabled(true);
        } else {
          alert("Thêm đánh giá cho sản phẩm không thành công.");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="review-item">
      <div className="ri-product">
        <img src={child.product.image} alt="" width={150} />
        <div>
          <h4>{child.product.name}</h4>
          <p>{child.product.color}</p>
        </div>
      </div>
      <div className="ri-rate">
        <h5>Chất lượng sản phẩm</h5>
        <Rating
          value={rateValue}
          onChange={(e, newValue) => {
            setRateValue(newValue);
          }}
        />
      </div>
      <div className="ri-upload-image">
        <Card
          style={{
            margin: "auto",
            width: "100%",
          }}
          actions={[
            <Button
              type="dashed"
              loading={isUploading}
              onClick={handleUploadImage}
            >
              Hoàn tất
            </Button>,
          ]}
        >
          <DragAndDrop addFile={addFile} removeFile={removeFile} max={5} />
        </Card>
      </div>
      <div className="ri-text">
        <TextArea
          rows={5}
          placeholder="Đánh giá thêm"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="ri-submit">
        <Button
          size="large"
          type="primary"
          disabled={disabled}
          onClick={() => handleSendReview()}
          loading={processing}
        >
          Gửi đánh giá
        </Button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleOpen}
        TransitionComponent={TransitionLeft}
      >
        <Alert onClose={handleOpen} severity="success" sx={{ width: "100%" }}>
          Thêm đánh giá cho sản phẩm thành công.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ReviewItem;
