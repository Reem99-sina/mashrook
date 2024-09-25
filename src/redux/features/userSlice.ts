import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";
export interface userRegister {
  username: string;
  email: string;
  password: string;
  repeate_password: string;
}
interface userImage {
  image: File;
}
interface userUpdata {
  username?: string;
  email?: string;
  phone?: string;
  val_license?: string;
}
export const register = createAsyncThunk(
  "register",
  async (data: userRegister, { rejectWithValue }) => {
    const response = await axios
      .post("https://server.mashrook.sa/auth", data)
      .then((response) => response.data)
      .catch((error) => error?.response?.data); // Adjust your endpoint as necessary
    return response; // Return the user data from API response
  }
);
export const fetchToken = createAsyncThunk("auth/fetchToken", async () => {
  return Cookie.get("token");
});
export const fetchuser = createAsyncThunk("auth/featchuser", async () => {
  const userData = Cookie.get("user");
  if (userData != "undefined" && userData) {
    return JSON.parse(userData);
  }
});
export const updateUserImage = createAsyncThunk(
  "auth/updateUserImage",
  async (data: userImage) => {
    const formData = new FormData();
    formData.append("image", data?.image);
    const response = await axios
      .put("https://server.mashrook.sa/user/upload-image", formData, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data); // Adjust your endpoint as necessary
    return response; // Return the user data from API response
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data: userUpdata) => {
    const response = await axios
      .put("https://server.mashrook.sa/user", data, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data); // Adjust your endpoint as necessary
    return response; // Return the user data from API response
  }
);
export const deleteUser = createAsyncThunk("auth/deleteuser", async () => {
  const response = await axios
    .delete("https://server.mashrook.sa/user", {
      headers: {
        Authorization: Cookie.get("token"),
      },
    })
    .then((response) => response.data)
    .catch((error) => error?.response?.data); // Adjust your endpoint as necessary
  return response; // Return the user data from API response
});
const initialstate = {
  loading: false,
  message: "",
  data: null,
  token: "",
  user: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialstate,
  reducers: {
    removeUser: (state) => {
      state.loading = false;
      state.message = "";
      state.data = null;
    },
    removeTokenUser: (state) => {
      state.token = "";
      state.user = "";
    },
    removeMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action.payload.data;
    }),
      builder.addCase(register.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(fetchToken.fulfilled, (state, action) => {
        state.token = action.payload ? action.payload : "";
      }),
      builder.addCase(fetchToken.pending, (state, action) => {
        state.token = "";
      }),
      builder.addCase(fetchToken.rejected, (state, action) => {
        state.token = "";
      }),
      builder.addCase(fetchuser.fulfilled, (state, action) => {
        state.user = action.payload ? action.payload : "";
      }),
      builder.addCase(fetchuser.pending, (state, action) => {
        state.user = "";
      }),
      builder.addCase(fetchuser.rejected, (state, action) => {
        state.user = "";
      }),
      builder.addCase(updateUserImage.fulfilled, (state, action) => {
        // state.user=action.payload?action.payload:""
        Cookie.set("user", JSON.stringify(action?.payload?.data));
        state.message = action?.payload?.message;
        state.user = action.payload.data ? action.payload.data : "";
      }),
      builder.addCase(updateUserImage.pending, (state, action) => {
        state.message = "";
      }),
      builder.addCase(updateUserImage.rejected, (state, action) => {
        state.message = action.error.message ? action.error.message : "error";
      }),
      builder.addCase(updateUser.fulfilled, (state, action) => {
        // state.user=action.payload?action.payload:""
        Cookie.set("user", JSON.stringify(action?.payload?.data));
        state.message = action?.payload?.message;
        state.user = action.payload.data ? action.payload.data : "";
      }),
      builder.addCase(updateUser.pending, (state, action) => {
        state.message = "";
      }),
      builder.addCase(updateUser.rejected, (state, action) => {
        state.message = action.error.message ? action.error.message : "error";
      }),
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        state.message = action?.payload?.message;
        if (action.payload.data) {
          state.user = action.payload.data ? action.payload.data : "";
        }
      }),
      builder.addCase(deleteUser.pending, (state, action) => {
        state.message = "";
      }),
      builder.addCase(deleteUser.rejected, (state, action) => {
        state.message = action.error.message ? action.error.message : "error";
      });
  },
});
export const { removeUser, removeTokenUser, removeMessage } = userSlice.actions;
export default userSlice.reducer;
