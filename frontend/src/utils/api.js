import axios from "axios";
import { errorMenu, loadingMenu, successMenu } from "../redux/slice/menuSlice";
import { failed, pending, success } from "../redux/slice/userSlice";
import { errorTable, loadingTable, successTable } from "../redux/slice/tableSlice";

const API = axios.create({
  baseURL: "http://192.168.43.142:5000/api",
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err.error),
);
// user login
export const userLogin = async (state, dispatch, setdata, navigate) => {
  dispatch({ type: "loading", value: true });
  dispatch({ type: "error", value: "" });

  try {
    const res = await API.post("/auth/login", {
      email: state.email,
      password: state.password,
    });
    const { token, user } = res.data;
    setdata(user);
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    navigate("/dashboard");
  } catch (err) {
    console.log(err);
    dispatch({ type: "loading", value: false });
    dispatch({
      type: "error",
      value: "Invalid credentials or role mismatch. Please try again.",
    });
  }
};

// GET MENU
export async function fetchMenu(dispatch) {
  try {
    dispatch(loadingMenu());
    const responce = await API.get("/menu");
    dispatch(successMenu(responce.data));
  } catch (err) {
    dispatch(errorMenu("Failed to get users data. Please try again."));
  }
}

// GET USERS
export async function fetchUsers(dispatch) {
  try {
    dispatch(pending());
    const responce = await API.get("/users");
    dispatch(success(responce.data));
  } catch (err) {
    dispatch(failed("Failed to get users data. Please try again."));
  }
}

// GET TABLES
export async function fetchTables(dispatch) {
  try {
    dispatch(loadingTable());
    const responce = await API.get("/table");
    dispatch(successTable(responce.data));
  } catch (err) {
    dispatch(errorTable("Failed to get users data. Please try again."));
  }
}

export default API;
