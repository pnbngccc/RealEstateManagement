import hero_bg_1 from "@assets/images/hero_bg_1.jpg";

function Contact() {
  return (
    <div
      className="hero page-inner overlay"
      style={{ backgroundImage: `url(${hero_bg_1}` }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-9 text-center mt-5">
            <h1 className="heading" data-aos="fade-up">
              Liên hệ
            </h1>

            <nav
              aria-label="breadcrumb"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <ol className="breadcrumb text-center justify-content-center">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li
                  className="breadcrumb-item active text-white-50"
                  aria-current="page"
                >
                  Liên hệ
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
