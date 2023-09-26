import {
  BorderAllRounded,
  MopedRounded,
  PedalBikeRounded,
  TwoWheelerRounded,
} from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import ProductItem from "../../components/Item/Product/ProductItem";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [type, setType] = useState(0);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        <div
          className="catBtn"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Button
            className="catBtnItem"
            variant="contained"
            onClick={() => {
              setType(0);
            }}
          >
            <BorderAllRounded className="iconCatBtn" />
          </Button>
          <p>Tất cả</p>
        </div>
        <div
          className="catBtn"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Button
            className="catBtnItem"
            variant="contained"
            onClick={() => setType(2)}
          >
            <MopedRounded color="disabled" className="iconCatBtn" />
          </Button>
          <p>Xe tay ga</p>
        </div>
        <div
          className="catBtn"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <Button
            className="catBtnItem"
            variant="contained"
            onClick={() => setType(1)}
          >
            <PedalBikeRounded color="disabled" className="iconCatBtn" />
          </Button>
          <p>Xe số</p>
        </div>
        <div
          className="catBtn"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Button
            className="catBtnItem"
            variant="contained"
            onClick={() => setType(3)}
          >
            <TwoWheelerRounded color="disabled" className="iconCatBtn" />
          </Button>
          <p>Xe phân khối lớn</p>
        </div>
      </Box>
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
