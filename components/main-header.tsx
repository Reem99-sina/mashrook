import { useState } from "react";
import SideBar from "./sidebar";
import {
  Mainnavigationmenu,
  Mashrooklogotextlarge,
  Menu,
} from "@/app/assets/svg";
import Image from "next/image";

export default function MainHeader() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header>
      <div className="flex items-center justify-between">
        <div className="w-full self-center p-4">
          <button onClick={toggleSidebar}>
            <Mainnavigationmenu />
          </button>
        </div>

        <div className="self-center me-3 p-4">
          <Image
            src={Mashrooklogotextlarge}
            alt={"logo"}
            layout="fit"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>
      <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}
