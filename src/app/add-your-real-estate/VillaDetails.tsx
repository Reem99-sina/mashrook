
import React from "react";
import CheckFeature from "./components/CheckFeature";
import NumberRoom from "./components/NumberRoom";
import InputAreaPrice from "./components/InputAreaPrice";
import {
  earthInter
} from "@/redux/features/postRealEstate";
interface VillaDetailsProps {
  villa: earthInter[];
  index: number;
  villaOne:earthInter[];
  setvilla: React.Dispatch<React.SetStateAction<earthInter[]>>;
  errors: any;
}

const VillaDetails: React.FC<VillaDetailsProps> = ({
  villa,
  index,
  villaOne,
  setvilla,
  errors,
}) => {
  return (
    <>
      <InputAreaPrice
        title="المساحة"
        onChange={(e) =>
          setvilla((prev) =>
            prev.map((ele, i) =>
              i === index ? { ...ele, area: Number(e.target.value) } : ele
            )
          )
        }
        value={villa[index]?.area>0?villa[index]?.area:""}
        errors={errors && errors[`details[${index-index}].area`]}
        measurement="متر"
      />
      <InputAreaPrice
        title="السعر"
        onChange={(e) =>
          setvilla((prev) =>
            prev.map((ele, i) =>
              i === index ? { ...ele, price: Number(e.target.value) } : ele
            )
          )
        }
        value={villa[index]?.price>0?villa[index]?.price:""}
        errors={errors && errors[`details[${index-index}].price`]}
        measurement="ريال"
        desc="(بدون ضريبة التصرفات العقارية والسعي)"
      />
      <NumberRoom
        errors={errors && errors[`details[${index-index}].rooms_number`]}
        value={villa[index]?.rooms_number}
        onChange={(e) =>
          setvilla((prev) =>
            prev.map((ele, i) =>
              i === index
                ? { ...ele, rooms_number: Number(e.target.value) }
                : ele
            )
          )
        }
        name="rooms_number"
        title="عدد الغرف"
        firstNumber="غرفة"
        secondNumber="+10 غرف"
        max={10}
      />
      <NumberRoom
        errors={errors && errors[`details[${index-index}].halls_number`]}
        value={villa[index]?.halls_number}
        onChange={(e) =>
          setvilla((prev) =>
            prev.map((ele, i) =>
              i === index
                ? { ...ele, halls_number: Number(e.target.value) }
                : ele
            )
          )
        }
        name="halls_number"
        title="عدد الصالات"
        firstNumber="صالة"
        secondNumber="3+ صالات"
        max={3}
      />
      <NumberRoom
        errors={errors && errors[`details[${index-index}].bathrooms_number`]}
        value={villa[index]?.bathrooms_number}
        onChange={(e) =>
          setvilla((prev) =>
            prev.map((ele, i) =>
              i === index
                ? { ...ele, bathrooms_number: Number(e.target.value) }
                : ele
            )
          )
        }
        name="bathrooms_number"
        title="عدد دورات المياه"
        firstNumber="دورة مياه"
        secondNumber="3+ دورة مياه"
        max={3}
      />
      <NumberRoom
        errors={errors && errors[`details[${index-index}].kitchens_number`]}
        value={villa[index]?.kitchens_number}
        onChange={(e) =>
          setvilla((prev) =>
            prev.map((ele, i) =>
              i === index
                ? { ...ele, kitchens_number: Number(e.target.value) }
                : ele
            )
          )
        }
        name="kitchens_number"
        title="عدد المطابخ"
        firstNumber="مطبخ"
        secondNumber="3+ مطابخ"
        max={3}
      />
      <div className="mt-2">
        <div
          className="flex justify-between text-sm mt-2"
          style={{ direction: "rtl" }}
        >
          <p className="font-medium text-base text-[#4B5563]">مزايا إضافية:</p>
        </div>
        <div
          className="flex flex-row flex-wrap gap-8"
          style={{ direction: "rtl" }}
        >
          <CheckFeature
            title="مكيفة"
            onChange={(event) =>
              setvilla((prev) =>
                prev.map((ele, i) =>
                  i === index ? { ...ele, ac: event.target.checked } : ele
                )
              )
            }
          />
          <CheckFeature
            title="مدخل سيارة"
            onChange={(event) =>
              setvilla((prev) =>
                prev.map((ele, i) =>
                  i === index
                    ? { ...ele, car_entrance: event.target.checked }
                    : ele
                )
              )
            }
          />
          <CheckFeature
            title="مطبخ راكب"
            onChange={(event) =>
              setvilla((prev) =>
                prev.map((ele, i) =>
                  i === index ? { ...ele, kitchen: event.target.checked } : ele
                )
              )
            }
          />
          <CheckFeature
            title="مؤثثة"
            onChange={(event) =>
              setvilla((prev) =>
                prev.map((ele, i) =>
                  i === index
                    ? { ...ele, furnished: event.target.checked }
                    : ele
                )
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default VillaDetails;
