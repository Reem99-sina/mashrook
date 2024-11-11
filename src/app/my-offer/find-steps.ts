import { RealEstateTypeInter } from "@/redux/features/postRealEstate";
import {
  PartnerDeveloperNoSellStage,
  PartnerDeveloperStage,
  PartnerOwnStage,
} from "@/type/addrealestate";

export const findStep = (offer: RealEstateTypeInter) => {
  return offer?.propertyPurpose?.title == "بيع"
    ? offer?.propertyOwnerType?.title == "مالك"
      ? PartnerOwnStage
      : PartnerDeveloperStage
    : PartnerDeveloperNoSellStage;
};
