"use client";
import MainHeader from "./components/header/MainHeader";
import { Addbutton, Addrequest, CTA } from "./assets/svg";
import CarouselTransition from "../app/components/landingPage/Carousel2";
import FAQCollapse from "../app/components/landingPage/FAQCollapse";
import Footer from "./components/header/Footer2";
import HowItWorks2 from "../app/components/landingPage/HowItWorks2";
import ClientJourney2 from "../app/components/landingPage/ClientJourney2";
import { sampleData5 } from "../app/assets/data/data";
import Link from "next/link";
import PropertyCard from "./components/propertyCard/PropertyCard";
import { MdKeyboardArrowLeft } from "react-icons/md";

const limit = 5;

const slicedData = {
  offersCount: sampleData5.offersCount.slice(0, limit),
  date: sampleData5.date.slice(0, limit),
  seller: sampleData5.seller.slice(0, limit),
  unitStatus: sampleData5.unitStatus.slice(0, limit),
  requestId: sampleData5.requestId.slice(0, limit),
  licenseNumber: sampleData5.licenseNumber.slice(0, limit),
  city: sampleData5.city.slice(0, limit),
  district: sampleData5.district.slice(0, limit),
  offeredShare: sampleData5.offeredShare.slice(0, limit),
  area: sampleData5.area.slice(0, limit),
  price: sampleData5.price.slice(0, limit),
  currency: sampleData5.currency.slice(0, limit),
  unitCategory: sampleData5.unitCategory.slice(0, limit),
  unitType: sampleData5.unitType.slice(0, limit),
  dealStatus: sampleData5.dealStatus.slice(0, limit),
  offerId: sampleData5.offerId.slice(0, limit),
};

export default function Home() {
  return (
    <div className="flex justify-center w-dvh h-max  ">
      <div className="w-full bg-white rounded text-black shadow ">
        <div className="w-full z-50">
          <MainHeader />
        </div>
        <div className="flex">
          <main className="container mx-auto ">
            <section className="bg-gray-100 rounded shadow-md text-center">
              <div className="pt-4">
                <div className="flex justify-center">
                  <div className=" w-96 h-44 ">
                    <CarouselTransition />
                  </div>
                </div>

                <div className="flex justify-center space-x-2 mb-8">
                  <button className="flex items-center">
                    <Addrequest />
                  </button>
                  <button className="flex items-center">
                    <Addbutton />
                  </button>
                </div>
              </div>
              <div className=" p-4 rounded shadow-md w-full">
                <div dir="rtl">
                  <div className="flex justify-between mx-6">
                    <h2 className=" font-bold mb-4 text-2xl">آخر الطلبات</h2>

                    <Link href="/market">
                      <h2 className="flex items-center text-2xl font-bold mb-4 text-blue-450">
                        السوق
                        <MdKeyboardArrowLeft />
                      </h2>
                    </Link>
                  </div>

                  <PropertyCard
                    offersCount={slicedData.offersCount}
                    date={slicedData.date}
                    seller={slicedData.seller}
                    unitStatus={slicedData.unitStatus}
                    requestId={slicedData.requestId}
                    licenseNumber={slicedData.licenseNumber}
                    city={slicedData.city}
                    district={slicedData.district}
                    offeredShare={slicedData.offeredShare}
                    area={slicedData.area}
                    price={slicedData.price}
                    currency={slicedData.currency}
                    unitCategory={slicedData.unitCategory}
                    unitType={slicedData.unitType}
                    dealStatus={slicedData.dealStatus}
                    offerId={slicedData.offerId}
                  />
                </div>
              </div>

              <div className="container mx-auto w-auto">
                <div className="flex justify-center p-4 object-contain w-full h-full  ">
                  <HowItWorks2 />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full h-full  pt-4 ">
                <Link href="/sign-up">
                  <CTA />
                </Link>
              </div>

              <div className="container mx-auto w-auto  ">
                <div className="flex justify-center p-4 object-contain w-full h-full ">
                  <ClientJourney2 />
                </div>
              </div>
              <div className="pt-8">
                <FAQCollapse />
              </div>
              <div className="pt-8">
                <Footer />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

//last modified by Omar Marei 20/7/2024