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
      <div className="p-3">
        <div style={{ direction: "rtl" }}>
          <div className="flex items-center justify-center">
            <div>
              <button onClick={handleBack}>
                <BackButtonOutline />
              </button>
            </div>
            <div className="flex flex-1  items-center justify-center">
              <p className="flex items-center justify-center text-[#36343B] font-bold text-xl">
              سياسة الدفع 
              </p>
            </div>
          </div>
        </div>
        <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700 " />
        <div className="p-2 text-md">
        
        <section className="mb-4">
      <h2 className="text-md font-semibold mb-2">وسائل الدفع</h2>
      <p className="mb-2">يتيح موقع مشروك الدفع عبر عدد من وسائل الدفع كالتالي:</p>
      <ol className="list-decimal list-inside space-y-2">
        <li>التحويل البنكي</li>
        <li>الدفع بالبطاقة (مدى – فيزا – ماستركارد- أبل باي) عبر منصة مشروك</li>
      </ol>

      <p className="mt-2">وذلك على حساب مؤسسة مشروك العقارية:</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>بنك الراجحي</strong></li>
        <li><strong>رقم الحساب:</strong> 355608010349612</li>
        <li><strong>رقم الآيبان:</strong> SA61M80000355608010349612</li>
      </ul>

      <p className="mt-2">ملاحظة: عند التحويل البنكي، يرجى إرسال صورة الإيصال عبر الإيميل: <a href="mailto:info@mashrook.sa" className="text-blue-500 underline">info@mashrook.sa</a></p>
      <p>أما الشيك المصدق يتم تسليمه مناولة لإدارة منصة مشروك.</p>
    </section>
    <section className="mb-4">
      <h2 className="text-md font-semibold mb-2">شروط خاصة</h2>
      <p className="mb-2">إضافة إلى الشروط والأحكام الخاصة بمنصة مشروك:</p>
      <ul className="list-decimal list-inside space-y-2">
        <li>يستطيع العميل طلب الخدمة واختيار وسيلة الدفع التي تناسبه.</li>
        <li>جميع بيانات بطاقات الدفع والتفاصيل الخاصة بالعميل لن يتم تخزينها أو بيعها أو تأجيرها لأي طرف ثالث.</li>
        <li>نستقبل المدفوعات بالريال السعودي عن طريق فيزا وماستركارد ومدى والتحويل البنكي واستلام الشيك المصدق.</li>
        <li>تتم عملية الاسترجاع فقط من خلال نفس نوع عملية الدفع الأساسية.</li>
        <li>يلتزم العميل بالجدية مع الأطراف ذات العلاقة.</li>
        <li>في حالة دفع رسوم الشراكة وفتح المحادثة بعد موافقة جميع الأطراف وانسحاب مقدم العرض (المالك – الوسيط العقاري) يلتزم التطبيق بإرجاع الرسوم خلال مدة عمل 5 أيام أو يعتبر رصيدًا في محفظة طالب الشراكة حسب اختياره.</li>
        <li>في حالة انسحاب طالب الشراكة بعد موافقة جميع الأطراف، فإن مبلغ الرسوم لا يُرجع دون قيد أو شرط.</li>
        <li>لا يُقبل الدفع كاش ولا يُقبل التحويل إلى حسابات أخرى غير الحسابات المذكورة أعلاه.</li>
        <li>في حالة موافقة جميع الأطراف ذات العلاقة بالصفقة العقارية، فإن مدة التنفيذ 5 أيام عمل لإتمام الصفقة إن لم تكن تمويل بنكي، ولا يحق لطالبي الشراكة استرجاع الرسوم قبل ذلك إلا إذا تجاوزت المدة المذكورة.</li>
        <li className="bg-[#ffff00]">في حالة التعاقد بين المطور العقاري والمالك أو مطور آخر فإن عمولة التطبيق غير مستردة.</li>
        <li>يستطيع العميل الاطلاع عبر المنصة على رسوم الخدمة والعمولة والسعي حسب الخدمة المختارة من قبله.</li>
        <li>في أوامر البيع عند انضمام المشتري لطلب الشراكة، فعليه دفع 100 ريال سعودي رسوم شاملة الضريبة.</li>
        <li>في حالة عرض العقار للبيع من قبل الوسيط أو المطور، يستوجب دفع مبلغ 500 ريال سعودي شامل الضريبة رسوم بعد موافقة الشركاء (المشترين) على إتمام الصفقة.</li>
        <li>في حالة التطوير، على مقدم الطلب أن كان وسيطًا دفع 1000 ريال شامل الضريبة كرسوم، أما إذا كان مقدم الطلب مالكًا أو مطورًا أو شركاء فيجب دفع 1% عمولة بدون الضريبة من قيمة التطوير عن كل طرف.</li>
        <li>الإعلان المدفوع ولمدة أسبوع بمبلغ 500 ريال سعودي شامل الضريبة وغير مسترد.</li>
        <li>جميع النزاعات المتعلقة بالخدمات المقدمة تُرجع للنظام المتبع في المملكة العربية السعودية.</li>
      </ul>
    </section>
        </div>
        </div>
    )
}
export default AboutPage