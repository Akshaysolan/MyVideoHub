import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import backendApi from "../../api/backendApi";
import { toast } from "sonner";
import type { NavigateFunction } from "react-router-dom";

// ====================== Interfaces ======================

interface User {
  _id: string;
  email: string;
  name : string;
  token: string;
  uploadCount: number;
  downloadCount: number;
}

interface SignUpPayload {
  email: string;
  password: string;
}

interface SignInPayload {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  name: string;
  email : string;
}

export interface AuthState {
  loggedInUser: User | null;
  loading: boolean;
}

// ====================== Initial State ======================

const initialState: AuthState = {
  loggedInUser: null,
  loading: false,
};

// ====================== Thunks ======================

// Sign Up
export const signupUser = createAsyncThunk<void, SignUpPayload, { rejectValue: string }>(
  "auth/sign-up-user",
  async (payload, thunkApi) => {
    try {
      const { data } = await backendApi.post<AuthResponse>(
        "/api/v1/auth/sign-up",
        payload
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.warning(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  }
);

// Sign In
export const signInuser = createAsyncThunk<string | null, SignInPayload, { rejectValue: string }>(
  "auth/sign-in-user",
  async (payload, thunkApi) => {
    try {
      const { email, password, navigate } = payload;
      const { data } = await backendApi.post<AuthResponse>(
        "/api/v1/auth/sign-in",
        { email, password }
      );

      if (data.success) {
        if (data.user) {
          toast.success(data.message);
          localStorage.setItem("token", data.user.token);
          navigate("/user/profile");
        }
        return data.user?.token || null;
      } else {
        toast.warning(data.message);
        return thunkApi.rejectWithValue(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Fetch User Details
export const fetchUserDetails = createAsyncThunk<User | null, void, { rejectValue: string }>(
  'auth/fetch-user-details',
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkApi.rejectWithValue('No authorization token found');
      }

      const { data } = await backendApi.get<AuthResponse>('/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success && data.user) {
        console.log("Fetched user details:", data.user); // 👈 Optional: for debugging
        return data.user;
      } else {
        return thunkApi.rejectWithValue(data.message || 'Failed to fetch user data');
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error.message || 'Something went wrong';
      toast.error(errorMessage);
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

// ====================== Slice ======================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutUser: (state, action) => {
      const navigate = action.payload;
      localStorage.removeItem("token");
      state.loggedInUser = null;
      toast.info("We will miss you");
      navigate("/sign-in");
    },

    updateUser: (state, action) => {
      const { name, email } = action.payload;
      if (state.loggedInUser) {
        state.loggedInUser.name = name;
        state.loggedInUser.email = email;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signInuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInuser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signInuser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

// ====================== Exports ======================

export const authReducer = authSlice.reducer;
export const { logOutUser, updateUser } = authSlice.actions;
export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
export const selectLoading = (state: RootState) => state.auth.loading;
