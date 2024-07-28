"use client";

import React from "react";
import MainHeader from "./MainHeader";
import Footer from "./Footer2";
import { Carousel } from "@material-tailwind/react";

const PropertyDetails: React.FC = () => {
  return (
    <div dir="rtl" className="bg-white">
      <div dir="ltr">
        <MainHeader />
      </div>
      <div>
      {/* <SimpleSlider /> */}
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
