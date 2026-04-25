import { createContext, useState } from "react";

export const UserContext=createContext();

function ContextProvider({children}){
    const [data,setdata]=useState({})
    return<UserContext.Provider value={{data,setdata}}>{children}</UserContext.Provider>
}

export default ContextProvider