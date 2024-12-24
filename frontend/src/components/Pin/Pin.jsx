import { Marker, Popup } from "react-leaflet";

const Pin = ({ position, popupText }) => {
  return (
    <Marker position={position}>
      <Popup>{popupText}</Popup>
    </Marker>
  );
};

export default Pin;
