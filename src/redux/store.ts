import { configureStore, Dispatch } from '@reduxjs/toolkit';
import thunk, {ThunkMiddleware, ThunkAction} from 'redux-thunk';
// import authReducer from './reducers/authReducer';
import userReducer from "./features/userSlice"
import verifyReducer from "./features/vierfySlice"
import loginReducer from "./features/loginSlice"

import { Action } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    register:userReducer,
    verify:verifyReducer,
    login:loginReducer
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