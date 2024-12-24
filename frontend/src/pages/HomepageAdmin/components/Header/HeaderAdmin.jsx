// import { useContext, useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import AOS from "aos";
// import axios from "axios";
// import "@assets/fonts/icomoon/style.css";
// import "@assets/fonts/flaticon/font/flaticon.css";
// import "aos/dist/aos.css";
// import "@assets/css/style.css";
// import "@assets/css/tiny-slider.css";
// import { UserContext } from "../../../../untils/Context.jsx"; // Đảm bảo đường dẫn đúng
// import noavt from "@assets/images/noavt.jpg";

// function HeaderAdmin() {
//   const { currentUser, setCurrentUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const menuRef = useRef(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   console.log("Current User:", currentUser);

//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
//     const token = localStorage.getItem("token");
//     // Có thể gọi fetchUserInfo nếu cần
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       localStorage.removeItem("user");
//       setCurrentUser(null);
//       if (currentUser?.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/user");
//       }
//     } catch (error) {
//       console.error("Lỗi trong quá trình đăng xuất:", error);
//       setError("Đăng xuất không thành công.");
//     }
//   };

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const renderNavLinks = () => {
//     if (currentUser?.role === "admin") {
//       return (
//         <>
//           <li>
//             <a href="/list-users">Danh sách người dùng</a>
//           </li>
//           <li className="has-children">
//             <a href="">Danh sách bất động sản</a>
//             <ul className="dropdown">
//               <li>
//                 <a href="/project-list">Dự án</a>
//               </li>
//               <li className="has-children">
//                 <a href="/list-property">Bất động sản</a>
//                 <ul className="dropdown">
//                   <li>
//                     <a href="/buy">Cho bán</a>
//                   </li>
//                   <li>
//                     <a href="/rent">Cho thuê</a>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <a href="/about-list">Tin tức</a>
//           </li>
//         </>
//       );
//     } else {
//       return (
//         <>
//           <li>
//             <a href="/user">Trang chủ</a>
//           </li>
//           <li className="has-children">
//             <a href="/properties">Bất động sản</a>
//             <ul className="dropdown">
//               <li>
//                 <a href="/buy-properties">Mua bất động sản</a>
//               </li>
//               <li>
//                 <a href="/rent-properties">Thuê bất động sản</a>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <a href="/project">Dự án</a>
//           </li>
//           <li>
//             <a href="/about">Tin tức</a>
//           </li>
//           <li>
//             <a href="/contact">Liên hệ</a>
//           </li>
//         </>
//       );
//     }
//   };

//   return (
//     <div>
//       <nav className="site-nav">
//         <div className="container">
//           <div className="menu-bg-wrap">
//             <div className="site-navigation">
//               <a
//                 href={currentUser?.role === "admin" ? "/admin" : "/user"}
//                 className="logo m-0 float-start"
//               >
//                 Real Estate Management
//               </a>
//               <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end">
//                 {renderNavLinks()}
//               </ul>
//             </div>
//           </div>

//           <div className="float-end mt-1">
//             {currentUser ? (
//               <div style={{ position: "relative" }}>
//                 <div
//                   className="user-info"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                   }}
//                   onClick={toggleMenu}
//                 >
//                   <img
//                     src={currentUser.avatar || noavt}
//                     style={{
//                       borderRadius: "50%",
//                       width: "40px",
//                       marginRight: "10px",
//                       margin: "19px",
//                     }}
//                     alt="User Avatar"
//                   />
//                   <span style={{ color: "#ccc", fontWeight: "600" }}>
//                     {/* {currentUser?.username || "Người dùng"} */}
//                   </span>
//                 </div>

//                 {menuOpen && (
//                   <div
//                     ref={menuRef}
//                     className="dropdown-menu"
//                     style={{
//                       display: "block",
//                       right: "0px",
//                       backgroundColor: "white",
//                       border: "1px solid #ccc",
//                       borderRadius: "5px",
//                       zIndex: 1000,
//                       minWidth: "100px",
//                       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//                     }}
//                   >
//                     <button
//                       className="dropdown-item"
//                       onClick={() => navigate("/profile")}
//                     >
//                       Hồ sơ
//                     </button>
//                     <button className="dropdown-item" onClick={()=>navigate("/favorite")}>
//                       Danh sách yêu thích{" "}
//                     </button>
//                     <button className="dropdown-item" onClick={handleLogout}>
//                       Đăng xuất
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div>
//                 <button
//                   className="btn btn-primary me-2"
//                   onClick={() => navigate("/register")}
//                 >
//                   Đăng ký
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => navigate("/login")}
//                 >
//                   Đăng nhập
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {loading && <div className="loading-message">Đang tải...</div>}
//       {error && <div className="error-message">{error}</div>}
//     </div>
//   );
// }

