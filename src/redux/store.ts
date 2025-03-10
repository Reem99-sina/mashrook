import { configureStore, Dispatch } from "@reduxjs/toolkit";
import thunk, { ThunkMiddleware, ThunkAction } from "redux-thunk";
// import authReducer from './reducers/authReducer';
import userReducer from "./features/userSlice";
import verifyReducer from "./features/vierfySlice";
import properityType from "./features/getProperity";
import properityRequest from "./features/postRequest";
import properityPurpose from "./features/getproperityPurpose";
import properityOwnerType from "./features/getProperityOwnerType";
import getDetailTypesSlice from "./features/getDetailsType";
import getBannerSlice from "./features/getbanner"
import postrealEstateType from "./features/postRealEstate";
import loginReducer from "./features/loginSlice";
import getCitySlice from "./features/getCity";
import { Action } from "@reduxjs/toolkit";
import getNotification from "./features/getMyNotification"
import getRequest from "./features/getRequest";
import getRequestSlice from "./features/getOrders";
import getPartnerSlice from "./features/getPartners";
import getOfferSlice from "./features/getOffers";
import saveSlice from "./features/mySave";
import getMessageSlice from "./features/getMessages";
import getPartnerMessageSlice from "./features/getMessagePartner";
import getMessageByid from "./features/getMessage";
import getMessageByDetailById from "./features/getMessageBydetailsId";
import uploadReciptSlice from "./features/uploadRecipt";
import getMessageByLandId from "./features/getMessageBylandId";
import getAdvertiseSlice from "./features/getMyAdvertise";
import ComplaintSlice from "./features/complaintsSuggestions"
const store = configureStore({
  reducer: {
    register: userReducer,
    verify: verifyReducer,
    login: loginReducer,
    properityType: properityType,
    properityRequest: properityRequest,
    getRequest: getRequest,
    offers: getOfferSlice,
    properityPurpose: properityPurpose,
    properityOwnerType: properityOwnerType,
    realEstateRequest: postrealEstateType,
    requests: getRequestSlice,
    partners: getPartnerSlice,
    detailsType: getDetailTypesSlice,
    city: getCitySlice,
    messageOrders: getMessageSlice,
    messagePartners: getPartnerMessageSlice,
    uploadRecipt: uploadReciptSlice,
    save: saveSlice,
    messageByID: getMessageByid,
    messageByDetailsId: getMessageByDetailById,
    messageByLandId: getMessageByLandId,
    myAdvertise: getAdvertiseSlice,
    complaints:ComplaintSlice,
    notifications:getNotification,
    banners:getBannerSlice
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
