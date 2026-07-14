import { createSlice } from "@reduxjs/toolkit";

const orderPanelSlice = createSlice({
  name: "orderPanel",
  initialState: {
    cat: "All",
    phone: "",
    query: "",
    cart:[],
    isMobile:false,
    table:""
  },
  reducers: {
    setcategory:(state,action)=>{
        return {...state,cat:action.payload}
    },
    setphone:(state,action)=>{
        return {...state,phone:action.payload}
    },
    query:(state,action)=>{
        return {...state,query:action.payload}
    },
    cart:(state,action)=>{
        return {...state,cart:action.payload}
    },
    isMobile:(state,action)=>{
        return {...state,isMobile:action.payload}
    },
    settable:(state,action)=>{
        return {...state,table:action.payload}
    }
  },
});

export const { setcategory,setphone,query,cart,isMobile,settable } =orderPanelSlice.actions;

export default orderPanelSlice.reducer;
