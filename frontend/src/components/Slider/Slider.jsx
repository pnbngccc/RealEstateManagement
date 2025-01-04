import { useState } from "react";
import "./Slider.css";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(0);

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
