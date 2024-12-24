// import { useContext, useEffect, useState } from "react";
// import img1 from "@assets/images/img_1.jpg";
// import img2 from "@assets/images/img_2.jpg";
// import img3 from "@assets/images/img_3.jpg";
// import img4 from "@assets/images/img_4.jpg";
// import img5 from "@assets/images/img_5.jpg";

// import "@assets/fonts/icomoon/style.css";
// import "@assets/fonts/flaticon/font/flaticon.css";
// import "@assets/css/tiny-slider.css";
// import "aos/dist/aos.css";
// import "@assets/css/style.css";
// import "./List.css";
// import { UserContext } from "../../../untils/Context";
// import { useNavigate } from "react-router-dom";
// import noavt from "@assets/images/noavt.jpg";

// const projects = [
//   {
//     id: 1,
//     image: img2,
//     title: "Khu đô thị mới Sun Urban City",
//     address:
//       "Khu đô thị Bắc Châu Giang, phường Lam Hạ, thành phố Phủ Lý, tỉnh Hà Nam.",
//     descriptions:
//       "Dự án Sun Urban City Hà Nam tọa lạc tại vị trí trung tâm mới của thành phố Phủ Lý.",
//   },
//   {
//     id: 2,
//     image: img1,
//     title: "Vinhomes Global Gate",
//     address: "Đường Trường Sa, xã Đông Hội, huyện Đông Anh, Hà Nội.",
//     descriptions: "Dự án Vinhomes Global Gate Nằm sát cạnh Thành Cổ Loa.",
//   },
//   {
//     id: 3,
//     image: img3,
//     title: "Căn hộ chung cư Citi Alto",
//     address: "Đường Nguyễn Thị Định, phường Cát Lái, quận 2, TP.HCM.",
//     descriptions: "Citi Alto nằm trong trung tâm khu đô thị Cát Lái.",
//   },
//   {
//     id: 4,
//     image: img4,
//     title: "Căn hộ chung cư Avatar Thủ Đức",
//     address: "Đường Vành Đai 2, phường Trường Thọ, thành phố Thủ Đức.",
//     descriptions:
//       "Avatar Thủ Đức có quy mô gần 3,3 ha, thiết kế theo mô hình khu căn hộ cao cấp.",
//   },
//   {
//     id: 5,
//     image: img5,
//     title: "Căn hộ chung cư Raemian",
//     address: "Đường DN10, phường Đông Hưng Thuận, Quận 12, TP.HCM.",
//     descriptions:
//       "Căn hộ Raemian Đông Thuận Quận 12 tọa lạc tại vị trí đắc địa.",
//   },
// ];

// const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang

// function Profile() {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(UserContext);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Tính toán tổng số trang
//   const totalPages = Math.ceil(projects.length / itemsPerPage);

//   // Lấy các mục hiện tại
//   const getCurrentProperties = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return projects.slice(startIndex, startIndex + itemsPerPage);
//   };

//   // Chuyển trang
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/login");
//     }
//   }, [currentUser, navigate]);

//   return (
//     currentUser && (
//       <div className="container mt-5">
//         <div className="d-flex align-items-center mb-4">
//           <h1 style={{ marginRight: "30rem" }}>Profile</h1>
//           <button
//             className="btn btn-primary mb-3"
//             onClick={() => navigate("/profile/update")}
//           >
//             Update Profile
//           </button>
//         </div>

//         <div className="mb-3">
//           <span>
//             Avatar{" "}
//             <img
//               src={currentUser.avatar || noavt}
//               alt="User Avatar"
//               className="img-fluid rounded-circle"
//               style={{ width: "50px", height: "50px" }}
//             />
//           </span>
//         </div>
//         <p>
//           <span>
//             {/* <b>Username: {currentUser?.user?.username || "Người dùng"}</b>{" "} */}
//             Username: <b> {currentUser?.username || "Người dùng"}</b>
//           </span>
//         </p>

//         <div className="mt-4">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div className="d-flex align-items-center mb-4">
//               <h2 style={{ marginRight: "30rem" }}>My List</h2>
//               <button className="btn btn-success">Create New Post</button>
//             </div>
//           </div>
//           <div className="section section-properties">
//             <div className="container">
//               <div className="row">
//                 {getCurrentProperties().map((property) => (
//                   <div className="col-12 mb-30" key={property.id}>
//                     <div className="property-item">
//                       <a href={`/project/${property.id}`} className="img">
//                         <img
//                           src={property.image}
//                           alt="Property"
//                           className="img-fluid"
//                         />
//                       </a>
//                       <div className="property-content">
//                         <div className="price mb-2">
//                           <span>{property.title}</span>
//                         </div>
//                         <div>
//                           <span
//                             className="d-block mb-2 text-black-50"
//                             style={{ textAlign: "justify", width: "460px" }}
//                           >
//                             {property.address}
//                           </span>
//                           <span
//                             className="city d-block mb-3"
//                             style={{
//                               fontSize: "14px",
//                               fontWeight: "200",
//                               textAlign: "justify",
//                               width: "460px",
//                             }}
//                           >
//                             {property.descriptions}
//                           </span>
//                           <a
//                             href={`/project/${property.id}`}
//                             className="btn btn-primary py-2 px-3"
//                           >
//                             Xem chi tiết
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="row align-items-center py-5">
//                 <div className="col-lg-12 text-center">
//                   <div className="custom-pagination">
//                     {[...Array(totalPages)].map((_, index) => (
//                       <a
//                         href="#"
//                         key={index + 1}
//                         className={currentPage === index + 1 ? "active" : ""}
//                         onClick={() => handlePageChange(index + 1)}
//                       >
//                         {index + 1}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <h2>Saved List</h2>
//                 <button className="btn btn-warning">Save</button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="chatContainer mt-4">
//           <div className="wrapper"></div>
//         </div>
//       </div>
//     )
//   );
// }

