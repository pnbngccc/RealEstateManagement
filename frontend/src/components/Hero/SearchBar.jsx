import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/fonts/icomoon/style.css";
import "../../assets/fonts/flaticon/font/flaticon.css";
import "aos/dist/aos.css";
import "../../assets/css/style.css";
import "../../assets/css/tiny-slider.css";
import AOS from "aos";
import heroBg1 from "../../assets/images/hero_bg_1.jpg";
import heroBg2 from "../../assets/images/hero_bg_2.jpg";
import heroBg3 from "../../assets/images/hero_bg_3.jpg";
import axios from "axios";
import { tns } from "tiny-slider/src/tiny-slider";
import "./Form.css";

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    priceRange: "",
    propertyType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { city, priceRange, propertyType } = query;
    let [minPrice, maxPrice] = priceRange
      ? priceRange.split("-").map(Number)
      : [undefined, undefined];

    // Kiểm tra các điều kiện tìm kiếm
    if (!city) {
      setErrorMessage("Vui lòng nhập thành phố.");
      return;
    }

    // Kiểm tra các điều kiện giá
    if (priceRange && (isNaN(minPrice) || isNaN(maxPrice))) {
      setErrorMessage("Khoảng giá không hợp lệ.");
      return;
    }
    if (minPrice < 0 || maxPrice < 0) {
      setErrorMessage("Giá không thể âm.");
      return;
    }
    if (minPrice > maxPrice) {
      setErrorMessage("Giá tối thiểu phải nhỏ hơn giá tối đa.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/property`, {
        params: {
          type: query.type,
          city: city,
          minPrice: priceRange ? minPrice : undefined,
          maxPrice: priceRange ? maxPrice : undefined,
          propertyType: propertyType,
        },
      });

      const data = response.data;

      if (data.success && data.data.length > 0) {
        setSuccessMessage(`Tìm thấy ${data.meta.total} bất động sản.`);
        navigate(
          `/search-result?type=${query.type}&city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}&propertyType=${propertyType}`
        );
      } else {
        setErrorMessage(data.message || "Không tìm thấy bất động sản.");
      }
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi khi tìm kiếm.");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
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
          <div className="col-lg-9 text-center" style={{paddingTop:"10%"}}>
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

          <form action="#" className="form-search" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control form-control-custom"
              placeholder="Thành phố"
              value={query.city}
              onChange={(e) => setQuery({ ...query, city: e.target.value })}
            />
            <select
              className="form-control form-control-custom"
              value={query.priceRange}
              onChange={(e) =>
                setQuery({ ...query, priceRange: e.target.value })
              }
              style={{ paddingBottom: "0px", paddingTop: "2px" }}
            >
              <option value="">Chọn khoảng giá</option>
              <option value="0-5000000000">Dưới 5 tỷ</option>
              <option value="5000000000-10000000000">5 tỷ - 10 tỷ</option>
              <option value="10000000000-15000000000">10 tỷ - 15 tỷ</option>
              <option value="15000000000-20000000000">15 tỷ - 20 tỷ</option>
            </select>
            <select
              className="form-control form-control-custom"
              value={query.propertyType}
              onChange={(e) =>
                setQuery({ ...query, propertyType: e.target.value })
              }
              style={{ paddingBottom: "0px", paddingTop: "2px" }}
            >
              <option value="">Chọn loại bất động sản</option>
              <option value="all">Tất cả</option>
              <option value="house">Nhà</option>
              <option value="apartment">Căn hộ</option>
              <option value="land">Đất</option>
              <option value="commercial">Thương mại</option>
            </select>
            <button type="submit" className="btn btn-primary">
              Tìm kiếm
            </button>
          </form>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
