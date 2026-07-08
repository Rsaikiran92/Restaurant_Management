import { useEffect } from "react";
import { createContext, useState } from "react";
import API from "../utils/api";

async function getprofile(setdata) {
  try {
    const res = await API.get("/users/profile");
    setdata(res.data.user);
  } catch {
   
  }
}

export const UserContext = createContext();

function ContextProvider({ children }) {
  const [data, setdata] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        getprofile(setdata) 
    }
  }, []);
  return (
    <UserContext.Provider value={{ data, setdata }}>
      {children}
    </UserContext.Provider>
  );
}

export default ContextProvider;
