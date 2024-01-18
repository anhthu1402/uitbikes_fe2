import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function ImageSlider() {
  return (
    <MDBCarousel showIndicators>
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={1}
        src="https://res.cloudinary.com/dvmxvwqev/image/upload/v1705575247/uitbikes/image-project/jcmkb5bwixpp3uizp0de.png"
        alt=""
      />
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={2}
        src="https://res.cloudinary.com/dvmxvwqev/image/upload/v1705575248/uitbikes/image-project/uc8zxbe3wawnwg9pxn90.png"
        alt=""
      />
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={3}
        src="https://res.cloudinary.com/dvmxvwqev/image/upload/v1705575248/uitbikes/image-project/naqigpxhsdakbib9mguq.jpg"
        alt=""
      />
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={4}
        src="https://res.cloudinary.com/dvmxvwqev/image/upload/v1705575249/uitbikes/image-project/signin-image.png"
        alt=""
      />
      <MDBCarouselItem
        className="d-block"
        width={"100%"}
        itemId={5}
        src="https://res.cloudinary.com/dvmxvwqev/image/upload/v1705575248/uitbikes/image-project/uc8zxbe3wawnwg9pxn90.png"
        alt=""
      />
    </MDBCarousel>
  );
}

export default ImageSlider;
