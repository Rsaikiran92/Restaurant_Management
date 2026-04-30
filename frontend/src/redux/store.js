import {configureStore } from "@reduxjs/toolkit"
import userReducer from "./slice/userSlice"
import menuReducer from "./slice/menuSlice"
import tableReducer from "./slice/tableSlice"

export const store=configureStore({
    reducer:{
        user:userReducer,
        menu:menuReducer,
        table:tableReducer
    }
})

