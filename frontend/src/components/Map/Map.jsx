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
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const MyMap = ({ position, popupText }) => {
//   return (
//     <LoadScript googleMapsApiKey="AIzaSyCqNFRArvRxryWzMYaTJK2CbwTjMoNHcpo">
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={position}
//         zoom={13}
//       >
//         <Marker position={position} label={popupText} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MyMap;
// import React from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%", // Hoặc thay đổi theo kích thước bạn muốn
//   height: "400px",
// };

// const MyMap = ({ position, popupText }) => {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyCqNFRArvRxryWzMYaTJK2CbwTjMoNHcpo", // Thay bằng API Key của bạn
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(
//     function callback(map) {
//       const bounds = new window.google.maps.LatLngBounds(position);
//       map.fitBounds(bounds);
//       setMap(map);
//     },
//     [position]
//   );

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={position}
//       zoom={13}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       <Marker position={position} label={popupText} />
//     </GoogleMap>
//   ) : (
//     <div>Đang tải bản đồ...</div> // Thay thế bằng thông điệp khi đang tải
//   );
// };

// export default React.memo(MyMap);
