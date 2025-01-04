// import { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../untils/Context";

// function Login() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { setCurrentUser } = useContext(UserContext); // Lấy setCurrentUser từ UserContext

//   // const { updateUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     const formData = new FormData(e.target);
//     const username = formData.get("register-username");
//     const password = formData.get("register-password");

//     // console.log(username, password,);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           username,
//           password,
//         },
//         { withCredentials: true } // Bật cookie
//       );
//       const user = response.data;
//       console.log("User data:", user); // Kiểm tra dữ liệu trả về
//       console.log("Login Response:", response.data); // Log response

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", user.token); // Lưu token nếu có

//       // Cập nhật currentUser trong Context
//       setCurrentUser(user);

//       // Điều hướng dựa trên vai trò
//       if (user.role === "admin") {
//         navigate("/admin"); // Chuyển đến trang admin
//       } else if (user.role === "user") {
//         navigate("/user"); // Chuyển đến trang user
//       } else {
//         setError("Vai trò không hợp lệ.");
//       }
//     } catch (error) {
//       console.log(error);
//       setError(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-overlay">
//       <div className="login-form">
//         <h2>Đăng Nhập</h2>
//         {error && <span>{error}</span>}

//         {!user ? (
//           <form onSubmit={handleLoginSubmit}>
//             <div className="form-group">
//               <label htmlFor="login-username">Tên đăng nhập:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="login-username"
//                 name="register-username"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="login-password">Mật khẩu:</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="login-password"
//                 name="register-password"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={loading}
//             >
//               Đăng Nhập
//             </button>
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={() => {
//                 navigate("/");
//               }}
//             >
//               Hủy
//             </button>
//             <p>
//               Chưa có tài khoản? <a href="/register">Đăng ký</a>
//             </p>
//           </form>
//         ) : (
//           <div>
//             <h3>Xin chào, {user.username}</h3>
//             {/* Xóa nút Đăng Xuất nếu không cần thiết */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../untils/Context";

function Login() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("login-username");
    const password = formData.get("login-password");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      const userData = response.data;

      console.log("User data:", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token); // Lưu token nếu có

      // Cập nhật currentUser trong Context
      setCurrentUser(userData.user);

      // Điều hướng dựa trên vai trò
      if (userData.role === "admin") {
        navigate("/admin"); // Chuyển đến trang admin
      } else if (userData.role === "user") {
        navigate("/user"); // Chuyển đến trang user
      } else {
        setError("Vai trò không hợp lệ.");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-form">
        <h2>Đăng Nhập</h2>
        {error && <span>{error}</span>}

        {!user ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-username">Tên đăng nhập:</label>
              <input
                type="text"
                className="form-control"
                id="login-username"
                name="login-username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Mật khẩu:</label>
              <input
                type="password"
                className="form-control"
                id="login-password"
                name="login-password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Đăng Nhập
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                navigate("/");
              }}
            >
              Hủy
            </button>
            <p>
              Chưa có tài khoản? <a href="/register">Đăng ký</a>
            </p>
          </form>
        ) : (
          <div>
            <h3>Xin chào, {user.username}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
