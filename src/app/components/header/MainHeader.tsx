import { useState } from "react";
import SideBar from "./SideBar2";
import { Mainnavigationmenu, Mashrooklogotextlarge } from "@/app/assets/svg";
import Image from "next/image";
import Link from "next/link";

export default function MainHeader() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="border-b-2 mb-4">
      <div className="flex items-center justify-between">
        <div className="w-full self-center p-4">
          <button onClick={toggleSidebar}>
            <Mainnavigationmenu />
          </button>
        </div>

        <div className="self-center me-3 p-4">
        <Link href="/">
          <Image
            src={Mashrooklogotextlarge}
            alt={"logo"}
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          /></Link>
        </div>
      </div>
      <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}

//last modified by Omar Marei 21/7
//last modified by Omar Marei 31/7
