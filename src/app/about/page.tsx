"use client"
import { BackButtonOutline } from "@/app/assets/svg";
import { useRouter } from "next/navigation";
const AboutPage=()=>{
    let router = useRouter();
    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(`/`);
      };
    return (
        <>
        <div style={{ direction: "rtl" }}>
        <div className="flex items-center justify-center">
          <div>
            <button onClick={handleBack}>
              <BackButtonOutline />
            </button>
          </div>
          <div className="flex flex-1  items-center justify-center">
            <p className="flex items-center justify-center text-[#36343B] font-bold text-xl">
              عن مشروك
            </p>
          </div>
        </div>
      </div>
      <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700 " />
      <div className="p-2 text-md">
        <p >
        منصة عقارية مرخصة تتيح عرض المنتجات العقارية القابلة للشراكة بنظام التملك الحر أو المشاع. كما تمكن المطورين العقاريين المعتمدين أو المالكين من المشاركة في تطوير المنتجات العقارية بآليات احترافية ومنظومة موثوقة. بالإضافة إلى ذلك، توفر المنصة سوقاً عقارياً لعرض المنتجات بطريقة سهلة ومرنة
        </p>
        <h3 className="font-bold text-md my-3">
            مزايا المشروك:
        </h3>
        <ol className="list-decimal ms-5">
            
  <li>توفير فرص عقارية جديدة وبسعر مناسب للجميع</li>
  <li>خلق فرص بيعية جديدة وتطوير للمنتجات العقارية</li>
  <li>مناسبة لجميع الفئات لتيسير العملية البيعية</li>
  <li>وسيلة لتملك العقار بكل يسر وسهولة</li>
<li>تشجيع الملاك والوسطاء والمطورين لتوفير منتجات مناسب</li>
</ol>
      </div>
        </>
    )
}
export default AboutPage