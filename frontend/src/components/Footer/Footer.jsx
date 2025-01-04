function Footer() {
  return (
    <div className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="widget">
              <address>
                {" "}
                Địa chỉ: 236B Lê Văn Sỹ, phường 1, quận Tân Bình,
                <br /> Thành phố Hồ Chí Minh
              </address>
              <ul className="list-unstyled links">
                <li>
                  <span>+84-931153677</span>
                </li>
                <li>
                  <a href="mailto:RealEstateManagement@gmail.com">
                    RealEstateManagement@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget">
              <div
                className="footer-links"
                style={{ display: "flex", gap: "20px" }}
              >
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Trang chủ</a>
                  </li>
                </ul>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Bất động sản</a>
                    <ul className="submenu" style={{ listStyle: "none" }}>
                      <li>
                        <a href="#">Mua</a>
                      </li>
                      <li>
                        <a href="#">Thuê</a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Dự án</a>
                  </li>
                </ul>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Tin tức</a>
                  </li>
                </ul>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Liên hệ</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget">
              <ul
                className="list-unstyled social"
                style={{ display: "flex", gap: "4px" }}
              >
                <li>
                  <a href="#">
                    <span className="icon-instagram"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon-facebook"></span>
                  </a>
                </li>
               
                <li>
                  <a href="#">
                    <span className="icon-youtube"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <p>
              Copyright &copy; {new Date().getFullYear()}. Toàn bộ bản quyền
              thuộc về Real Estate Management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
