import {
  ChevronRight,
  LayoutDashboard,
  Package,
  Utensils,
  ClipboardList,
  Users,
  SquareMenu,
} from "lucide-react";
import "./Sidebar.css";
import { NAV_GROUPS } from "../../data/constants";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contextAPI/UserContextapi";

const ICON_MAP = {
  LayoutDashboard: <LayoutDashboard size={15} />,
  Package: <Package size={15} />,
  Utensils: <Utensils size={15} />,
  ClipboardList: <ClipboardList size={15} />,
  Users: <Users size={15} />,
  Menu: <SquareMenu size={15} />,
};

const MOBILE_BREAKPOINT = 768;
const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideOpen, setSideOpen] = useState(!isMobile());
  const {data}=useContext(UserContext)
  const role=localStorage.getItem("role")


  useEffect(() => {
    if (isMobile()) setSideOpen(false);
  }, [location.pathname]);

  // Also handle window resize
  useEffect(() => {
    const onResize = () => {
      if (!isMobile()) setSideOpen(true); // reopen when going back to desktop
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const currentPage = location.pathname.replace("/", "") || "dashboard";

  const cls = sideOpen ? "sidebar sidebar--open" : "sidebar sidebar--closed";
const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((nav) =>
      nav.roles.includes(role)                    // ← role check here
    ),
  })).filter((group) => group.items.length > 0);   
 
  return (
    <aside className={cls}>
      <nav className="sidebar__nav">
        {visibleGroups.map((group) => (
          <div key={group.key} className="sidebar__group">
            {sideOpen && (
              <div className="sidebar__group-label">{group.label}</div>
            )}

            {group.items.map((nav) => {
              const isActive = currentPage === nav.id;
              return (
                <button
                  key={nav.id}
                  className={`sidebar__nav-btn${isActive ? " sidebar__nav-btn--active" : ""}`}
                  onClick={() => navigate(nav.id)}
                  title={!sideOpen ? nav.label : ""}
                >
                  <span className="sidebar__nav-icon">
                    {ICON_MAP[nav.icon]}
                  </span>
                  {sideOpen && (
                    <span className="sidebar__nav-label">{nav.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <button
        className="sidebar__collapse"
        onClick={() => setSideOpen((s) => !s)}
      >
        {sideOpen && <span>Collapse</span>}
        <ChevronRight size={14} className="sidebar__collapse-icon" />
      </button>
    </aside>
  );
}
