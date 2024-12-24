// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/style.css";
// import AOS from "aos";
// import { tns } from "tiny-slider/src/tiny-slider";

// function ListProperties() {
//   const [properties, setProperties] = useState([]);
//   const [propertyDetails, setPropertyDetails] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     AOS.init({ duration: 1200, once: true });
//     fetchProperties();
//     fetchPropertyDetails();
//   }, []);

//   const fetchProperties = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/property`);
//       if (response.data.success && Array.isArray(response.data.data)) {
//         setProperties(response.data.data);
//       } else {
//         setError("Không thể tải bất động sản.");
//       }
//     } catch (err) {
//       console.error("Error fetching properties:", err);
//       setError("Không thể tải bất động sản.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPropertyDetails = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/property-detail`
//       );
//       console.log("Property Details:", response.data); // Kiểm tra dữ liệu
//       if (response.data.success && Array.isArray(response.data.data)) {
//         setPropertyDetails(response.data.data);
//       } else {
//         setError("Không thể tải chi tiết bất động sản.");
//       }
//     } catch (err) {
//       console.error("Error fetching property details:", err);
//       setError("Không thể tải chi tiết bất động sản.");
//     }
//   };

//   useEffect(() => {
//     let slider;
//     if (properties.length > 0) {
//       slider = tns({
//         container: ".property-slider",
//         items: 1,
//         slideBy: 1,
//         autoplay: true,
//         autoplayButtonOutput: false,
//         controls: true,
//         nav: true,
//         speed: 200,
//         prevButton: ".prev",
//         nextButton: ".next",
//         responsive: {
//           640: { items: 1 },
//           768: { items: 2 },
//           1024: { items: 3 },
//         },
//       });
//     }

//     return () => {
//       if (slider && slider.destroy) {
//         slider.destroy();
//       }
//     };
//   }, [properties]);

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "200px" }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="section" style={{ paddingBottom: 0 }}>
//       <div className="container">
//         <div className="row mb-5 align-items-center">
//           <div className="col-lg-6">
//             <h2 className="font-weight-bold text-primary heading">
//               Bất động sản nổi bật
//             </h2>
//           </div>
//           <div className="col-lg-6 text-lg-end">
//             <p>
//               <a
//                 href="/properties"
//                 className="btn btn-primary text-white py-3 px-4"
//               >
//                 Xem tất cả
//               </a>
//             </p>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-12">
//             <div className="property-slider-wrap">
//               {error && <div className="text-danger mb-3">{error}</div>}
//               <div
//                 className="property-slider"
//                 style={{ display: "flex", gap: "15px" }}
//               >
//                 {properties.length > 0 ? (
//                   properties.map((property) => {
//                     const propertyDetail = propertyDetails.find(
//                       (detail) =>
//                         detail.idProperty &&
//                         detail.idProperty._id === property._id
//                     );
//                     return (
//                       <div className="property-item" key={property._id}>
//                         <a href={`/properties/${property._id}`} className="img">
//                           <img
//                             src={property.image || "default-image.jpg"}
//                             alt={property.title || "Hình ảnh bất động sản"}
//                             className="img-fluid"
//                           />
//                         </a>
//                         <div className="property-content">
//                           <div className="price mb-2">
//                             <span>{property.price?.toLocaleString()} vnđ</span>
//                           </div>
//                           <div>
//                             <span className="d-block mb-2 text-black-50">
//                               {property.address || "Địa chỉ không xác định"}
//                             </span>
//                             <span className="city d-block mb-3">
//                               {property.title || "Loại không xác định"}
//                             </span>
//                             <div className="specs d-flex mb-4">
//                               {/* <span className="d-block d-flex align-items-center me-3">
//                                 <span className="icon-bed me-2"></span>
//                                 <span className="caption">
//                                   {property.beds || 0} beds
//                                 </span>
//                               </span>
//                               <span className="d-block d-flex align-items-center me-3">
//                                 <span className="icon-bath me-2"></span>
//                                 <span className="caption">
//                                   {property.bath || 0} baths
//                                 </span>
//                               </span> */}
//                               <span className="d-block d-flex align-items-center me-3">
//                                 <span className="caption">
//                                   {propertyDetail ? propertyDetail.area : "N/A"}{" "}
//                                   m²
//                                 </span>
//                               </span>
//                             </div>
//                             <a
//                               href={`/properties/${property._id}`}
//                               className="btn btn-primary py-2 px-3"
//                             >
//                               Xem chi tiết
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <p>Không có bất động sản nào.</p>
//                 )}
//               </div>
//               <div
//                 id="property-nav"
//                 className="controls"
//                 tabIndex="0"
//                 aria-label="Carousel Navigation"
//               >
//                 <span
//                   className="prev"
//                   data-controls="prev"
//                   aria-controls="property"
//                   tabIndex="-1"
//                   role="button"
//                   aria-label="Previous slide"
//                 >
//                   &#9664;
//                 </span>
//                 <span
//                   className="next"
//                   data-controls="next"
//                   aria-controls="property"
//                   tabIndex="-1"
//                   role="button"
//                   aria-label="Next slide"
//                 >
//                   &#9654;
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ListProperties;
import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/style.css";
import AOS from "aos";
import { tns } from "tiny-slider/src/tiny-slider";

