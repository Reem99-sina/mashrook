import { useState } from "react";
import SideBar from "./sidebar";
import { Mainnavigationmenu, MashrookLogo, Menu } from "@/app/assets/svg";

export default function MainHeader() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header>
      <div className="flex justify-between">
        <div className="w-full self-center ms-3 p-4">
          <button onClick={toggleSidebar}>
            <Mainnavigationmenu />
          </button>
        </div>

        <div className="self-center me-3 p-4">
          <MashrookLogo />
        </div>
      </div>
      <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}
