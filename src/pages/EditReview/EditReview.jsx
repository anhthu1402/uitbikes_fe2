import { Rating } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFileSelection from "../../hooks/useFileSelection";
import { Button, Card } from "antd";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import TextArea from "antd/es/input/TextArea";
import "./EditReview.css";
import { RemoveCircleRounded } from "@mui/icons-material";
import axios from "axios";

function EditReview() {
  const location = useLocation();
  const review = location.state;
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [text, setText] = useState(review.text);
  const [rateValue, setRateValue] = useState(review.rate);
  const [addFile, removeFile, imageUrls, handleUploadImage, isUploading] =
    useFileSelection();
  const [disabled, setDisabled] = useState(false);
  const [urls, setUrls] = useState(review.images);
  const removeImage = (id) => {
    axios
      .delete("http://localhost:9090/api/reviews/remove-image/" + id)
      .then((res) => {
        if (res.data.id !== undefined) {
          setUrls(res.data.images);
        }
      });
  };
  const handleSendReview = async () => {
    setProcessing(true);
    if (imageUrls.length > 0) {
      imageUrls.map(async (item) => {
        await axios
          .put(
            "http://localhost:9090/api/reviews/" + review.id + "/add-image",
            item,
            {
              headers: { "Content-Type": "text/plain" },
            }
          )
          .then((res) => {
            console.log("ok");
          })
          .catch((error) => console.log(error));
      });
    }
    const updateReview = {
      rate: rateValue,
      text: text,
    };
    axios
      .put("http://localhost:9090/api/reviews/" + review.id, updateReview)
      .then((res) => {
        if (res) {
          navigate("/profile/my-review");
        } else {
          alert("Sửa đánh giá cho sản phẩm không thành công.");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="review-item" style={{ marginTop: "100px" }}>
      <div className="ri-product" style={{ marginBottom: 20 }}>
        <img src={review.product.image} alt="" width={150} />
        <div>
          <h4>{review.product.name}</h4>
          <p>{review.product.color}</p>
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
      {urls.length > 0 && (
        <div style={{ margin: "15px auto" }}>
          <h5>Ảnh đánh giá:</h5>
          <div className="ri-images">
            {urls.map((item, index) => (
              <div>
                <img src={item.image} alt="" key={index} width={100} />
                <div
                  className="remove-icon"
                  onClick={() => removeImage(item.id)}
                >
                  <RemoveCircleRounded />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="ri-upload-image">
        <h5>Thêm ảnh:</h5>
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
          <DragAndDrop
            addFile={addFile}
            removeFile={removeFile}
            max={5 - parseInt(review.images.length)}
          />
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
          Sửa đánh giá
        </Button>
      </div>
    </div>
  );
}

export default EditReview;
