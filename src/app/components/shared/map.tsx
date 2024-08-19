import { useState,useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents,useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
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
type LatLngTuple = [number, number];
const UpdateMapCenter = ({ center }:{center:LatLngTuple}) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};
const Map: React.FC<{
  latitude: number; longitude: number; handleSearch: (lat: number, lng: number) => Promise<void>;
}> = ({latitude,longitude,handleSearch}) => {
  const handleLocationSelected = (lat: number, lng: number) => {
    handleSearch(lat,lng)
   
  };

useEffect(()=>{
  console.log(latitude.toFixed(2),longitude.toFixed(2),"latitude,longitude")
},[latitude,longitude])
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={10}
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
       
      <LocationSelector onLocationSelected={handleLocationSelected} />
      <UpdateMapCenter center={[latitude, longitude]} />
    </MapContainer>
  );
};

export default Map;
