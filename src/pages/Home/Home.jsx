import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import ProductItem from "../../components/Item/Product/ProductItem";
import { Link } from "react-router-dom";
import axios from "axios";
import TypeList from "../../components/TypeList";

function Home() {
  const [data, setData] = useState(null);
  const [type, setType] = useState(
    sessionStorage.getItem("type") != null
      ? JSON.parse(sessionStorage.getItem("type"))
      : 0
  );
  const handleChangeType = (val) => {
    axios
      .get("http://localhost:9090/api/products/details/type/" + val)
      .then((response) => {
        setData(response.data);
      });
    setType(val);
    sessionStorage.setItem("type", JSON.stringify(val));
  };
  useEffect(() => {
    if (data == null) {
      axios
        .get("http://localhost:9090/api/products/details/type/" + type)
        .then((response) => {
          setData(response.data);
        });
    }
  }, [type, data]);
  return (
    <div>
      <Box sx={{ marginBottom: 5 }}>
        <ImageSlider />
      </Box>
      <TypeList handleChangeType={handleChangeType} />

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 2, sm: 8, md: 8, lg: 12 }}
        >
          {data &&
            data.map((child, index) => (
              <Grid item xs={2} sm={4} md={4} key={index} marginBottom={2}>
                <Link to={"/product-detail/" + child.name} state={child}>
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
