import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:"order",
    initialState:{
        loading:false,
        orders:[],
        error:""
    },
    reducers:{
        loadingOrder:(state)=>{
            return {...state,loading:true}
        },
        successOrder:(state,action)=>{
            return {...state,loading:false,orders:action.payload}
        },
        errorOrder:(state,action)=>{
            return {...state,loading:false,error:action.payload}
        }
    }
})

export const {loadingOrder,successOrder,errorOrder}=orderSlice.actions;

export default orderSlice.reducer