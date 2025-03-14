"use client";
import MainHeader from "./components/header/MainHeader";
import { Addbutton, Addrequest, CTA } from "@/app/assets/svg";
import CarouselTransition from "../app/components/landingPage/Carousel2";
import FAQCollapse from "../app/components/landingPage/FAQCollapse";
import Footer from "./components/header/Footer2";
import HowItWorks2 from "../app/components/landingPage/HowItWorks2";
import ClientJourney2 from "../app/components/landingPage/ClientJourney2";
import { sampleData5 } from "../app/assets/data/data";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "@/redux/features/loginSlice";
import {
  fetchToken,
  removeTokenUser,
  fetchAuthId,
} from "@/redux/features/userSlice";
import PropertyCard from "./components/propertyCard/PropertyCard";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { getRequest, dataReturn } from "@/redux/features/getRequest";
import useFcmToken from "@/utils/hooks/useFcmToken";
import FcmTokenComp from "@/utils/firebase/firebaseForeground";
import ModelForm from "@/app/components/check-id-number/ModelForm";
import { ModalRef } from "@/app/components/shared/modal.component";
import { eventAnalistic } from "@/utils/event-analistic";
// import { FcmTokenComp, onMessage } from "firebase/messaging";
const limit = 5;

export default function Home() {
  const router = useRouter();
  const modalRef = useRef<ModalRef>(null);
  const [path, setPath] = useState("");
  const { loading, message, data } = useSelector<RootState>(
    (state) => state.getRequest
  ) as { loading: boolean; message: string; data: dataReturn[] };
  const timesForWeek = Cookie.get("tokenTime");
  const { token, auth } = useSelector<RootState>((state) => state.register) as {
    token: string;
    auth: boolean;
  };
  // register
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchToken());
    dispatch(fetchAuthId());
  }, [dispatch]);

  useEffect(() => {
    const checkAndRemoveCookie = () => {
      const now = new Date();
      const currentTime = new Date().getTime();
      const hours = now.getHours();
      // Check if it's 12 AM
      if (hours === 0 && !timesForWeek) {
        // Remove the token from cookies
        dispatch(removeToken());
        Cookie.remove("user");
        Cookie.remove("token");
        dispatch(removeTokenUser());
      } else if (currentTime > Number(timesForWeek)) {
        dispatch(removeToken());
        Cookie.remove("user");
        Cookie.remove("token");
        Cookie.remove("tokenTime");
        dispatch(removeTokenUser());
      }
    };
    // Run every minute to check if it's 12 AM
    const interval = setInterval(checkAndRemoveCookie, 60 * 1000);
    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [dispatch, timesForWeek]);
  useEffect(() => {
    eventAnalistic({
      action: "Visite_website",
      category: "website",
      label: "visit main page",
      value: "visit_main_page",
    });
    dispatch(getRequest({}));
  }, [dispatch]);

  return (
    <div className="flex justify-center w-dvh h-max ">
      <FcmTokenComp />
      <div className="w-full bg-white rounded text-black shadow ">
        <div className="w-full z-50">
          <MainHeader />
        </div>
        <div className="flex">
          <main className="container mx-auto ">
            <ModelForm modalRef={modalRef} path={path} />
            <section className="bg-[url('/background-cover.png')] rounded shadow-md text-center">
              <div className="pt-4">
                <div className="flex justify-center">
                  <div className=" w-96 h-44 ">
                    <CarouselTransition />
                  </div>
                </div>

                <div className="flex justify-center space-x-2 space-y-2 items-end">
                  <button
                    // href={"add-your-real-estate"}
                    className="flex hover:shadow-lg"
                    onClick={() => {
                      setPath("/add-your-real-estate");
                      if (!token) {
                        toast.error("انت تحتاج الي تسجيل دخول");
                        router.push("/login-otp");
                      } else {
                        if (!auth) {
                          modalRef?.current?.open();
                        } else {
                          router.push("/add-your-real-estate");
                        }
                      }
                    }}
                  >
                    <Addrequest />
                  </button>
                  <button
                    className="flex hover:shadow-lg"
                    onClick={() => {
                      setPath("/add-your-request");
                      if (!token) {
                        toast.error("انت تحتاج الي تسجيل دخول");
                        router.push("/login-otp");
                      } else {
                        router.replace("/add-your-request");
                      }
                    }}
                  >
                    <Addbutton />
                  </button>
                </div>
              </div>
              <div className=" p-4 rounded shadow-md w-full">
                <div dir="rtl">
                  <div className="flex justify-between mx-6">
                    <h2 className=" font-bold mb-4 text-2xl">آخر العروض</h2>

                    <Link href="/market">
                      <h2 className="flex items-center text-2xl font-bold mb-4 text-blue-450">
                        السوق
                        <MdKeyboardArrowLeft />
                      </h2>
                    </Link>
                  </div>

                  <PropertyCard />
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
