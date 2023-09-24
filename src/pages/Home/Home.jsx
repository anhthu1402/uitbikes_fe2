import {
  BorderAllRounded,
  MopedRounded,
  PedalBikeRounded,
  TwoWheelerRounded,
} from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { ProductData } from "../../components/Data/ProductData";
import ProductItem from "../../components/Item/Product/ProductItem";

function Home() {
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
          <Button className="catBtnItem" variant="contained">
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
          <Button className="catBtnItem" variant="contained">
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
          <Button className="catBtnItem" variant="contained">
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
          <Button className="catBtnItem" variant="contained">
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
          {ProductData.map((child, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} marginBottom={2}>
              <ProductItem />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
