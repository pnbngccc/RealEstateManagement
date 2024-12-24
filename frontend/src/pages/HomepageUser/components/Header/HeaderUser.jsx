// // import { useContext, useEffect, useState, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import AOS from "aos";
// // import axios from "axios";
// // import "@assets/fonts/icomoon/style.css";
// // import "@assets/fonts/flaticon/font/flaticon.css";
// // import "aos/dist/aos.css";
// // import "@assets/css/style.css";
// // import "@assets/css/tiny-slider.css";
// // import { UserContext } from "../../../../untils/Context.jsx"; // Đảm bảo đường dẫn đúng
// // import noavt from "@assets/images/noavt.jpg";

// // function HeaderAdmin() {
// //   const { currentUser, setCurrentUser } = useContext(UserContext);
// //   const navigate = useNavigate();
// //   const menuRef = useRef(null);
// //   console.log("Current User:", currentUser);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [menuOpen, setMenuOpen] = useState(false);

// //   useEffect(() => {
// //     AOS.init({ duration: 800, once: true });
// //     const token = localStorage.getItem("token");

// //     if (token) {
// //       fetchUserInfo(token);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (menuRef.current && !menuRef.current.contains(event.target)) {
// //         setMenuOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   const fetchUserInfo = async (token) => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get("http://localhost:5000/users/profile", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setCurrentUser(response.data); // Cập nhật currentUser từ API
// //     } catch (error) {
// //       console.error(
// //         "Lỗi lấy thông tin người dùng:",
// //         error.response?.data?.error || error.message
// //       );
// //       setError("Không thể lấy thông tin người dùng.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       await axios.post(
// //         "http://localhost:5000/api/auth/logout",
// //         {},
// //         { withCredentials: true }
// //       );
// //       localStorage.removeItem("user");
// //       setCurrentUser(null); // Cập nhật trạng thái user trong FE
// //       navigate("/admin");
// //     } catch (error) {
// //       console.error("Error during logout:", error);
// //       setError("Đăng xuất không thành công.");
// //     }
// //   };

// //   const toggleMenu = () => {
// //     setMenuOpen((prev) => !prev);
// //   };

// //   const goToProfile = () => {
// //     navigate("/profile");
// //     setMenuOpen(false);
// //   };

// //   return (
// //     <div>
// //       <nav className="site-nav">
// //         <div className="container">
// //           <div className="menu-bg-wrap">
// //             <div className="site-navigation">
// //               <a href="/admin" className="logo m-0 float-start">
// //                 Real Estate Management
// //               </a>
// //               <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end">
// //                 <li>
// //                   <a href="/list-users">Danh sách người dùng</a>
// //                 </li>
// //                 <li className="has-children">
// //                   <a href="#">Bất động sản</a>
// //                   <ul className="dropdown">
// //                     <li>
// //                       <a href="/project-list">Dự án</a>
// //                     </li>
// //                     <li>
// //                       <a href="/properties-list">Bất động sản</a>
// //                     </li>
// //                   </ul>
// //                 </li>
// //                 <li>
// //                   <a href="/list">Cho bán hoặc cho thuê</a>
// //                 </li>
// //                 <li>
// //                   <a href="/about-list">Tin tức</a>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           <div className="float-end mt-1">
// //             {currentUser ? (
// //               <div style={{ position: "relative" }}>
// //                 <div
// //                   className="user-info"
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     cursor: "pointer",
// //                   }}
// //                   onClick={toggleMenu}
// //                 >
// //                   <img
// //                     src={currentUser.avatar || noavt}
// //                     style={{
// //                       borderRadius: "50%",
// //                       width: "40px",
// //                       marginRight: "10px",
// //                       margin: "19px",
// //                     }}
// //                     alt="User Avatar"
// //                   />
// //                   <span style={{ color: "#ccc", fontWeight: "600" }}>
// //                     {currentUser?.user?.username || "Người dùng"}
// //                   </span>
// //                 </div>

// //                 {menuOpen && (
// //                   <div
// //                     ref={menuRef}
// //                     className="dropdown-menu"
// //                     style={{
// //                       display: "block",
// //                       right: "0px",
// //                       backgroundColor: "white",
// //                       border: "1px solid #ccc",
// //                       borderRadius: "5px",
// //                       zIndex: 1000,
// //                       minWidth: "100px",
// //                       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
// //                     }}
// //                   >
// //                     <button className="dropdown-item" onClick={goToProfile}>
// //                       Hồ Sơ
// //                     </button>
// //                     <button className="dropdown-item" onClick={handleLogout}>
// //                       Đăng xuất
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <div>
// //                 <button
// //                   className="btn btn-primary me-2"
// //                   onClick={() => navigate("/register")}
// //                 >
// //                   Đăng ký
// //                 </button>
// //                 <button
// //                   className="btn btn-secondary"
// //                   onClick={() => navigate("/login")}
// //                 >
// //                   Đăng nhập
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </nav>

// //       {loading && <div className="loading-message">Đang tải...</div>}
// //       {error && <div className="error-message">{error}</div>}
// //     </div>
// //   );
// // }

// // export default HeaderAdmin;
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

// function HeaderUsers() {
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
//     // Không cần gọi fetchUserInfo nữa
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
//       setCurrentUser(null); // Cập nhật trạng thái user trong FE
//       navigate("/user");
//     } catch (error) {
//       console.error("Error during logout:", error);
//       setError("Đăng xuất không thành công.");
//     }
//   };

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   return (
//     <div>
//       <nav className="site-nav">
//         <div className="container">
//           <div className="menu-bg-wrap">
//             <div className="site-navigation">
//               <a href="/user" className="logo m-0 float-start">
//                 Real Estate Management
//               </a>
//               <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end">
//                 <li>
//                   <a href="/user">Trang chủ</a>
//                 </li>
//                 <li className="has-children">
//                   <a href="/properties">Bất động sản</a>
//                   <ul className="dropdown">
//                     <li>
//                       <a href="/buy">Mua bất động sản</a>
//                     </li>
//                     <li>
//                       <a href="/rent">Thuê bất động sản</a>
//                     </li>
//                   </ul>
//                 </li>
//                 <li>
//                   <a href="/project">Dự án</a>
//                 </li>
//                 <li>
//                   <a href="/about">Tin tức</a>
//                 </li>
//                 <li>
//                   <a href="/contact">Liên hệ</a>
//                 </li>
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
//                     {currentUser?.user?.username || "Người dùng"}
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

// export default HeaderUsers;