function ListProperties() {
  const [properties, setProperties] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    fetchProperties();
    fetchPropertyDetails();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/property`);
      if (response.data.success && Array.isArray(response.data.data)) {
        setProperties(response.data.data);
      } else {
        setError("Không thể tải bất động sản.");
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Không thể tải bất động sản.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/property-detail`
      );
      if (response.data.success && Array.isArray(response.data.data)) {
        setPropertyDetails(response.data.data);
      } else {
        setError("Không thể tải chi tiết bất động sản.");
      }
    } catch (err) {
      console.error("Error fetching property details:", err);
      setError("Không thể tải chi tiết bất động sản.");
    }
  };

  useEffect(() => {
    let slider;
    if (properties.length > 0) {
      slider = tns({
        container: ".property-slider",
        items: 1,
        slideBy: 1,
        autoplay: true,
        autoplayButtonOutput: false,
        controls: true,
        nav: true,
        speed: 200,
        prevButton: ".prev",
        nextButton: ".next",
        responsive: {
          640: { items: 1 },
          768: { items: 2 },
          1024: { items: 3 },
        },
      });
    }

    return () => {
      if (slider && slider.destroy) {
        slider.destroy();
      }
    };
  }, [properties]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-lg-6">
            <h2 className="font-weight-bold text-primary heading">
              Bất động sản nổi bật
            </h2>
          </div>
          <div className="col-lg-6 text-lg-end">
            <p>
              <a
                href="/properties"
                className="btn btn-primary text-white py-3 px-4"
              >
                Xem tất cả
              </a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="property-slider-wrap">
              {error && <div className="text-danger mb-3">{error}</div>}
              <div
                className="property-slider"
                style={{ display: "flex", gap: "15px" }}
              >
                {properties.length > 0 ? (
                  properties.map((property) => {
                    const propertyDetail = propertyDetails.find(
                      (detail) =>
                        detail.idProperty &&
                        detail.idProperty._id === property._id
                    );
                    return (
                      <div className="property-item" key={property._id}>
                        <a href={`/properties/${property._id}`} className="img">
                          <img
                            src={property.image || "default-image.jpg"}
                            alt={property.title || "Hình ảnh bất động sản"}
                            className="img-fluid"
                          />
                        </a>
                        <div className="property-content">
                          <div className="price mb-2">
                            <span>{property.price?.toLocaleString()} vnđ</span>
                          </div>
                          <div>
                            <span className="d-block mb-2 text-black-50">
                              {property.address || "Địa chỉ không xác định"}
                            </span>
                            <span className="city d-block mb-3">
                              {property.title || "Loại không xác định"}
                            </span>
                            <div className="specs d-flex mb-4">
                              <span className="d-block d-flex align-items-center me-3">
                                <span className="caption">
                                  {propertyDetail ? propertyDetail.area : "N/A"}{" "}
                                  m²
                                </span>
                              </span>
                            </div>
                            <a
                              href={`/properties/${property._id}`}
                              className="btn btn-primary py-2 px-3"
                            >
                              Xem chi tiết
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Không có bất động sản nào.</p>
                )}
              </div>
              <div
                id="property-nav"
                className="controls"
                tabIndex="0"
                aria-label="Carousel Navigation"
              >
                <span
                  className="prev"
                  data-controls="prev"
                  aria-controls="property"
                  tabIndex="-1"
                  role="button"
                  aria-label="Previous slide"
                >
                  &#9664;
                </span>
                <span
                  className="next"
                  data-controls="next"
                  aria-controls="property"
                  tabIndex="-1"
                  role="button"
                  aria-label="Next slide"
                >
                  &#9654;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProperties;
