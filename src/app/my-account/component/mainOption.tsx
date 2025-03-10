import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image"
const MainOtion = ({ title, subTitle, dataUser, Icon, onClick }: { title: string, subTitle?: string, dataUser: any, Icon?: any, onClick: () => void }) => {
    return (
        <div className="flex items-center flex-row gap-x-2 border-b-2 border-gray-200 p-3 justify-between w-full cursor-pointer" onClick={onClick}>
            <div className="flex items-center flex-row gap-x-2">
                {subTitle ? <div className="relative inline-flex items-center justify-center flex-row-reverse w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300 p-3">{
                        dataUser?.image ? <Image src={dataUser?.image} width={40} height={40} alt="user" /> :
                            dataUser?.username ? dataUser?.username[0].toUpperCase() : ""}</span>

                </div> : Icon ? <Icon /> : <></>}

                <div className="flex flex-col">
                    <h3>{title}</h3>
                    <p className="text-sm text-gray-400">{subTitle}</p>
                </div>

            </div>
            <IoIosArrowBack />
        </div>
    )
}
export default MainOtion