import "../../assets/fonts/icomoon/style.css";
import "../../assets/fonts/flaticon/font/flaticon.css";
import "aos/dist/aos.css";
import "../../assets/css/style.css";
import "../../assets/css/tiny-slider.css";
function Features() {
  const features = [
    {
      icon: "flaticon-house",
      title: "Các tài sản của chúng tôi",
      description:
        "Danh mục bất động sản đa dạng từ căn hộ, nhà phố đến đất nền vị trí đẹp, pháp lý minh bạch. Tất cả đều được chọn lọc kỹ lưỡng, đảm bảo giá trị gia tăng và phù hợp với nhu cầu của khách hàng. Chúng tôi cam kết mang đến những giải pháp đầu tư và an cư tốt nhất, đáp ứng mọi mong đợi của bạn.",
      delay: 300,
    },
    {
      icon: "flaticon-building",
      title: "Bất động sản để bán",
      description:
        "Cần bán bất động sản đa dạng từ căn hộ, nhà phố đến đất nền, vị trí đẹp, pháp lý rõ ràng. Tất cả đều được chọn lựa kỹ lưỡng, đảm bảo giá trị gia tăng và phù hợp với nhu cầu khách hàng. Chúng tôi cam kết mang đến những giải pháp an cư và đầu tư tốt nhất, đáp ứng mọi mong đợi của bạn.",
      delay: 500,
    },
    {
      icon: "flaticon-house-3",
      title: "Đại lý bất động sản",
      description:
        "Chúng tôi là đại lý bất động sản uy tín, cung cấp giải pháp mua bán, cho thuê và đầu tư. Đội ngũ chuyên viên am hiểu thị trường, cam kết mang đến bất động sản chất lượng, pháp lý rõ ràng và giá trị tốt nhất. Bạn cần căn hộ, nhà phố, đất nền hay bất động sản thương mại, chúng tôi luôn sẵn sàng hỗ trợ.",
      delay: 400,
    },
    {
      icon: "flaticon-house-1",
      title: "Nhà bán",
      description:
        "Cần bán nhà đẹp, thiết kế hiện đại, đầy đủ tiện nghi, phù hợp để ở hoặc đầu tư. Vị trí thuận lợi, gần trường học, chợ, bệnh viện và các tiện ích công cộng. Nhà có pháp lý minh bạch, không gian rộng rãi, sẵn sàng bàn giao ngay. Đây là lựa chọn hoàn hảo cho gia đình hoặc khai thác kinh doanh.",
      delay: 600,
    },
  ];

  return (
    <section className="features-1">
      <div className="container">
        <div className="row">
          {features.map((feature, index) => (
            <div
              className="col-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay={feature.delay}
              key={index}
            >
              <div className="box-feature">
                <span className={feature.icon}></span>
                <h3 className="mb-3">{feature.title}</h3>
                <p>{feature.description}</p>
                <p>
                  <a href="#" className="learn-more">
                    Xem thêm
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
