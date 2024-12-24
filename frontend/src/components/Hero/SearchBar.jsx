import { useEffect, useState } from "react";
import "../../assets/fonts/icomoon/style.css";
import "../../assets/fonts/flaticon/font/flaticon.css";
import "aos/dist/aos.css";
import "../../assets/css/style.css";
import "../../assets/css/tiny-slider.css";
import AOS from "aos";
import { tns } from "tiny-slider/src/tiny-slider";
import heroBg1 from "../../assets/images/hero_bg_1.jpg";
import heroBg2 from "../../assets/images/hero_bg_2.jpg";
import heroBg3 from "../../assets/images/hero_bg_3.jpg";

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: "MinPrice",
    maxPrice: "MaxPrice",
  });

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    const slider = tns({
      container: ".hero-slide",
      items: 1,
      slideBy: 1,
      autoplay: true,
      autoplayButtonOutput: false,
      controls: true,
      nav: true,
      speed: 200,
    });

    return () => {
      if (slider && slider.destroy) {
        slider.destroy();
      }
    };
  }, []);

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Kiểm tra và xử lý thông tin tìm kiếm
    const { location, minPrice, maxPrice } = query;

    if (!location) {
      alert("Vui lòng nhập thành phố.");
      return;
    }

    if (minPrice < 0 || maxPrice < 0) {
      alert("Giá không thể âm.");
      return;
    }

    if (minPrice > maxPrice) {
      alert("Giá tối thiểu phải nhỏ hơn giá tối đa.");
      return;
    }

    // Xử lý tìm kiếm (gọi API hoặc logic tìm kiếm ở đây)
    console.log("Searching for:", query);
  };

  return (
    <div className="hero">
      <div className="hero-slide">
        <div
          className="img overlay"
          style={{ backgroundImage: `url(${heroBg3})` }}
        ></div>
        <div
          className="img overlay"
          style={{ backgroundImage: `url(${heroBg2})` }}
        ></div>
        <div
          className="img overlay"
          style={{ backgroundImage: `url(${heroBg1})` }}
        ></div>
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-9 text-center">
            <button
              className={`btn btn-primary ${
                query.type === "buy" ? "active" : ""
              }`}
              style={{ borderRadius: "20px", marginRight: "5px" }}
              onClick={() => switchType("buy")}
            >
              Mua
            </button>
            <button
              className={`btn btn-primary ${
                query.type === "rent" ? "active" : ""
              }`}
              style={{
                borderRadius: "20px",
                background: "#ccc",
                color: "black",
              }}
              onClick={() => switchType("rent")}
            >
              Thuê
            </button>
          </div>
          <form
            action="#"
            className="narrow-w form-search d-flex align-items-stretch mb-3"
            data-aos="fade-up"
            data-aos-delay="200"
            style={{ marginTop: "-600px" }}
            onSubmit={handleSearch} // Gọi hàm xử lý tìm kiếm khi gửi form
          >
            <input
              type="text"
              className="form-control px-4"
              placeholder="Thành phố"
              value={query.location}
              onChange={(e) => setQuery({ ...query, location: e.target.value })}
              style={{ borderRadius: "20px" }}
            />
            <input
              type="number"
              className="form-control px-4"
              min={0}
              max={10000000000}
              placeholder="Max Price"
              value={query.maxPrice}
              onChange={(e) =>
                setQuery({ ...query, maxPrice: parseFloat(e.target.value) })
              }
              style={{ borderRadius: "20px" }}
            />
            <input
              type="number"
              className="form-control px-4"
              min={0}
              max={10000000000}
              placeholder="Min Price"
              value={query.minPrice}
              onChange={(e) =>
                setQuery({ ...query, minPrice: parseFloat(e.target.value) })
              }
              style={{ borderRadius: "20px" }}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
