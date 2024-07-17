"use client";

import {
  Approve123,
  Deal,
  DocDeal,
  Onlinepayment117946931,
  Realestatagent,
} from "../src/app/assets/svg";

export default function ClientJourney() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full  border-2 rounded-2xl bg-white">
      <div className="w-full h-full  border-2 rounded-2xl bg-white">
        <div dir="rtl">
          <div className="w-full">
            <div className="inline-block align-middle p-4 text-center flex-autotext-lg font-bold m-4 w-full">
              رحلة العميل
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
                  <p className="text-lg font-bold m-4">انضم كشريك</p>
                </div>
                <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
                  <Realestatagent />
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
                  <p className="text-lg font-bold text-center m-4 mt-8">
                    الاتفاق
                  </p>
                </div>
                <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
                  <Deal />{" "}
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
                  <p className="text-lg font-bold m-4">دفع رسوم المنصة</p>
                </div>
                <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
                  <Onlinepayment117946931 />{" "}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4 justify-evenly">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border mt-12 rounded-full bg-green-500 text-white">
                    4
                  </div>
                </div>

                <div className="w-px h-full border border-dashed border-gray-300 -mb-14"></div>
              </div>
              <div className="flex w-full m-4 border-2 rounded-lg drop-shadow-md justify-between">
                <div className="inline-block align-middle p-2 text-center flex-auto">
                  <p className="text-lg font-bold m-4">المبايعة والافراغ</p>
                </div>
                <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
                  <DocDeal />{" "}
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-col items-center mr-4 justify-evenly">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-green-500 text-white">
                    5
                  </div>
                </div>
              </div>
              <div className="flex w-full m-4 border-2 rounded-lg drop-shadow-md justify-between ">
                <div className="inline-block align-middle p-4 text-center flex-auto">
                  <p className="text-lg font-bold m-4 mt-7">الانتهاء</p>
                </div>
                <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
                  <Approve123 />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
