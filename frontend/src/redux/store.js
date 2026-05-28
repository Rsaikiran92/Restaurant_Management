import {configureStore } from "@reduxjs/toolkit"
import userReducer from "./slice/userSlice"
import menuReducer from "./slice/menuSlice"
import tableReducer from "./slice/tableSlice"
import orderReducer from "./slice/orderSlice"
import orderPanelReducer from "./slice/orderPanelSlice"

export const store=configureStore({
    reducer:{
        user:userReducer,
        menu:menuReducer,
        table:tableReducer,
        order:orderReducer,
        orderPanel:orderPanelReducer
    }
})

