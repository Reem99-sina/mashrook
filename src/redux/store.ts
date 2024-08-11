import { configureStore, Dispatch } from '@reduxjs/toolkit';
import thunk, {ThunkMiddleware, ThunkAction} from 'redux-thunk';
// import authReducer from './reducers/authReducer';
import userReducer from "./features/userSlice"
import verifyReducer from "./features/vierfySlice"
import properityType from "./features/getProperity"
import properityRequest from "./features/postRequest"

import loginReducer from "./features/loginSlice"

import { Action } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    register:userReducer,
    verify:verifyReducer,
    login:loginReducer,
    properityType:properityType,
    properityRequest:properityRequest
  }

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