import PropTypes from "prop-types";
import heroImage from "../../assets/images/hero_bg_3.jpg";
function HomeSection() {
  return (
    <div className="section section-4 bg-light">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-5">
            <h2 className="font-weight-bold heading text-primary mb-4">
              Hãy tìm một ngôi nhà hoàn hảo cho bạn{" "}
            </h2>
            {/* <p className="text-black-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              enim pariatur similique debitis vel nisi qui reprehenderit.
            </p> */}
          </div>
        </div>
        <div className="row justify-content-between mb-5">
          <div className="col-lg-7 mb-5 mb-lg-0 order-lg-2">
            <div className="img-about dots">
              <img src={heroImage} alt="Beautiful home" className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-4">
            <FeatureItem
              iconClass="icon-home2"
              title="Real Estate Management"
              description="Cung cấp giải pháp toàn diện cho quản lý bất động sản, giúp tối ưu hóa giá trị tài sản và nâng cao trải nghiệm khách hàng."
            />
            <FeatureItem
              iconClass="icon-person"
              title="Đại lý được xếp hàng đầu"
              description="Cung cấp dịch vụ bất động sản xuất sắc, nổi bật với đội ngũ chuyên viên tận tâm và kiến thức sâu rộng về thị trường."
            />
            <FeatureItem
              iconClass="icon-security"
              title="Bất động sản uy tín"
              description="Đảm bảo mang đến cho khách hàng sự an tâm với những dự án chất lượng, dịch vụ chuyên nghiệp và minh bạch trong mọi giao dịch."
            />
          </div>
        </div>
        <div
          className="row section-counter mt-5"
          style={{ marginLeft: "90px" }}
        >
          <CounterItem number="3298" caption="# Mua tài sản" delay={300} />
          <CounterItem number="2181" caption="# Thuê tài sản" delay={400} />
          <CounterItem number="9316" caption="# Tất cả tài sản" delay={500} />
          <CounterItem number="7191" caption="# Đại lý" delay={600} />
        </div>
      </div>
    </div>
  );
}

// Định nghĩa các props chung
const commonPropTypes = {
  iconClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

function FeatureItem(props) {
  return (
    <div className="d-flex feature-h mb-4">
      <span className="wrap-icon me-3">
        <span className={props.iconClass}></span>
      </span>
      <div className="feature-text">
        <h3 className="heading">{props.title}</h3>
        <p className="text-black-50">{props.description}</p>
      </div>
    </div>
  );
}

FeatureItem.propTypes = {
  iconClass: commonPropTypes.iconClass,
  title: commonPropTypes.title,
  description: commonPropTypes.description,
};

function CounterItem(props) {
  return (
    <div
      className="col-6 col-sm-6 col-md-6 col-lg-3"
      data-aos="fade-up"
      data-aos-delay={props.delay}
    >
      <div className="counter-wrap mb-5 mb-lg-0">
        <span className="number">
          <span className="countup text-primary">{props.number}</span>
        </span>
        <span className="caption text-black-50">{props.caption}</span>
      </div>
    </div>
  );
}

CounterItem.propTypes = {
  number: commonPropTypes.number,
  caption: commonPropTypes.caption,
  delay: commonPropTypes.delay,
};

export default HomeSection;
