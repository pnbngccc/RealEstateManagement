import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderAdmin from "../../pages/HomepageAdmin/components/Header/HeaderAdmin";
import SearchBar from "../Hero/SearchBar";
import Footer from "../Footer/Footer";

function SearchResults() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const city = queryParams.get("city"); // Cập nhật từ location thành city
  const minPrice = parseFloat(queryParams.get("minPrice"));
  const maxPrice = parseFloat(queryParams.get("maxPrice"));
  const propertyType = queryParams.get("propertyType"); // Lấy loại bất động sản

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/property`, {
          params: {
            type,
            city,
            minPrice: !isNaN(minPrice) ? minPrice : undefined,
            maxPrice: !isNaN(maxPrice) ? maxPrice : undefined,
            propertyType,
          },
        });

        console.log("Response data:", response.data);
        // Kiểm tra dữ liệu trả về
        if (response.data.success) {
          const filteredProperties = response.data.data.filter((property) => {
            const price = parseFloat(property.price);
            const isPriceInRange =
              (isNaN(minPrice) || price >= minPrice) &&
              (isNaN(maxPrice) || price <= maxPrice);
            const isTypeMatch =
              !propertyType || property.property_type === propertyType;

            return isPriceInRange && isTypeMatch;
          });

          setProperties(filteredProperties);

          if (filteredProperties.length === 0) {
            setError("Không tìm thấy bất động sản.");
          }
        } else {
          setError("Không tìm thấy bất động sản.");
        }
      } catch (error) {
        setError("Đã xảy ra lỗi khi tìm kiếm.");
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [type, city, minPrice, maxPrice, propertyType]); // Thêm propertyType vào danh sách dependencies

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!Array.isArray(properties) || properties.length === 0) {
    return <div>Không có kết quả nào.</div>;
  }

  return (
    <div>
      <HeaderAdmin />
      <SearchBar />
      <h2>Kết quả tìm kiếm cho: {city}</h2>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property.id} className="property-item">
            <h5>{property.title}</h5>
            <p>Giá: {property.price} VNĐ</p>
            <p>Địa chỉ: {property.address}</p>
            <p>Loại: {property.property_type}</p>{" "}
            {/* Hiển thị loại bất động sản */}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default SearchResults;
