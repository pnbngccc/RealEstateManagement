import { useEffect, useState } from "react";
import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "@assets/css/tiny-slider.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import { tns } from "tiny-slider/src/tiny-slider";
import img1 from "@assets/images/img_1.jpg";
import img2 from "@assets/images/img_2.jpg";
import img3 from "@assets/images/img_3.jpg";
import person2 from "@assets/images/person_2-min.jpg";

// Dữ liệu bất động sản
const properties = [
  {
    id: 1,
    images: [img1, img2, img3],
    price: "$1,291,000",
    address: "5232 California Ave. 21BC",
    city: "California, USA",
    beds: 2,
    baths: 2,
    agent: {
      name: "Alicia Huston",
      position: "Real Estate",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: person2,
    },
  },
  // Thêm các bất động sản khác tương tự
];

function AboutList() {
  const [currentProperty, setCurrentProperty] = useState(properties[0]);

  useEffect(() => {
    const slider = tns({
      container: ".img-property-slide",
      items: 1,
      slideBy: 1,
      autoplay: true,
      autoplayButtonOutput: false,
      controls: false,
      nav: true,
      speed: 200,
    });

    return () => {
      if (slider && slider.destroy) {
        slider.destroy();
      }
    };
  }, [currentProperty]);

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="img-property-slide-wrap">
              <div className="img-property-slide">
                {currentProperty.images.map((image, index) => (
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="img-fluid"
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <h2 className="heading text-primary">{currentProperty.address}</h2>
            <p className="meta">{currentProperty.city}</p>
            <p className="text-black-50">{currentProperty.price}</p>
            <div className="d-block agent-box p-5">
              <div className="img mb-4">
                <img
                  src={currentProperty.agent.image}
                  alt="Agent"
                  className="img-fluid"
                />
              </div>
              <div className="text">
                <h3 className="mb-0">{currentProperty.agent.name}</h3>
                <div className="meta mb-3">
                  {currentProperty.agent.position}
                </div>
                <p>{currentProperty.agent.bio}</p>
                <ul className="list-unstyled social dark-hover d-flex">
                  <li className="me-1">
                    <a href="#">
                      <span className="icon-instagram"></span>
                    </a>
                  </li>
                  <li className="me-1">
                    <a href="#">
                      <span className="icon-twitter"></span>
                    </a>
                  </li>
                  <li className="me-1">
                    <a href="#">
                      <span className="icon-facebook"></span>
                    </a>
                  </li>
                  <li className="me-1">
                    <a href="#">
                      <span className="icon-linkedin"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <h3 className="mt-5">Other Properties</h3>
            <div className="property-list">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="property-item"
                  onClick={() => setCurrentProperty(property)}
                >
                  <img
                    src={property.images[0]}
                    alt={property.address}
                    className="img-fluid"
                  />
                  <div>
                    <h4>{property.address}</h4>
                    <p>{property.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutList;
