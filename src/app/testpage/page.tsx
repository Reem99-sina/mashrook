import { MashrookLogo, Menu } from "../assets/svg";

export default function Test() {
  return (
    <div>
      <div className="flex justify-center items-top w-dvh h-dvh  bg-[#DCE9E5]">
        <div className="w-full md:w-1/2  lg:w-1/2 bg-white rounded shadow">
          <div className="flex  justify-between bg-blue-500">
            <div className="self-center ms-3 p-4">
              <Menu />
            </div>
            <div className="self-center me-3 p-4">
              <MashrookLogo />
            </div>
          </div>
          <p>Hello World</p>
        </div>
      </div>
    </div>
  );
}
