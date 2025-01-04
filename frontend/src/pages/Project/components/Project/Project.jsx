// import { useState, useEffect } from "react";
// import axios from "axios";
// import "@assets/fonts/icomoon/style.css";
// import "@assets/fonts/flaticon/font/flaticon.css";
// import "@assets/css/tiny-slider.css";
// import "aos/dist/aos.css";
// import "@assets/css/style.css";
// import "./Project.css";

// const itemsPerPage = 6;

// function ProjectList() {
//   const [projects, setProjects] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/project`);
//       if (response.data.success && Array.isArray(response.data.data)) {
//         setProjects(response.data.data);
//       } else {
//         setError("Không thể tải dữ liệu dự án.");
//       }
//     } catch (err) {
//       console.error("Lỗi khi lấy dữ liệu dự án:", err);
//       setError("Lỗi kết nối đến máy chủ.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const totalPages = Math.ceil(projects.length / itemsPerPage);

//   const getCurrentProjects = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return projects.slice(startIndex, startIndex + itemsPerPage);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

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

//   if (error) {
//     return <div className="text-danger text-center">{error}</div>;
//   }
//   return (
//     <div className="section section-properties">
//       <div className="container">
//         <div className="row">
//           {getCurrentProjects().map((project) => (
//             <div
//               className="col-xs-12 col-sm-6 col-md-6 col-lg-4"
//               key={project._id}
//             >
//               <div className="property-item mb-30">
//                 <a href={`/project/${project.id}`} className="img">
//                   <img
//                     src={project.image}
//                     alt="Project"
//                     className="img-fluid"
//                   />
//                 </a>
//                 <div className="property-content">
//                   <div className="price mb-2">
//                     <span>{project.title}</span>
//                   </div>
//                   <div>
//                     <span className="d-block mb-2 text-black-50">
//                       {project.address}
//                     </span>
//                     <span
//                       className="city d-block mb-3"
//                       style={{
//                         fontSize: "14px",
//                         fontWeight: "200",
//                         textAlign: "justify",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {project.description}
//                     </span>
//                     <div className="specs d-flex mb-4">
//                       <span className="d-block d-flex align-items-center me-3">
//                         <span className="caption">
//                           {project.area || "N/A"} ha
//                         </span>
//                       </span>
//                       <div className="d-flex mt-2">
//                         {project.building && (
//                           <span className="me-3">
//                             <strong>
//                               <i className="fa-regular fa-building"></i>
//                             </strong>{" "}
//                             {project.building}
//                           </span>
//                         )}
//                         {project.apartment && (
//                           <span>
//                             <strong>
//                               <i className="fa-solid fa-house"></i>
//                             </strong>{" "}
//                             {project.apartment}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     <a
//                       href={`/project/${project._id}`}
//                       className="btn btn-primary py-2 px-3"
//                     >
//                       Xem chi tiết
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="row align-items-center py-5">
//           <div className="col-lg-12 text-center">
//             <div className="custom-pagination">
//               {[...Array(totalPages)].map((_, index) => (
//                 <a
//                   href="#"
//                   key={`page-${index + 1}`} //số lượng trang thay đổi liên tục nên chọn key này
//                   className={currentPage === index + 1 ? "active" : ""}
//                   onClick={() => handlePageChange(index + 1)}
//                 >
//                   {index + 1}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectList;

import { useState, useEffect } from "react";
import axios from "axios";
import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "@assets/css/tiny-slider.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "./Project.css";

const itemsPerPage = 6;

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(`http://localhost:5000/api/project`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token qua header
        },
      });
      if (response.data.success && Array.isArray(response.data.data)) {
        setProjects(response.data.data);
      } else {
        setError("Không thể tải dữ liệu dự án.");
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu dự án:", err);
      setError("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const getCurrentProjects = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  if (error) {
    return <div className="text-danger text-center">{error}</div>;
  }

  return (
    <div className="section section-properties">
      <div className="container">
        <div className="row">
          {getCurrentProjects().map((project) => (
            <div
              className="col-xs-12 col-sm-6 col-md-6 col-lg-4"
              key={project._id}
            >
              <div className="property-item mb-30">
                <a href={`/project/${project.id}`} className="img">
                  <img
                    src={
                      project.images && project.images.length > 0
                        ? project.images[0]
                        : "default-image.jpg"
                    } // Hiển thị ảnh đầu tiên hoặc ảnh mặc định
                    alt="Project"
                    className="img-fluid"
                  />
                </a>
                <div className="property-content">
                  <div className="price mb-2">
                    <span>{project.title}</span>
                  </div>
                  <div>
                    <span className="d-block mb-2 text-black-50">
                      {project.address}
                    </span>
                    <span
                      className="city d-block mb-3"
                      style={{
                        fontSize: "14px",
                        fontWeight: "200",
                        textAlign: "justify",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {project.description}
                    </span>
                    <div className="specs d-flex mb-4">
                      <span className="d-block d-flex align-items-center me-3">
                        <span className="caption">
                          {project.area || "N/A"} ha
                        </span>
                      </span>
                      <div className="d-flex mt-2">
                        {project.building && (
                          <span className="me-3">
                            <strong>
                              <i className="fa-regular fa-building"></i>
                            </strong>{" "}
                            {project.building}
                          </span>
                        )}
                        {project.apartment && (
                          <span>
                            <strong>
                              <i className="fa-solid fa-house"></i>
                            </strong>{" "}
                            {project.apartment}
                          </span>
                        )}
                      </div>
                    </div>
                    <a
                      href={`/projects/${project._id}`}
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
                  key={`page-${index + 1}`}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
