import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import backendApi from "../../api/backendApi";
import { toast } from "sonner";

interface User{
    _id : string;
    email : string;
    name? : string;
    token : string;
    uploadCount : number;
    downloadCount : number;
}

interface SignUpPlayload{
    email:string;
    password:string;
}

interface SignInPlayload{
    email:string;
    password:string;
}

interface AuthResponse{
    success:boolean,
    message:string,
    user?:User,
}

export interface AuthState{
    loggedInUser : User | null;
    loading : boolean;
}
const initialState = {
    loggedInUser : null,
    loading:false,
};


export const signupUser = createAsyncThunk<void, SignUpPlayload, {rejectValue : string}>(

    "auth/sign-up-user", 
    async(payload, thunkApi)=>{
    try{
        const {data} = await backendApi.post<AuthResponse>(
            "/api/v1/auth/sign-up",
            payload
        );
        if(data.success){
            toast.success(data.message);
        }else{
           toast.warning(data.message);
        
        }
    }catch(error:any){
          toast.error(error);
    }
})


//sign in

export const signInuser = createAsyncThunk<string | null, SignInPlayload, {rejectValue : string}>(
    "auth/sign-in-user", 
    async(payload, thunkApi)=>{

    try{
        const {email, password} = payload;
       const {data} = await backendApi.post<AuthResponse>(
        "/api/v1/auth/sign-in", 
        {email, password}
    );

       if(data.success){
        if(data.user){
            toast.success(data.message);
            localStorage.setItem('token', data.user.token);
        }
        return data.user?.token || null;

       }else{
         toast.warning(data.message);
         return thunkApi.rejectWithValue(data.message);
       }
    }catch(error:any){
        toast.error(error);
        return thunkApi.rejectWithValue(error);
    }
});

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(signInuser.pending,(state)=>{state.loading = true})
        .addCase(signInuser.fulfilled, (state, action)=>{
            state.loading = false;
        })
        .addCase(signInuser.rejected, (state)=>{
            state.loading = false;
        })
    }
});


export const authReducer = authSlice.reducer;
export const selectLoggedInUser = (state : RootState) => state.auth.loggedInUser;
export const selectLoding = (state : RootState) => state.auth.loading;