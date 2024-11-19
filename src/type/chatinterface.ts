import {
  detailsMoreType,
  detailsType,
  landInfo,
  detailOneInfo,
} from "./addrealestate";
export interface chatdetailinfo {
  id?: number;
  message: string;
  type: string;
  createdAt: string;
  updatedAt?: string;
  room_id: number;
  user_id: number;
  alert_link: null | string;
  alert_link_text: null | string;
  alert_link_type: null | string;
  alert_message: string | null;
  alert_message_text: string | null;
}
export interface chatInfo {
  blocker_id: null | number;
  createdAt: string;
  details: detailOneInfo | null;
  details_id: null | number;
  id: number;
  landDetails: landInfo | null;
  land_details_id: number;
  lastMessage: chatdetailinfo;
  last_message_id: number;
  property: {
    type: string;
    is_divisible: boolean;
    license_number: string;
    advertisement_number: string;
    age: null | number;
    area: number;
    createdAt: string;
    expire_date: string;
    finance: boolean;
    id: number;

    partner_type_id: null | number;
    partnership_amount: number | null;
    propertyType: detailsType;
    propertyTypeDetails: detailsMoreType;
    property_owner_type_id: number;
    property_purpose_id: number;
    property_type_details_id: number;
    property_type_id: number;
    status: string;

    updatedAt: string;
    user_id: number;
  };
  property_id: number;
  receiver_id: number;
  sender_id: number;
  status: string;
  updatedAt: string;
}
export interface messagePusher {
  authorId: number;
  message: string;
  type: string;
}
export const faqs = [
  {
    question: "ماهي منصة مشروك ؟",
    answer:
      "منصة عقارية مرخصة تتيح عرض المنتجات العقارية القابلة لشراكة بنظام التملك الحر أو المشاع ، كما تمكن المطورين العقاريين المعتمدين أو المالكين من المشاركة في تطوير المنتجات العقارية بآليات احترافية ومنظومة موثوقة. منصة مشروك توفر سوقا عقاريا من خلاله يستطيع العميل البحث عما يناسبه بطريقة سهلة ومرنة كما تقدم له خيار تقديم طلب شراء حسب قدرته الشرائية. مزايا مشروك: توفير فرص عقارية جديدة وبسعر مناسب للجميع خلق فرص بيعية جديدة وتطوير للمنتجات العقارية مناسبة لجميع الفئات لتيسير العملية البيعية وسيلة لتملك العقار بكل يسر وسهولة تشجيع الملاك والوسطاء والمطورين لتوفير منتجات مناسب فكرة مميزة وأصبحت واقع",
  },
  {
    question: "ماهي القيمة السوقية اللي يضيفها مشروك للعميل؟",
    answer:
      "توفير حل للعميل في تملك العقار بطريقة التشارك وبقيمة تنافسية وخلق فرص تجارية للملاك والمطورين",
  },
  {
    question: "كيف أعرف بأن العقار المعروض في مشروك موثوق أو لا؟",
    answer:
      "لا يعرض المنتج العقاري بالسوق بالمنصة حتى يطابق معلوماته بالخرائط المكانية من ناحية المساحة والواجهات ومرتبط بأيقونة الهيئة العامة للعقار",
  },
  {
    question: "ما هي وسائل الدفع المتاحة؟",
    answer: "التحويل البنكي أو الدفع بالموقع أو الشيك المصدق فقط.",
  },
  {
    question:
      "هل بإمكاني استرداد الرسوم إذا بيع العقار أو تغيرت رغبتي أو اهتمامي بعد انضمامي كشريك أو تأخر الشريك الأخر أو لم تكتمل نسبة الشراكة؟",
    answer:
      "تسترد الرسوم في ثلاث حالات كالتالي: إذا تراجع البائع أو تعذر وجود شريك آخر أو أنسحب الشريك الآخر ",
  },
  {
    question: "	تمت الموافقة من الشركاء على شراء العقار ما هو الإجراء؟",
    answer:
      "التواصل مع الأطراف لتنسيق ومن ثم طلب تسليم السعي ومن ثم التنسيق مع الموثق لعملية الإفراغ ",
  },
  {
    question:
      "هل بالإمكان الدفع نقدًا سواء رسوم أو سعي عند الرغبة بالانضمام كشريك؟",
    answer: "لا يقبل الدفع نقدا والمنصة ومنسوبيها غير مسؤولين عن ذلك ",
  },
  {
    question: "كم تستغرق عملية الإفراغ؟",
    answer:
      "عند تواجد أطراف الصفقة (البائع والمشتري أو من ينوب عنهما بالوكالة) يتم الإفراغ الفوري",
  },
  {
    question: "هل المنصة تقدم خدمات أخرى ما بعد البيع؟",
    answer:
      "خدمات تجهيز محاضر الدمج والتجزئة والتصاميم الهندسية والإشراف والمقاول وخدمات أخرى باختيار العميل للجهات المتوفرة بالمنصة للقيام بالمهمة ويكون التعاقد معهم مباشرة ",
  },
  {
    question: "في حالة التطوير من هو الطرف الثالث لعملية ضبط التعاقد؟",
    answer:
      "محامي معتمد أو إذا كانت هناك منصات حكومية متوفرة لعمل ذلك برغبة الأطراف",
  },
  {
    question: "ما المستندات المطلوبة لشراء أو تطوير عقار؟",
    answer: "صك الملكية – رخصة البناء- شهادة الاشغال",
  },
  {
    question: "من المسؤول عن توافر المخططات والضمانات وسلامة العقار المبني؟",
    answer: "مالك العقار سواء كان فردا أو مطور عقاري",
  },
  {
    question:
      "كمطور عقاري أو مالك هل يحق لي اختيار محامي من طرفي أم المنصة هي من تختار؟",
    answer: "نعم وبشرط موافقة الطرف الشريك",
  },
  {
    question: "هل هناك اتفاقيات خارج المنصة بين الأطراف؟",
    answer: "لا يلزم المنصة أي اتفاقيات خارج مهامها وتكون مسوليه أطراف الصفقة ",
  },
  {
    question: "هل قيمة العروض شاملة السعي وضريبة التصرفات العقارية؟",
    answer: `السعي غير شامل القيمة المعروضة بالسوق 
نحتاج نحدد ضريبة التصرفات العقارية أثناء تسجيل العرض يا أبو عبد الرحمن
`,
  },
  {
    question: "من يدفع ضريبة التصرفات العقارية؟",
    answer: `المشتري (تحتاج تحديد مهم)`,
  },
  {
    question: "كيف يمكنني التواصل مع فريق الدعم؟",
    answer: `عبر قنوات التواصل المذكورة في القائمة (واجهة المنصة)`,
  },
  {
    question:
      "لو رغبت بمعلومات أكثر عن عقار وقبل الانضمام كشريك كيف التواصل مع المنصة؟",
    answer: `عبر قنوات التواصل أو زيارة مقر الشركة فريق التسويق `,
  },
  {
    question:
      "كوسيط عقاري أو مالك أو مطور عقاري في حالة الرغبة في حذف العرض أو الحساب هل ذلك متاح؟",
    answer: `متاح وبكل يسر وسهولة `,
  },
];
export interface messageInfo {
  body: string;
  createdAt: string;
  id: number;
  is_read: boolean;
  link: string;
  title: string;
  type: string;
  type_id: number;
  updatedAt: string;
  user_id: number;
}
