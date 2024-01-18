import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import BeenReviewed from "../../components/ReviewTab/BeenReviewed";
import NotBeenReviewed from "../../components/ReviewTab/NotBeenReviewed";

function Review() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [value, setValue] = useState(0);
  const handleChange = (e, value) => {
    setValue(value);
  };
  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Chưa đánh giá" />
        <div style={{ margin: 5 }}></div>
        <Tab label="Đã đánh giá" />
      </Tabs>
      {value === 0 ? <NotBeenReviewed /> : <BeenReviewed />}
    </div>
  );
}

export default Review;
