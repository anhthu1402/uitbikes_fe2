import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function ImageSlider() {
  return (
    <MDBCarousel showIndicators showControls>
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={1}
        src={require("../../assets/images/Banner1.png")}
        alt=""
      />
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={2}
        src={require("../../assets/images/Banner3.png")}
        alt=""
      />
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={3}
        src={require("../../assets/images/Banner5.jpg")}
        alt=""
      />
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={4}
        src={require("../../assets/images/Banner2.png")}
        alt=""
      />
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={5}
        src={require("../../assets/images/Banner4.png")}
        alt=""
      />
    </MDBCarousel>
  );
}

export default ImageSlider;
