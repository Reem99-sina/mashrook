"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

// import Map from "../../components/shared/map";
const Map = dynamic(() => import("../../components/shared/map"), {
  ssr: false,
});

import toast from "react-hot-toast";
import { typeInput } from "@/redux/features/postRealEstate";
const MapLocation: React.FC<any> = ({ lat, long, onChange }) => {
  const [viewport, setViewport] = useState({
    latitude: 24.64,
    longitude: 46.72,
    zoom: 6,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (lat: number, lng: number) => {
    try {
      // Replace 'YOUR_GEOCODING_API_URL' with the actual API URL
      setViewport({
        latitude: lat,
        longitude: lng,
        zoom: 14,
      });
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = response.data;
      if (data) {
        setSearchQuery(data.display_name);
        onChange({ lat: lat, long: lng, address: data.display_name });
      } else {
        toast.error("Location not found");
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);
  return (
    <>
      <Map
        latitude={viewport?.latitude}
        longitude={viewport?.longitude}
        handleSearch={handleSearch}
      />

      <div className="flex flex-col  mt-6 gap-3 mb-6 w-full  items-end justify-start">
        <p className="text-base font-bold text-[#4B5563]">العنوان</p>
        <input
          className="w-full h-10 rounded-lg bg-[#D1D5DB]"
          placeholder="Search for a location"
          value={searchQuery}
        />
      </div>
    </>
  );
};
export default MapLocation;
