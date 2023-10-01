import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import ProductItem from "../../components/Item/Product/ProductItem";
import { Link } from "react-router-dom";
import axios from "axios";
import TypeList from "../../components/TypeList";

function Home() {
  const [data, setData] = useState([]);
  const [type, setType] = useState(
    sessionStorage.getItem("type")
      ? JSON.parse(sessionStorage.getItem("type"))
      : 0
  );
  const handleChangeType = (val) => {
    setType(val);
    sessionStorage.setItem("type", JSON.stringify(val));
  };
  useEffect(() => {
    axios
      .get("http://localhost:9090/api/products/details/type/" + type)
      .then((response) => {
        setData(response.data);
      });
  }, [type, data]);
  return (
    <div>
      <Box sx={{ marginBottom: 5 }}>
        <ImageSlider />
      </Box>
      <TypeList handleChangeType={handleChangeType} type={type} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent={"space-between"}
        >
          {data &&
            data.map((child, index) => (
              <Grid item xs={2} sm={4} md={4} key={index} marginBottom={2}>
                <Link to={"/product-detail/" + child.p_id} state={child}>
                  <ProductItem item={child} key={index} />
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
