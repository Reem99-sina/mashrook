import { Spinner } from "@material-tailwind/react";
import { ChangeEvent, useState } from "react";

const CheckAdvertisementNumber = ({
  onChange,
  value,
  setCheck,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  setCheck: (check: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center gap-5">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg"
        placeholder="-- الرجاء الادخال --"
        onChange={onChange}
      />
      <p
        className="underline text-blue-600 text-xs"
        onClick={() => setLoading(true)}
      >
        {loading ? (
          <Spinner
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className=""
          />
        ) : (
          "تأكيد"
        )}
      </p>
    </div>
  );
};

export default CheckAdvertisementNumber;
