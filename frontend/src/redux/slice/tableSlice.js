import { createSlice } from "@reduxjs/toolkit";

const tableSlice=createSlice({
    name:"table",
    initialState:{
        loading:false,
        tables:[],
        error:""
    },
    reducers:{
        loadingTable:(state)=>{
            return {...state,loading:true}
        },
        successTable:(state,action)=>{
            return {...state,loading:false,tables:action.payload}
        },
        errorTable:(state,action)=>{
            return {...state,loading:false,error:action.payload}
        }
    }
})

export const {loadingTable,successTable,errorTable}=tableSlice.actions

export default tableSlice.reducer