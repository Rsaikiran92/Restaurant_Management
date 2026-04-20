import {
  ChefHat, Bell,
  LayoutDashboard, Package, Utensils, ClipboardList, Users,
} from "lucide-react";
import "./Navbar.css";


function Navbar({pendingCount}) {
  return (
    <header className="navbar">
      <div className="navbar__inner">

        {/* Brand */}
        <div className="navbar__brand">
          <div className="navbar__logo-box">
            <ChefHat size={20} color="#fff" />
          </div>
          <div>
            <div className="navbar__title">Spice Garden</div>
            <div className="navbar__subtitle">Restaurant Management</div>
          </div>
        </div>

        {/* Right */}
        <div className="navbar__right">
          {pendingCount > 0 && (
            <div className="navbar__pending-pill">
              <Bell size={12} />
              {pendingCount} pending
            </div>
          )}
          <div className="navbar__avatar">FD</div>
        </div>

      </div>
    </header>
  );
}

export default Navbar