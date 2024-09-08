import React from "react";
import MapLocation from "@/app/add-your-real-estate/components/MapLocation";
import { Button } from "../shared/button.component";
import { ModalRef } from "../shared/modal.component";

interface AddLocationProps {
  dataSend: {
    lat: number;
    long: number;
    address: string;
  };
  setDataSend: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      long: number;
      address: string;
    }>
  >;
  modalRef: React.RefObject<ModalRef>;
}

const AddLocation: React.FC<AddLocationProps> = ({
  dataSend,
  setDataSend,
  modalRef,
}) => {
  return (
    <div className="items-start flex justify-center flex-col p-4">
      <MapLocation
        lat={dataSend?.lat}
        long={dataSend?.long}
        onChange={({
          lat,
          long,
          address,
        }: {
          lat: number;
          long: number;
          address: string;
        }) =>
          setDataSend({
            ...dataSend,
            lat: lat,
            long: long,
            address: address,
          })
        }
      />

      <div className="flex flex-row items-center justify-center gap-3 w-full">
        <Button
          text="الغاء"
          onClick={() => modalRef.current?.close()}
          className="!bg-[#E5E7EB] !text-[#1F2A37]"
        />
        <Button text="حفظ" onClick={() => modalRef.current?.close()} />
      </div>
    </div>
  );
};

export default AddLocation;
