import { useState } from "react";
import image1 from "@assets/images/img_1.jpg";
import image2 from "@assets/images/img_2.jpg";
import image3 from "@assets/images/img_3.jpg";
import image4 from "@assets/images/img_4.jpg";
import image5 from "@assets/images/img_5.jpg";
import image6 from "@assets/images/img_6.jpg";
import image7 from "@assets/images/img_7.jpg";
import image8 from "@assets/images/img_8.jpg";
import image9 from "@assets/images/img_9.jpg";
import image10 from "@assets/images/img_10.jpg";
import image11 from "@assets/images/img_11.jpg";
import image12 from "@assets/images/img_12.jpg";
import image13 from "@assets/images/img_13.jpg";
import image14 from "@assets/images/img_14.jpg";
import image15 from "@assets/images/img_15.jpg";
import image16 from "@assets/images/img_16.jpg";
import image17 from "@assets/images/img_17.jpg";
import image18 from "@assets/images/img_18.jpg";
import image19 from "@assets/images/img_19.jpg";
import image20 from "@assets/images/img_20.jpg";
import image21 from "@assets/images/img_21.jpg";
import image22 from "@assets/images/img_22.jpg";
import image23 from "@assets/images/img_23.jpg";
import image24 from "@assets/images/img_24.jpg";
import image25 from "@assets/images/img_25.jpg";
import image26 from "@assets/images/img_26.jpg";
import image27 from "@assets/images/img_27.jpg";
import image28 from "@assets/images/img_28.jpg";
import image29 from "@assets/images/img_29.jpg";
import image30 from "@assets/images/img_30.jpg";
import image31 from "@assets/images/img_31.jpg";
import image32 from "@assets/images/img_32.jpg";
import image33 from "@assets/images/img_33.jpg";
import image34 from "@assets/images/img_34.jpg";
import image35 from "@assets/images/img_35.jpg";
import image36 from "@assets/images/img_36.jpg";
// import image24 from "@assets/images/img_24.jpg";

import "./Slider.css";

const imageData = {
  "67694a9256cf721f87bf2b48": [image3, image12, image9, image10, image11],
  "67696200fa5f814ed0a5c088": [image5, image3, image4, image1],
  "6767e01c4477a26c210be71d": [image1, image24, image21, image22, image23],
  "6766fe8b50fe58844a7dbca5": [image4, image13, image14, image15, image16],
  "6766fee550fe58844a7dbcaa": [image6, image17, image18, image19, image20],
  "676951f55e39861ba4f68998": [image8, image27, image28, image29, image26],
  "67696300fa5f814ed0a5c0ce": [image7, image25, image30, image31, image32],
  "6769649bfa5f814ed0a5c0d6": [image2, image33, image34, image35, image36],
};

function Slider({ id }) {
  const [imageIndex, setImageIndex] = useState(0);

  const images = imageData[id] || []; // Trả về mảng rỗng nếu id không hợp lệ
  console.log("Images for this ID:", images);
  const changeSlide = (direction) => {
    setImageIndex((prevIndex) => {
      if (direction === "left") {
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <div className="slider">
      <button className="slider-arrow left" onClick={() => changeSlide("left")}>
        &lt;
      </button>
      <div className="slider-image">
        {images.length > 0 ? (
          <img
            src={images[imageIndex]}
            alt={`Slide ${imageIndex + 1}`}
            className="img-fluid"
          />
        ) : (
          <div className="no-images">Không có hình ảnh để hiển thị.</div>
        )}
      </div>
      <button
        className="slider-arrow right"
        onClick={() => changeSlide("right")}
      >
        &gt;
      </button>
      <div className="slider-thumbnails">
        {images.map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            key={index}
            className={`thumbnail ${index === imageIndex ? "active" : ""}`}
            onClick={() => setImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
