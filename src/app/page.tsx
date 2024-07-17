"use client";
import MainHeader from "../../components/main-header";
import { Addbutton, Addrequest, Banners1, CTA } from "./assets/svg";
import ClientJourney from "../../components/client-journey";
import HowItWorks from "../../components/how-it-works";
import CarouselTransition from "../../components/carousel";
import FAQCollapse from "../../components/FAQCollapse";

export default function Home() {
  return (
    <div className="flex justify-center items-top w-dvh h-max  bg-[#DCE9E5]">
      <div className="w-full md:w-1/2  lg:w-1/2 bg-white rounded text-black shadow">
        <div className="rtl w-full">
          <MainHeader />
        </div>
        <div className="flex">
          <main className="container mx-auto ">
            <section className="bg-gray-100 p-4 rounded shadow-md text-center">
              <div className="flex justify-center">
                <div className=" w-96 h-52 ">
                  <CarouselTransition />
                </div>
              </div>

              <div className="flex justify-center space-x-2 mb-8">
                <button className="flex items-center">
                  <Addrequest className="" />
                </button>
                <button className="flex items-center">
                  <Addbutton />
                </button>
              </div>
              <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">آخر الطلبات</h2>
              </div>

              <div className="container mx-auto w-auto  ">
                <div className="flex justify-center pt-4 object-contain w-full h-full  ">
                  <HowItWorks />
                  {/* <HowItWorks2/> */}
                </div>
              </div>
              <div className="container mx-auto py-6 w-auto">
                <div className="flex justify-center object-contain w-full h-full ">
                  <CTA />
                </div>
              </div>
              <div className="container mx-auto w-auto  ">
                <div className="flex justify-center object-contain w-full h-full ">
                  <ClientJourney />
                </div>
              </div>
              <div className="pt-8">
                <FAQCollapse />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
