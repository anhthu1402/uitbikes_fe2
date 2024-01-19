import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotBeenReviewedItem from "../Item/ReviewInvoice/NotBeenReviewedItem";

function NotBeenReviewed() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(
        "http://localhost:9090/api/invoices/customer/" +
          user.customer.id +
          "/status/" +
          2
      )
      .then((response) => {
        setData(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data, user.customer.id]);
  return (
    <div>
      <Box>
        {data ? (
          data.map((child, index) => (
            <NotBeenReviewedItem child={child} key={index} />
          ))
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

export default NotBeenReviewed;
