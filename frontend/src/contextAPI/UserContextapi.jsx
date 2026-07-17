import { useEffect } from "react";
import { createContext, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

async function getprofile(setdata) {
  try {
    const res = await API.get("/users/profile");
    setdata(res.data.user);
  } catch(error) {
    console.log("error",error.message)
    console.log(error.response.data);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/")  
  }
}

export const UserContext = createContext();

function ContextProvider({ children }) {
  const [data, setdata] = useState({});
  const navigate=useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        getprofile(setdata) 
    }else{
      navigate("/")
    }
  }, []);
  return (
    <UserContext.Provider value={{ data, setdata }}>
      {children}
    </UserContext.Provider>
  );
}

export default ContextProvider;