// export default HeaderAdmin;
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import axios from "axios";
import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "@assets/css/tiny-slider.css";
import { UserContext } from "../../../../untils/Context.jsx"; // Đảm bảo đường dẫn đúng
import noavt from "@assets/images/noavt.jpg";

function HeaderAdmin() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("Current User:", currentUser);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    // Có thể gọi fetchUserInfo nếu cần
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua header
          },
        }
      );
      localStorage.removeItem("user");
      setCurrentUser(null);
      navigate(currentUser?.role === "admin" ? "/admin" : "/user");
    } catch (error) {
      console.error("Lỗi trong quá trình đăng xuất:", error);
      setError("Đăng xuất không thành công.");
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const renderNavLinks = () => {
    if (currentUser?.role === "admin") {
      return (
        <>
          <li>
            <a href="/list-users">Danh sách người dùng</a>
          </li>
          <li className="has-children">
            <a href="">Danh sách bất động sản</a>
            <ul className="dropdown">
              <li>
                <a href="/project-list">Dự án</a>
              </li>
              <li className="has-children">
                <a href="/list-property">Bất động sản</a>
                <ul className="dropdown">
                  <li>
                    <a href="/buy">Cho bán</a>
                  </li>
                  <li>
                    <a href="/rent">Cho thuê</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="/about-list">Tin tức</a>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <a href="/user">Trang chủ</a>
          </li>
          <li className="has-children">
            <a href="/properties">Bất động sản</a>
            <ul className="dropdown">
              <li>
                <a href="/buy-properties">Mua bất động sản</a>
              </li>
              <li>
                <a href="/rent-properties">Thuê bất động sản</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/project">Dự án</a>
          </li>
          <li>
            <a href="/about">Tin tức</a>
          </li>
          <li>
            <a href="/contact">Liên hệ</a>
          </li>
        </>
      );
    }
  };

  return (
    <div>
      <nav className="site-nav">
        <div className="container">
          <div className="menu-bg-wrap">
            <div className="site-navigation">
              <a
                href={currentUser?.role === "admin" ? "/admin" : "/user"}
                className="logo m-0 float-start"
              >
                Real Estate Management
              </a>
              <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end">
                {renderNavLinks()}
              </ul>
            </div>
          </div>

          <div className="float-end mt-1">
            {currentUser ? (
              <div style={{ position: "relative" }}>
                <div
                  className="user-info"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={toggleMenu}
                >
                  <img
                    src={currentUser.avatar || noavt}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      marginRight: "10px",
                      margin: "19px",
                    }}
                    alt="User Avatar"
                  />
                  <span style={{ color: "#ccc", fontWeight: "600" }}>
                    {/* {currentUser?.username || "Người dùng"} */}
                  </span>
                </div>

                {menuOpen && (
                  <div
                    ref={menuRef}
                    className="dropdown-menu"
                    style={{
                      display: "block",
                      right: "0px",
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      zIndex: 1000,
                      minWidth: "100px",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/profile")}
                    >
                      Hồ sơ
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/favorite")}
                    >
                      Danh sách yêu thích{" "}
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {loading && <div className="loading-message">Đang tải...</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default HeaderAdmin;
