import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin"; // Giả sử bạn đã tạo component Pin

const MyMap = ({ position, popupText }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }} // Chiều cao tùy chỉnh
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Pin position={position} popupText={popupText} />
    </MapContainer>
  );
};

export default MyMap;
