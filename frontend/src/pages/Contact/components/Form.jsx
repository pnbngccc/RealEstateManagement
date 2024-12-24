const Section = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-4 mb-5 mb-lg-0"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="contact-info">
              <div className="address mt-2">
                <i className="icon-room"></i>
                <h4 className="mb-2">Tọa lạc:</h4>
                <p>
                  236B Lê Văn Sỹ, phường 1, quận Tân Bình,
                  <br />
                  Thành phố Hồ Chí Minh
                </p>
              </div>

              <div className="open-hours mt-4">
                <i className="icon-clock-o"></i>
                <h4 className="mb-2">Thời gian mở cửa:</h4>
                <p> 11:00 AM - 11:00 PM (Thứ 2 - thứ 6)</p>
              </div>

              <div className="email mt-4">
                <i className="icon-envelope"></i>
                <h4 className="mb-2">Email:</h4>
                <p>RealEstateManagement@gmail.com</p>
              </div>

              <div className="phone mt-4">
                <i className="icon-phone"></i>
                <h4 className="mb-2">Liên hệ:</h4>
                <p>+84-931153677</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
            <form action="#">
              <div className="row">
                <div className="col-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và Tên"
                  />
                </div>
                <div className="col-6 mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="col-12 mb-3">
                  <textarea
                    cols="30"
                    rows="7"
                    className="form-control"
                    placeholder="Nội dung"
                  ></textarea>
                </div>

                <div className="col-12">
                  <input
                    type="submit"
                    value="Gửi"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
