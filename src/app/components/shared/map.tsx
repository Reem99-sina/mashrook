import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LocationSelectorProps {
  onLocationSelected: (lat: number, lng: number) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationSelected,
}) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      onLocationSelected(lat, lng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}></Marker>
  );
};

const Map: React.FC = () => {
  const handleLocationSelected = (lat: number, lng: number) => {
    console.log(`Selected Location: Latitude: ${lat}, Longitude: ${lng}`);
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationSelector onLocationSelected={handleLocationSelected} />
    </MapContainer>
  );
};

export default Map;
