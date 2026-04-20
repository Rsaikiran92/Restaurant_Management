import {
  ChefHat, ChevronRight,
  LayoutDashboard, Package, Utensils, ClipboardList, Users,
} from "lucide-react";
import "./Sidebar.css";
import { NAV_GROUPS } from "../../data/constants";
import { useState } from "react";

const ICON_MAP = {
  LayoutDashboard: <LayoutDashboard size={15} />,
  Package:         <Package size={15} />,
  Utensils:        <Utensils size={15} />,
  ClipboardList:   <ClipboardList size={15} />,
  Users:           <Users size={15} />,
};


export default function Sidebar({ page, onNavigate}) {
    const [sideOpen, setSideOpen]= useState(true);
    const [tkCart,   setTkCart]  = useState([]);
  const [dCart,    setDCart]   = useState([]);
  const cls = sideOpen ? "sidebar sidebar--open" : "sidebar sidebar--closed";

  const tkBadge      = tkCart.reduce((s, c) => s + c.qty, 0);
const dBadge       = dCart.reduce((s,  c) => s + c.qty, 0);

  return (
    <aside className={cls}>
      {/* Nav */}
      <nav className="sidebar__nav">
        {NAV_GROUPS.map((group) => (
          <div key={group.key} className="sidebar__group">
            {sideOpen && (
              <div className="sidebar__group-label">{group.label}</div>
            )}
            {group.items.map((nav) => {
              const isActive = page === nav.id;
              const badge =
                nav.id === "takeaway" ? tkBadge :
                nav.id === "dine"     ? dBadge  : 0;

              return (
                <button
                  key={nav.id}
                  className={`sidebar__nav-btn${isActive ? " sidebar__nav-btn--active" : ""}`}
                  onClick={() => onNavigate(nav.id)}
                  title={!sideOpen ? nav.label : ""}
                >
                  <span className="sidebar__nav-icon">{ICON_MAP[nav.icon]}</span>

                  {sideOpen && (
                    <span className="sidebar__nav-label">{nav.label}</span>
                  )}

                  {sideOpen && badge > 0 && (
                    <span className="sidebar__cart-badge">{badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button className="sidebar__collapse" onClick={() => setSideOpen((s) => !s)}>
        {sideOpen && <span>Collapse</span>}
        <ChevronRight size={14} className="sidebar__collapse-icon" />
      </button>
    </aside>
  );
}
