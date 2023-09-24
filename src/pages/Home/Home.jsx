import {
  BorderAllRounded,
  MopedRounded,
  PedalBikeRounded,
  TwoWheelerRounded,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";

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
            <BorderAllRounded color="disabled" className="iconCatBtn" />
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
    </div>
  );
}

export default Home;
