import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";
import "./Dashboard.css";
import { fetchMenu, fetchOrders, fetchTables, fetchUsers } from "../../utils/api";




function Dashboard() {
  const {orders}=useSelector((state)=>state.order)
  const onNavigate=useNavigate()
  const dispatch = useDispatch();
  const role=localStorage.getItem("role")
  
  const takeawayOrders = orders.filter((item) => item.orderType === "takeaway");
  const dineOrders     = orders.filter((item) => item.orderType === "dine-in");
  const activeOrders = orders.filter((item) => item.status !== "served");
  const revenue = orders
    .filter((item) => item.status === "served")
    .reduce((sum, item) => sum + item.items.reduce((s, i) => s + i.price * i.qty, 0), 0);

  useEffect(() => {
    fetchOrders(dispatch);
  }, []);

  const stats = [
    { label: "Total Orders",      value: orders.length,           color: "#b84c00", bg: "#fff8f0" },
    { label: "Takeaway",          value: takeawayOrders.length,   color: "#2e7d32", bg: "#e8f5e9" },
    { label: "Dine-in",           value: dineOrders.length,       color: "#1565c0", bg: "#e3f2fd" },
    { label: "Revenue (Served)",  value: `₹${revenue.toLocaleString("en-IN")}`, color: "#4a148c", bg: "#f3e5f5" },
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
        {role=="frontdesk"&& <button
            className="dashboard__action-btn"
            onClick={() => onNavigate("/takeaway")}
            style={{ background: "#fff8f0", borderColor: "#b84c0040", color:"#b84c00" }}
          >
            <div className="dashboard__action-btn-left">
              <span className="dashboard__action-btn-label">New Takeaway Order</span>
            </div>
            <ArrowRight size={15} />
          </button>}
           {role=="waiter"&&<button
            className="dashboard__action-btn"
            onClick={() => onNavigate("/dine")}
            style={{ background: "#e8f0fd", borderColor: "#1565c040", color:"#1565c0" }}
          >
            <div className="dashboard__action-btn-left">
              <span className="dashboard__action-btn-label">New Dine-in Order</span>
            </div>
            <ArrowRight size={15} />
          </button>}
      </div>

      {/* Active orders */}
      <div className="dashboard__active-title">
        Active Orders ({activeOrders.length})
      </div>

      {activeOrders.length === 0 ? (
        <div className="dashboard__empty">All orders have been served!</div>
      ) : (
        <div className="dashboard__active-list">
          {activeOrders.map((item) => {
            const total = item.items.reduce((s, i) => s + i.menuId.price * i.quantity, 0);
            return (
              <div key={item._id} className="dashboard__active-row">
                <div className="dashboard__active-info">
                  <div className="dashboard__active-info-top">
                    <span className="dashboard__active-id">{item.orderNumber}</span>
                    <span
                      className={`dashboard__active-type ${
                        item.orderType === "takeaway"
                          ? "dashboard__active-type--takeaway"
                          : "dashboard__active-type--dine"
                      }`}
                    >
                      {item.orderType === "takeaway" ? "Takeaway" : `Table ${item.tableNumber}`}
                    </span>
                  </div>
                  <div className="dashboard__active-sub">
                    {item.customer} · {item.time} · {item.items.length} items
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