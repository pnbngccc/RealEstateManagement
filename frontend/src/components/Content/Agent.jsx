import { useState } from "react";

function CallToAction() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [loginError, setLoginError] = useState(""); // State cho thông báo lỗi đăng nhập

  const handleLoginClick = () => {
    setIsLoginVisible(true);
    setLoginError(""); // Reset thông báo lỗi khi mở form
  };

  const handleCloseLogin = () => {
    setIsLoginVisible(false);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic đăng nhập ở đây
  };

  return (
    <div className="section">
      <div className="row justify-content-center footer-cta" data-aos="fade-up">
        <div className="col-lg-7 mx-auto text-center">
          <h2 className="mb-4">
            Hãy là một phần của các đại lý bất động sản đang phát triển của
            chúng tôi
          </h2>
          <p style={{ textAlign: "center" }}>
            <button
              className="btn btn-primary text-white py-3 px-4"
              onClick={handleLoginClick}
            >
              Ứng tuyển Đại lý bất động sản
            </button>
          </p>
        </div>
      </div>
      {isLoginVisible && (
        <div className="login-overlay">
          <div className="login-form">
            <h2>Đăng Nhập</h2>
            {loginError && <div className="error-message">{loginError}</div>}
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="login-email"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Đăng Nhập
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseLogin}
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CallToAction;
