// import { useContext, useEffect, useState } from "react";

// import "@assets/fonts/icomoon/style.css";
// import "@assets/fonts/flaticon/font/flaticon.css";
// import "@assets/css/tiny-slider.css";
// import "aos/dist/aos.css";
// import "@assets/css/style.css";
// import "./Favorite.css";
// import { useNavigate } from "react-router-dom";
// import noavt from "@assets/images/noavt.jpg";
// import { UserContext } from "../../../untils/Context";
// import axios from "axios";

// const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang

// function Favorite() {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(UserContext);
//   const [favorites, setFavorites] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/login");
//       return;
//     }

//     const fetchFavorites = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/favorite", {
//           withCredentials: true,
//         });

//         if (response.data.success) {
//           setFavorites(response.data.data); // Giả sử response.data.data chứa danh sách yêu thích
//         } else {
//           throw new Error("Không thể lấy danh sách yêu thích.");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, [currentUser, navigate]);

//   // Tính toán tổng số trang
//   const totalPages = Math.ceil(favorites.length / itemsPerPage);

//   // Lấy các mục hiện tại
//   const getCurrentProperties = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return favorites.slice(startIndex, startIndex + itemsPerPage);
//   };

//   // Chuyển trang
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   if (loading) {
//     return (
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">Đang tải...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="mt-4">
//         <div className="section section-properties">
//           <div className="container">
//             <h2>My List</h2>
//             <div className="favorite-list">
//               {" "}
//               {/* Thay đổi ở đây */}
//               {getCurrentProperties().map((favorite) => (
//                 <div className="favorite-property-item" key={favorite._id}>
//                   {" "}
//                   {/* Cập nhật class ở đây */}
//                   <a
//                     href={`/properties/${favorite.idProperty._id}`}
//                     className="img"
//                   >
//                     <img
//                       src={favorite.idProperty.image || noavt}
//                       alt="Property"
//                       className="img-fluid"
//                     />
//                   </a>
//                   <div className="property-content">
//                     <div className="price mb-2">
//                       <span>{favorite.idProperty.title}</span>
//                     </div>
//                     <div>
//                       <span
//                         className="d-block mb-2 text-black-50"
//                         style={{ textAlign: "justify", width: "100%" }}
//                       >
//                         {favorite.idProperty.address}
//                       </span>
//                       <a
//                         href={`/properties/${favorite.idProperty._id}`}
//                         className="btn btn-primary py-2 px-3"
//                       >
//                         Xem chi tiết
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="row align-items-center py-5">
//               <div className="col-lg-12 text-center">
//                 <div className="custom-pagination">
//                   {[...Array(totalPages)].map((_, index) => (
//                     <a
//                       href="#"
//                       key={index + 1}
//                       className={currentPage === index + 1 ? "active" : ""}
//                       onClick={() => handlePageChange(index + 1)}
//                     >
//                       {index + 1}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="chatContainer mt-4">
//         <div className="wrapper"></div>
//       </div>
//     </div>
//   );
// }

// export default Favorite;
import { useContext, useEffect, useState } from "react";
import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "@assets/css/tiny-slider.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "./Favorite.css";
import { useNavigate } from "react-router-dom";
import noavt from "@assets/images/noavt.jpg";
import { UserContext } from "../../../untils/Context";
import axios from "axios";

const itemsPerPage = 6; // Number of items to display per page

function Favorite() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchFavorites = async () => {
      const token = localStorage.getItem("userToken"); // Get token from localStorage

      try {
        const response = await axios.get("http://localhost:5000/api/favorite", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token via header
          },
        });

        // Check the response structure
        console.log(response.data); // Debugging log
        if (response.data.success) {
          setFavorites(response.data.data); // Assuming response.data.data contains the favorites list
        } else {
          throw new Error("Cannot retrieve favorites list.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser, navigate]);

  // Calculate total pages
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  // Get current properties
  const getCurrentProperties = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return favorites.slice(startIndex, startIndex + itemsPerPage);
  };

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="mt-4">
        <div className="section section-properties">
          <div className="container">
            <h2>Danh sách yêu thích của tôi</h2>
            <div className="favorite-list">
              {getCurrentProperties().map((favorite) => {
                // Defensive checks
                if (!favorite.idProperty || !favorite.idProperty._id) {
                  return null; // Bỏ qua mục này nếu idProperty hoặc _id là null
                }

                return (
                  <div className="favorite-property-item" key={favorite._id}>
                    <a
                      href={`/properties/${favorite.idProperty._id}`}
                      className="img"
                    >
                      <img
                        src={favorite.idProperty.image || noavt}
                        alt="Property"
                        className="img-fluid"
                      />
                    </a>
                    <div className="property-content">
                      <div className="price mb-2">
                        <span>{favorite.idProperty.title}</span>
                      </div>
                      <div>
                        <span
                          className="d-block mb-2 text-black-50"
                          style={{ textAlign: "justify", width: "100%" }}
                        >
                          {favorite.idProperty.address}
                        </span>
                        <a
                          href={`/properties/${favorite.idProperty._id}`}
                          className="btn btn-primary py-2 px-3"
                        >
                          Xem chi tiết
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
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
          </div>
        </div>
      </div>
      <div className="chatContainer mt-4">
        <div className="wrapper"></div>
      </div>
    </div>
  );
}

export default Favorite;
