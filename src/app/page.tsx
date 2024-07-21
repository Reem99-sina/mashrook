"use client";
import MainHeader from "../../components/MainHeader";
import { Addbutton, Addrequest, CTA } from "./assets/svg";

import CarouselTransition from "../../components/Carousel";
import FAQCollapse from "../../components/FAQCollapse";
import Footer from "../../components/Footer";

import HowItWorks2 from "../../components/HowItWorks2";
import ClientJourney2 from "../../components/ClientJourney2";
import PropertyCardUnified from "../../components/PropertyCardUnified";
import { sampleData1, sampleData2, sampleData3 } from "../app/assets/data/data";

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
                  <h2 className="text-xl font-bold mb-4">آخر الطلبات</h2>

                  <PropertyCardUnified
                    unitCount={sampleData1.unitCount}
                    dates={sampleData1.dates}
                    sellers={sampleData1.sellers}
                    statuses={sampleData1.statuses}
                    requestIds={sampleData1.requestIds}
                    licenseNumbers={sampleData1.licenseNumbers}
                    cities={sampleData1.cities}
                    districts={sampleData1.districts}
                    sharePercentages={sampleData1.sharePercentages}
                    areas={sampleData1.areas}
                    prices={sampleData1.prices}
                    currencies={sampleData1.currencies}
                    categories={sampleData1.categories}
                    units={sampleData1.units}
                    dealStatuses={sampleData1.dealStatuses}
                  />
                  <PropertyCardUnified
                    unitCount={sampleData3.unitCount}
                    dates={sampleData3.dates}
                    sellers={sampleData3.sellers}
                    statuses={sampleData3.statuses}
                    requestIds={sampleData3.requestIds}
                    licenseNumbers={sampleData3.licenseNumbers}
                    cities={sampleData3.cities}
                    districts={sampleData3.districts}
                    sharePercentages={sampleData3.sharePercentages}
                    areas={sampleData3.areas}
                    prices={sampleData3.prices}
                    currencies={sampleData3.currencies}
                    categories={sampleData3.categories}
                    units={sampleData3.units}
                    dealStatuses={sampleData3.dealStatuses}
                  />

                  <div className="pt-4">
                    <PropertyCardUnified
                      unitCount={sampleData2.unitCount}
                      dates={sampleData2.dates}
                      sellers={sampleData2.sellers}
                      statuses={sampleData2.statuses}
                      requestIds={sampleData2.requestIds}
                      licenseNumbers={sampleData2.licenseNumbers}
                      cities={sampleData2.cities}
                      districts={sampleData2.districts}
                      sharePercentages={sampleData2.sharePercentages}
                      areas={sampleData2.areas}
                      prices={sampleData2.prices}
                      currencies={sampleData2.currencies}
                      categories={sampleData2.categories}
                      units={sampleData2.units}
                      dealStatuses={sampleData2.dealStatuses}
                    />
                  </div>
                </div>
              </div>

              <div className="container mx-auto w-auto  ">
                <div className="flex justify-center p-4 object-contain w-full h-full  ">
                  <HowItWorks2 />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full h-full  pt-4 ">
                <CTA />
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
