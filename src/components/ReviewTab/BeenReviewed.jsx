import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BeenReviewedItem from "../Item/ReviewInvoice/BeenReviewedItem";

function BeenReviewed() {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9090/api/reviews/customer/" + user.customer.id)
      .then((res) => {
        setData(res.data.reverse());
      })
      .catch((error) => console.log(error));
  }, [data, user.customer.id]);
  return (
    <div>
      {data && data.length > 0 ? (
        data.map((item, index) => <BeenReviewedItem item={item} key={index} />)
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
    </div>
  );
}

export default BeenReviewed;
