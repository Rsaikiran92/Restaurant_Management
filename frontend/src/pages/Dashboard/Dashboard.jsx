import { ArrowRight } from "lucide-react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {  SEED_ORDERS } from "../../data/constants";
import { useState } from "react";

function Dashboard() {
  const onNavigate=useNavigate()
  const [orders,   setOrders]   = useState(SEED_ORDERS);

  const takeawayOrders = orders.filter((o) => o.type === "takeaway");
  const dineOrders     = orders.filter((o) => o.type === "dine");
  const revenue = orders
    .filter((o) => o.status === "served")
    .reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.qty, 0), 0);
  const activeOrders = orders.filter((o) => o.status !== "served");

  const stats = [
    { label: "Total Orders",      value: orders.length,           color: "#b84c00", bg: "#fff8f0" },
    { label: "Takeaway",          value: takeawayOrders.length,   color: "#2e7d32", bg: "#e8f5e9" },
    { label: "Dine-in",           value: dineOrders.length,       color: "#1565c0", bg: "#e3f2fd" },
    { label: "Revenue (Served)",  value: `₹${revenue.toLocaleString("en-IN")}`, color: "#4a148c", bg: "#f3e5f5" },
  ];

  const actions = [
    { label: "New Takeaway Order", page: "takeaway", color: "#b84c00", bg: "#fff8f0", border: "#b84c0040" },
    { label: "New Dine-in Order",  page: "dine",     color: "#1565c0", bg: "#e8f0fd", border: "#1565c040" },
  ];

  return (
    <div className="dashboard">

      {/* Greeting */}
      <div className="dashboard__greeting">
        <div className="dashboard__greeting-title">Good afternoon! 👋</div>
        <div className="dashboard__greeting-sub">Here's what's happening at Spice Garden today.</div>
      </div>

      {/* Stats */}
      <div className="dashboard__stats">
        {stats.map((s) => (
          <div key={s.label} className="dashboard__stat-card" style={{ background: s.bg }}>
            <div className="dashboard__stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="dashboard__stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="dashboard__actions-title">Quick Actions</div>
      <div className="dashboard__actions-grid">
        {actions.map((a) => (
          <button
            key={a.page}
            className="dashboard__action-btn"
            onClick={() => onNavigate(a.page)}
            style={{ background: a.bg, borderColor: a.border, color: a.color }}
          >
            <div className="dashboard__action-btn-left">
              <span className="dashboard__action-btn-label">{a.label}</span>
            </div>
            <ArrowRight size={15} />
          </button>
        ))}
      </div>

      {/* Active orders */}
      <div className="dashboard__active-title">
        Active Orders ({activeOrders.length})
      </div>

      {activeOrders.length === 0 ? (
        <div className="dashboard__empty">All orders have been served!</div>
      ) : (
        <div className="dashboard__active-list">
          {activeOrders.map((o) => {
            const total = o.items.reduce((s, i) => s + i.price * i.qty, 0);
            return (
              <div key={o.id} className="dashboard__active-row">
                <div className="dashboard__active-info">
                  <div className="dashboard__active-info-top">
                    <span className="dashboard__active-id">{o.id}</span>
                    <span
                      className={`dashboard__active-type ${
                        o.type === "takeaway"
                          ? "dashboard__active-type--takeaway"
                          : "dashboard__active-type--dine"
                      }`}
                    >
                      {o.type === "takeaway" ? "Takeaway" : `Table ${o.table}`}
                    </span>
                  </div>
                  <div className="dashboard__active-sub">
                    {o.customer} · {o.time} · {o.items.length} items
                  </div>
                </div>
                <div className="dashboard__active-right">
               
                  <div className="dashboard__active-total">₹{total}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard