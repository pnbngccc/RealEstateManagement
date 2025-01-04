import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "@assets/css/tiny-slider.css";

function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div>
      <nav className="site-nav">
        <div className="container">
          <div className="menu-bg-wrap">
            <div className="site-navigation">
              <a href="/" className="logo m-0 float-start">
                Real Estate Management
              </a>
              <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end">
                <li>
                  <a href="/">Trang chủ</a>
                </li>
                <li className="has-children">
                  <a href="/properties">Bất động sản</a>
                  <ul className="dropdown">
                    <li>
                      <a href="/buy">Mua bất động sản</a>
                    </li>
                    <li>
                      <a href="/rent">Thuê bất động sản</a>
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
              </ul>
            </div>
          </div>
          <div className="float-end mt-1">
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate("/register")}
                style={{ backgroundColor: "#c3c3c3", color: "#333" }}
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
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
