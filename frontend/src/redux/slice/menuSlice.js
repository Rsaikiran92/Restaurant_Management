import { createSlice } from "@reduxjs/toolkit";

const menuSlice=createSlice({
    name:"menu",
    initialState:{
        loading:false,
        menu:[],
        error:""
    },
    reducers:{
        loadingMenu:(state)=>{
            return {...state,loading:true}
        },
        successMenu:(state,action)=>{
            return {...state,loading:false,menu:action.payload}
        },
        errorMenu:(state,action)=>{
            return {...state,loading:false,error:action.payload}
        }
    }
})

export const {loadingMenu,successMenu,errorMenu}=menuSlice.actions;

export default menuSlice.reducer;