// export default Profile;
import { useContext, useEffect, useState } from "react";
import img1 from "@assets/images/img_1.jpg";
import img2 from "@assets/images/img_2.jpg";
import img3 from "@assets/images/img_3.jpg";
import img4 from "@assets/images/img_4.jpg";
import img5 from "@assets/images/img_5.jpg";

import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "@assets/css/tiny-slider.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "./List.css";
import { UserContext } from "../../../untils/Context";
import { useNavigate } from "react-router-dom";
import noavt from "@assets/images/noavt.jpg";

const projects = [
  {
    id: 1,
    image: img2,
    title: "Khu đô thị mới Sun Urban City",
    address:
      "Khu đô thị Bắc Châu Giang, phường Lam Hạ, thành phố Phủ Lý, tỉnh Hà Nam.",
    descriptions:
      "Dự án Sun Urban City Hà Nam tọa lạc tại vị trí trung tâm mới của thành phố Phủ Lý.",
  },
  {
    id: 2,
    image: img1,
    title: "Vinhomes Global Gate",
    address: "Đường Trường Sa, xã Đông Hội, huyện Đông Anh, Hà Nội.",
    descriptions: "Dự án Vinhomes Global Gate Nằm sát cạnh Thành Cổ Loa.",
  },
  {
    id: 3,
    image: img3,
    title: "Căn hộ chung cư Citi Alto",
    address: "Đường Nguyễn Thị Định, phường Cát Lái, quận 2, TP.HCM.",
    descriptions: "Citi Alto nằm trong trung tâm khu đô thị Cát Lái.",
  },
  {
    id: 4,
    image: img4,
    title: "Căn hộ chung cư Avatar Thủ Đức",
    address: "Đường Vành Đai 2, phường Trường Thọ, thành phố Thủ Đức.",
    descriptions:
      "Avatar Thủ Đức có quy mô gần 3,3 ha, thiết kế theo mô hình khu căn hộ cao cấp.",
  },
  {
    id: 5,
    image: img5,
    title: "Căn hộ chung cư Raemian",
    address: "Đường DN10, phường Đông Hưng Thuận, Quận 12, TP.HCM.",
    descriptions:
      "Căn hộ Raemian Đông Thuận Quận 12 tọa lạc tại vị trí đắc địa.",
  },
];

const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang

function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Lấy các mục hiện tại
  const getCurrentProperties = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  };

  // Chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    currentUser && (
      <div className="container mt-5">
        <div className="d-flex align-items-center mb-4">
          <h1 style={{ marginRight: "30rem" }}>Profile</h1>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/profile/update")}
          >
            Update Profile
          </button>
        </div>

        <div className="mb-3">
          <span>
            Avatar{" "}
            <img
              src={currentUser.avatar || noavt}
              alt="User Avatar"
              className="img-fluid rounded-circle"
              style={{ width: "50px", height: "50px" }}
            />
          </span>
        </div>
        <p>
          <span>
            Username: <b>{currentUser?.username || "Người dùng"}</b>
          </span>
        </p>

        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center mb-4">
              <h2 style={{ marginRight: "30rem" }}>My List</h2>
              <button className="btn btn-success">Create New Post</button>
            </div>
          </div>
          <div className="section section-properties">
            <div className="container">
              <div className="row">
                {getCurrentProperties().map((property) => (
                  <div className="col-12 mb-30" key={property.id}>
                    <div className="property-item">
                      <a href={`/project/${property.id}`} className="img">
                        <img
                          src={property.image}
                          alt="Property"
                          className="img-fluid"
                        />
                      </a>
                      <div className="property-content">
                        <div className="price mb-2">
                          <span>{property.title}</span>
                        </div>
                        <div>
                          <span
                            className="d-block mb-2 text-black-50"
                            style={{ textAlign: "justify", width: "460px" }}
                          >
                            {property.address}
                          </span>
                          <span
                            className="city d-block mb-3"
                            style={{
                              fontSize: "14px",
                              fontWeight: "200",
                              textAlign: "justify",
                              width: "460px",
                            }}
                          >
                            {property.descriptions}
                          </span>
                          <a
                            href={`/project/${property.id}`}
                            className="btn btn-primary py-2 px-3"
                          >
                            Xem chi tiết
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row align-items-center py-5">
                <div className="col-lg-12 text-center">
                  <div className="custom-pagination">
                    {[...Array(totalPages)].map((_, index) => (
                      <a
                        href="#"
                        key={index + 1}
                        className={currentPage === index + 1 ? "active" : ""}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h2>Saved List</h2>
                <button className="btn btn-warning">Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="chatContainer mt-4">
          <div className="wrapper"></div>
        </div>
      </div>
    )
  );
}

export default Profile;
