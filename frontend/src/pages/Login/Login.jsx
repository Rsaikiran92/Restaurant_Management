import { useContext, useReducer, useState } from "react";
import {
  ChefHat,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Package,
  Utensils,
  LayoutDashboard,
  Users,
} from "lucide-react";
import "./Login.css";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contextAPI/UserContextapi";

const FEATURES = [
  {
    icon: <Package size={15} color="#fff" />,
    text: "Takeaway & dine-in order management",
  },
  {
    icon: <Utensils size={15} color="#fff" />,
    text: "Live kitchen status tracking",
  },
  {
    icon: <LayoutDashboard size={15} color="#fff" />,
    text: "Real-time dashboard & analytics",
  },
  {
    icon: <Users size={15} color="#fff" />,
    text: "Multi-role staff access control",
  },
];

const initialState={
  email:"",
  password:"",
  loading:false,
  error:"",
  showPwd:false
}

function reducer(state,action){
  switch(action.type){
    case "email":
      return {...state,email:action.value};
    case "password":
      return {...state,password:action.value};
    case "loading":
      return {...state,loading:action.value};
    case "error":
      return {...state,error:action.value};
    case "showPwd":
      return {...state,showPwd:action.value};  
    default :
    return state
  }
}

function Login() {
  const [state,dispatch]=useReducer(reducer,initialState)
  const [touched, setTouched] = useState({ username: false, password: false });
  const navigate = useNavigate();
  const {setdata}=useContext(UserContext)

  const usernameErr =
    touched.username && !state.email.trim() ? "Username is required" : "";
  const passwordErr =
    touched.password && !state.password.trim() ? "Password is required" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ username: true, password: true });
    if (!state.email.trim() || !state.password.trim()) return;

    dispatch({type:"loading",value:true})
    dispatch({type:"error",value:""})

    try {
      const res = await API.post("/auth/login", { email: state.email, password:state.password });

      const { token, user } = res.data;
      setdata(user)
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      navigate("/dashboard");
    } catch (err) {
      dispatch({type:"loading",value:false})
      dispatch({type:"error",value:"Invalid credentials or role mismatch. Please try again."})
    }
  };

  return (
    <div className="login-page">
      {/* ── Left branding panel ── */}
      <div className="login-page__left">
        {/* Logo */}
        <div className="login-page__brand">
          <div className="login-page__brand-icon">
            <ChefHat size={24} color="#fff" />
          </div>
          <div>
            <div className="login-page__brand-name">Spice Garden</div>
            <div className="login-page__brand-tagline">
              Restaurant Management System
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div className="login-page__hero">
          <span className="login-page__hero-emoji">🍛</span>
          <div className="login-page__hero-title">
            Your restaurant,
            <br />
            managed smartly.
          </div>
          <div className="login-page__hero-desc">
            Streamline your front desk, track live orders, manage tables, and
            keep your kitchen running at full speed — all from one place.
          </div>
        </div>

        {/* Feature pills */}
        <div className="login-page__features">
          {FEATURES.map((f, i) => (
            <div key={i} className="login-page__feature">
              <div className="login-page__feature-icon">{f.icon}</div>
              <span className="login-page__feature-text">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="login-page__right">
        <div className="login-page__card">
          <div className="login-page__card-header">
            <div className="login-page__card-title">Welcome back 👋</div>
            <div className="login-page__card-sub">
              Sign in to your staff account
            </div>
          </div>

          {/* Error alert */}
          {state.error && (
            <div className="login-page__alert" style={{ marginBottom: 20 }}>
              <AlertCircle size={15} />
              {state.error}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="login-form__group">
              <label className="login-form__label" htmlFor="username">
                 Email
              </label>
              <div className="login-form__input-wrap">
                <span className="login-form__input-icon">
                  <Mail size={15} />
                </span>
                <input
                  id="username"
                  type="email"
                  className={`login-form__input${usernameErr ? " login-form__input--error" : ""}`}
                  placeholder="you@gmail.com"
                  value={state.email}
                  onChange={(e) => {
                    // setUsername(e.target.value);
                    dispatch({type:"email",value:e.target.value})
                    dispatch({type:"error",value:""})
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                  autoComplete="username"
                />
              </div>
              {usernameErr && (
                <div className="login-form__error">
                  <AlertCircle size={12} /> {usernameErr}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="login-form__group">
              <label className="login-form__label" htmlFor="password">
                Password
              </label>
              <div className="login-form__input-wrap">
                <span className="login-form__input-icon">
                  <Lock size={15} />
                </span>
                <input
                  id="password"
                  type={state.showPwd ? "text" : "password"}
                  className={`login-form__input${passwordErr ? " login-form__input--error" : ""}`}
                  placeholder="Enter your password"
                  value={state.password}
                  onChange={(e) => {
                    // setPassword(e.target.value);
                    dispatch({type:"password",value:e.target.value})
                    dispatch({type:"error",value:""})
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-form__input-toggle"
                  onClick={() => dispatch({type:"showPwd",value:!state.showPwd})}
                  tabIndex={-1}
                >
                  {state.showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {passwordErr && (
                <div className="login-form__error">
                  <AlertCircle size={12} /> {passwordErr}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-form__submit"
              disabled={state.loading}
            >
              {state.loading ? (
                <>
                  <span className="login-form__spinner" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
