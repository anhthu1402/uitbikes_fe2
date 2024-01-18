import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReviewItem from "../../components/Item/ReviewInvoice/ReviewItem";

function ReviewInvoice() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const details = location.state.details;
  const customerId = location.state.customerId;
  return (
    <div style={{ marginTop: "90px" }}>
      {details.map((child, index) => (
        <div>
          <ReviewItem key={index} child={child} customerId={customerId} />
          {details.length > 0 && index < details.length - 1 && (
            <hr
              style={{
                margin: 30,
                borderWidth: 3,
                borderColor: "green",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewInvoice;
