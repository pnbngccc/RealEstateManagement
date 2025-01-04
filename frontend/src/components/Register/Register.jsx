// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";

// function Register() {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [role, setRole] = useState("user");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); // Khởi tạo useNavigate

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setLoading(true);
//     setErrorMessage("");
//     const formData = new FormData(e.target);
//     const username = formData.get("register-username");
//     const password = formData.get("register-password");
//     const confirmPassword = formData.get("register-confirm-password");
//     const phone = formData.get("phone");

//     console.log(username, password, confirmPassword,phone);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         {
//           username,
//           password,
//           role,
//           phone,
//         }
//       );
//       navigate("/login"); // Chuyển đến trang đăng nhập
//     } catch (error) {
//       console.log(error);
//       setErrorMessage(error.response.data.message);
//     } finally {
//       setLoading(false);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-overlay">
//       <div className="login-form">
//         <h2>Đăng Ký</h2>
//         {errorMessage && <span>{errorMessage}</span>}
//         {isLoading && <div className="loading-message">Đang tải...</div>}
//         <form onSubmit={handleRegisterSubmit}>
//           <div className="form-group">
//             <label htmlFor="register-username">Tên đăng nhập:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="register-username"
//               name="register-username"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="register-password">Mật khẩu:</label>
//             <input
//               type="password"
//               className="form-control"
//               id="register-password"
//               name="register-password"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="register-confirm-password">
//               Xác nhận mật khẩu:
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="register-confirm-password"
//               name="register-confirm-password"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">Số điện thoại:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="phone"
//               name="phone"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="register-role">Vai trò:</label>
//             <select
//               className="form-control"
//               id="register-role"
//               name="register-role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="user">Người dùng thường</option>
//               <option value="admin">Quản trị viên</option>
//             </select>
//           </div>
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             Đăng Ký
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => {
//               // Logic để ẩn form hoặc thực hiện hành động khác
//               navigate("/");
//             }}
//           >
//             Hủy
//           </button>
//           <p>
//             Đã có tài khoản?{" "}
//             <a href="#" onClick={() => navigate("/login")}>
//               Đăng nhập
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoading(true);
    setErrorMessage("");
    const formData = new FormData(e.target);
    const fullname = formData.get("register-fullname");
    const username = formData.get("register-username");
    const password = formData.get("register-password");
    const confirmPassword = formData.get("register-confirm-password");
    const phone = formData.get("phone");

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
      setLoading(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          password,
          role,
          phone,
          fullname,
        }
      );

      const userData = response.data; // Nhận dữ liệu người dùng từ phản hồi
      localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng vào Local Storage
      localStorage.setItem("token", userData.token); // Lưu token vào Local Storage nếu có

      navigate("/login"); // Chuyển đến trang đăng nhập
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || "Đăng ký thất bại.");
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-form">
        <h2>Đăng Ký</h2>
        {errorMessage && <span>{errorMessage}</span>}
        {isLoading && <div className="loading-message">Đang tải...</div>}
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label htmlFor="register-fullname">Họ và tên:</label>
            <input
              type="text"
              className="form-control"
              id="register-fullname"
              name="register-fullname"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-username">Tên đăng nhập:</label>
            <input
              type="text"
              className="form-control"
              id="register-username"
              name="register-username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">Mật khẩu:</label>
            <input
              type="password"
              className="form-control"
              id="register-password"
              name="register-password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-confirm-password">
              Xác nhận mật khẩu:
            </label>
            <input
              type="password"
              className="form-control"
              id="register-confirm-password"
              name="register-confirm-password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-role">Vai trò:</label>
            <select
              className="form-control"
              id="register-role"
              name="register-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Người dùng thường</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Đăng Ký
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
            Đã có tài khoản?{" "}
            <a href="#" onClick={() => navigate("/login")}>
              Đăng nhập
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
