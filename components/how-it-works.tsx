"use client";

import {
  ArrowLeft,
  Mobileapp,
  Onlinebooking9471687,
  Realestatagent,
  Truckicon,
} from "../src/app/assets/svg";

export default function HowItWorks() {
  return (
    <div className="px-4 py-16 w-3/4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="w-fit h-fit border-2 rounded-2xl bg-white">
        <div dir="rtl">
          <div className="w-fit">
            <div className="inline-block align-middle p-4 text-center flex-autotext-lg font-bold m-4 w-full">
              كيف تشتري عقارك مع مشروك
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4 justify-evenly">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border mt-12 rounded-full bg-green-500 text-white">
                    1
                  </div>
                </div>
                <div className="w-px h-full border border-dashed border-gray-300 -mb-14"></div>
              </div>
              <div className="flex w-full m-4 border-2 rounded-lg drop-shadow-md justify-between">
                <div className="inline-block align-middle p-4 text-center flex-auto">
                  <p className="text-lg font-bold m-4">سجل طلبك</p>
                </div>
                <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
                  <Onlinebooking9471687 />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4 justify-evenly">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border mt-12 rounded-full bg-green-500 text-white">
                    2
                  </div>
                </div>
                <div className="w-px h-full border border-dashed border-gray-300 -mb-14"></div>
              </div>
              <div className="flex w-full m-4 border-2 rounded-lg drop-shadow-md justify-between">
                <div className="inline-block align-middle p-2 text-center flex-auto">
                  <p className="text-lg font-bold m-4">اطلع على اخر العروض</p>
                </div>
                <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
                  <Mobileapp />{" "}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4 justify-evenly">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border mt-12 rounded-full bg-green-500 text-white">
                    3
                  </div>
                </div>
                <div className="w-px h-full border border-dashed border-gray-300 -mb-14"></div>
              </div>
              <div className="flex w-full m-4 border-2 rounded-lg drop-shadow-md justify-between">
                <div className="inline-block align-middle p-2 text-center flex-auto">
                  <p className="text-lg font-bold m-4">إنضم كشريك إذا ناسبك</p>
                </div>
                <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
                  <Realestatagent />{" "}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4 justify-evenly">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-green-500 text-white">
                    4
                  </div>
                </div>
              </div>
              <div className="flex w-full m-4 border-2 rounded-lg drop-shadow-md justify-between">
                <div className="inline-block align-middle p-4 text-center flex-auto">
                  <p className="text-lg font-bold m-4">خلي الباقي علينا</p>
                </div>
                <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
                  <Truckicon />{" "}
                </div>
              </div>
            </div>
            <div className="flex justify-center p-3 ">
              <button
                type="button"
                className="text-blue-700 hover:bg-blue-800 border-2 border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <ArrowLeft />
                سجل مجانا
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
