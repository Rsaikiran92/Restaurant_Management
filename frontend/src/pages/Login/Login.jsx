import { useState } from "react";
import {
  ChefHat, Mail, Lock, Eye, EyeOff,
  AlertCircle, Package, Utensils, LayoutDashboard, Users,
} from "lucide-react";
import "./Login.css";
import API from "../../utils/api"
import { useNavigate } from "react-router-dom";


const FEATURES = [
  { icon: <Package size={15} color="#fff" />,        text: "Takeaway & dine-in order management" },
  { icon: <Utensils size={15} color="#fff" />,       text: "Live kitchen status tracking" },
  { icon: <LayoutDashboard size={15} color="#fff" />,text: "Real-time dashboard & analytics" },
  { icon: <Users size={15} color="#fff" />,          text: "Multi-role staff access control" },
];

function Login({ onLogin }) {
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");
  const [showPwd,  setShowPwd]    = useState(false);
  const [error,    setError]      = useState("");
  const [loading,  setLoading]    = useState(false);
  const [touched,  setTouched]    = useState({ username: false, password: false });
  const navigate=useNavigate()

  const usernameErr = touched.username && !username.trim() ? "Username is required" : "";
  const passwordErr = touched.password && !password.trim() ? "Password is required" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (!username.trim() || !password.trim()) return;

    setLoading(true);
    setError("");

     try {
      const res = await API.post("/auth/login", {email:username,password});

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "waiter") navigate("/waiter");
      else if (user.role === "kitchen") navigate("/kitchen");
      else navigate("/frontdesk");

    } catch (err) {
        setError("Invalid credentials or role mismatch. Please try again.");
        setLoading(false);
    }
    /* Simulate network delay */
    // await new Promise((r) => setTimeout(r, 900));

    // const match = USERS.find(
    //   (u) => u.username === username.trim() && u.password === password 
    // );

    // if (match) {
    //   onLogin({ name: match.name,  username: match.username });
    // } else {
    //   setError("Invalid credentials or role mismatch. Please try again.");
    //   setLoading(false);
    // }
  };

  /* Quick-fill a demo credential */
  const fillDemo = (user) => {
    setUsername(user.username);
    setPassword(user.password);
    setError("");
    setTouched({ username: false, password: false });
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
            <div className="login-page__brand-tagline">Restaurant Management System</div>
          </div>
        </div>

        {/* Hero text */}
        <div className="login-page__hero">
          <span className="login-page__hero-emoji">🍛</span>
          <div className="login-page__hero-title">
            Your restaurant,<br />managed smartly.
          </div>
          <div className="login-page__hero-desc">
            Streamline your front desk, track live orders, manage tables,
            and keep your kitchen running at full speed — all from one place.
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
            <div className="login-page__card-sub">Sign in to your staff account</div>
          </div>

          {/* Error alert */}
          {error && (
            <div className="login-page__alert" style={{ marginBottom: 20 }}>
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>


            {/* Username */}
            <div className="login-form__group">
              <label className="login-form__label" htmlFor="username">Username / Email</label>
              <div className="login-form__input-wrap">
                <span className="login-form__input-icon"><Mail size={15} /></span>
                <input
                  id="username"
                  type="email"
                  className={`login-form__input${usernameErr ? " login-form__input--error" : ""}`}
                  placeholder="you@spice.in"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); }}
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
              <label className="login-form__label" htmlFor="password">Password</label>
              <div className="login-form__input-wrap">
                <span className="login-form__input-icon"><Lock size={15} /></span>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  className={`login-form__input${passwordErr ? " login-form__input--error" : ""}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-form__input-toggle"
                  onClick={() => setShowPwd((s) => !s)}
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
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
              disabled={loading}
            >
              {loading ? (
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


export default Login