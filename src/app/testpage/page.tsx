"use client";


import ClientJourney2 from "../../../components/ClientJourney2";
import HowItWorks from "../../../components/how-it-works";
import HowItWorks2 from "../../../components/HowItWorks2";
import PropertyCardUnified from "../../../components/PropertyCardUnified";

const sampleData = {
  dates: ["2024-4-23", "2024-5-12", "2024-6-15", "2024-7-01"],
  categories: ["فيلا", "شقة", "منزل", "بيت"],
  seller: ["المملكة للعقارات"],
  statuses: ["للإستثمار", "للبيع", "للبيع", "للبيع"],
  requestIds: ["2022", "2023", "2024", "2025"],
  licenseNumbers: ["1234422", "1234423", "1234424", "1234425"],
  cities: ["الرياض", "جدة", "الدمام", "مكة"],
  districts: ["حي النرجس", "حي الشاطئ", "حي الفيصلية", "حي النسيم"],
  sharePercentages: [40, 50, 60, 70],
  areas: [300, 350, 400, 450],
  prices: [2000000, 2500000, 3000000, 3500000],
  currencies: ["ريال", "ريال", "ريال", "ريال"],
};

const sampleData3 = {
  sharePercentages: [40, 50, 60, 70],
  areas: [300, 350, 400, 450],
  prices: [2000000, 2500000, 3000000, 3500000],
  currencies: ["ريال", "ريال", "ريال", "ريال"],
  units: ["قطعة 1", "قطعة 2", "قطعة 3", "قطعة 4"],
  dealStatuses: ["متاح", "تمت الشراكة", "تم الاشتراك", "متاح"],
};
export default function Test() {
  return (
    <div dir="rtl">


// Call 1: Based on the first function
<PropertyCardUnified
  unitCount={1}
  dates={[sampleData.dates[0]]}
  sellers={sampleData.seller}
  statuses={[sampleData.statuses[1]]}
  requestIds={[sampleData.requestIds[0]]}
  licenseNumbers={[sampleData.licenseNumbers[0]]}
  cities={[sampleData.cities[0]]}
  districts={[sampleData.districts[0]]}
  sharePercentages={[sampleData.sharePercentages[1]]}
  areas={[sampleData.areas[0]]}
  prices={[sampleData.prices[2]]}
  currencies={[sampleData.currencies[0]]}
  categories={[sampleData.categories[1]]}
  dealStatuses={sampleData3.dealStatuses}
/>

// Call 2: Based on the second function
<PropertyCardUnified
  unitCount={3}
  dates={["2024-7-19", "2024-7-19", "2024-7-19"]}
  sellers={["الرياض للعقارات"]}
  statuses={["للبيع", "للبيع", "للبيع"]}
  requestIds={["2024", "2024", "2024"]}
  licenseNumbers={["1234424", "1234424", "1234424"]}
  cities={["الرياض", "الرياض", "الرياض"]}
  districts={["حي النرجس", "حي النرجس", "حي النرجس"]}
  sharePercentages={sampleData3.sharePercentages}
  areas={sampleData3.areas}
  prices={sampleData3.prices}
  currencies={sampleData3.currencies}
  categories={["ارض سكنية", "ارض سكنية", "ارض سكنية"]}
  units={sampleData3.units}
  dealStatuses={sampleData3.dealStatuses}
/>

// Call 3: Based on the third function
<PropertyCardUnified
  unitCount={3}
  dates={sampleData.dates.slice(1, 4)}
  sellers={sampleData.seller}
  statuses={sampleData.statuses.slice(1, 4)}
  requestIds={sampleData.requestIds.slice(1, 4)}
  licenseNumbers={sampleData.licenseNumbers.slice(1, 4)}
  cities={sampleData.cities.slice(1, 4)}
  districts={sampleData.districts.slice(1, 4)}
  sharePercentages={sampleData.sharePercentages.slice(1, 4)}
  areas={sampleData.areas.slice(1, 4)}
  prices={sampleData.prices.slice(1, 4)}
  currencies={sampleData.currencies.slice(1, 4)}
  categories={sampleData.categories.slice(1, 4)}
  dealStatuses={sampleData3.dealStatuses}
/>

    </div>
  );
}
