"use client";
import MainHeader from "../../components/main-header";

export default function Home() {
  return (
    <div className="flex justify-center items-top w-dvh h-dvh  ">
      <div className="w-full md:w-1/2  lg:w-1/2 bg-white rounded text-black shadow">
        <div className="rtl w-full">
          <MainHeader />
        </div>
        <div className="flex rtl">
          <main className="container mx-auto p-4">
            <section className="bg-white p-8 rounded shadow-md text-center">
              <h1 className="text-3xl font-bold mb-4 text-blue-500">
                أمتلك عقارك بسعر أوفر
              </h1>
              <p className="text-2xl font-bold text-gray-700 mb-8">
                مع مشروك كل مشروعك مبروك
              </p>
              <div className="flex justify-center space-x-4 mb-8">
                <button className="bg-green-500 py-2 px-4 rounded text-white hover:bg-green-700">
                  أضف عقارك
                </button>
                <button className="bg-blue-500 py-2 px-4 rounded text-white hover:bg-blue-700">
                  أضف طلبك
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">آخر الطلبات</h2>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
