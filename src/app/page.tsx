"use client";
import MainHeader from "../../components/main-header";
import { Addbutton, Addrequest, Banners1, CTA } from "./assets/svg";
import ClientJourney from "../../components/client-journey";
import HowItWorks from "../../components/how-it-works";
import CarouselTransition from "../../components/carousel";
import FAQCollapse from "../../components/FAQCollapse";
import Footer from "../../components/footer";

export default function Home() {
  return (
    <div className="flex justify-center w-dvh h-max  ">
      <div className="w-full bg-white rounded text-black shadow">
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
                  <Addrequest />
                </button>
                <button className="flex items-center">
                  <Addbutton />
                </button>
              </div>
              <div className="bg-white p-4 rounded shadow-md w-full">
                <h2 className="text-xl font-bold mb-4">آخر الطلبات</h2>
              </div>

              <div className="container mx-auto w-auto  ">
                <div className="flex justify-center pt-4 object-contain w-full h-full  ">
                  <HowItWorks />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full h-full  pt-4 ">
                <CTA />
              </div>

              <div className="container mx-auto w-auto  ">
                <div className="flex justify-center object-contain w-full h-full ">
                  <ClientJourney />
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
