import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

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

//create user
export const get_user = async (dispatch, success, loading, err) => {
  try {
    dispatch(loading());
    const responce = await API.get("/users");
    dispatch(success(responce.data));
  } catch (error) {}
};

//edit users
export const edit_user = async () => {
  try {
  } catch (error) {}
};

// delete users
export const delete_user = async () => {
  try {
  } catch (error) {}
};

export default API;
