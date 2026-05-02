import { useState } from "react";
import "./OrdersList.css";
import OrderCard from "../../components/OrderCard/OrderCard";
import { SEED_ORDERS } from "../../data/constants";

export default function OrdersList({ onAdvance, type="takeaway"  }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [orders,   setOrders]   = useState(SEED_ORDERS);
 console.log(orders)
  const allOfType = orders.filter((o) => o.type === type);
  const filtered  = allOfType.filter(
    (o) => filterStatus === "all" || o.status === filterStatus
  );

  const stats = [
    { label: "Total",     value: allOfType.length,                              color: "#b84c00", bg: "#fff8f0" },
    { label: "Pending",   value: allOfType.filter((o) => o.status === "pending").length,   color: "#9c4a00", bg: "#fff3e0" },
    { label: "Preparing", value: allOfType.filter((o) => o.status === "preparing").length, color: "#004085", bg: "#e3f2fd" },
    { label: "Served",    value: allOfType.filter((o) => o.status === "served").length,    color: "#3d3d3d", bg: "#f5f5f5" },
  ];

  return (
    <div className="orders-list">

      {/* Header */}
      <div className="orders-list__header">
        <div className="orders-list__title">
          {type === "takeaway" ? "Takeaway Orders" : "Dine-in Orders"}
        </div>
        <select
          className="orders-list__filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="served">Served</option>
        </select>
      </div>

      {/* Stats */}
      <div className="orders-list__stats">
        {stats.map((s) => (
          <div key={s.label} className="orders-list__stat" style={{ background: s.bg }}>
            <div className="orders-list__stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="orders-list__stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="orders-list__grid">
        {filtered.length === 0 ? (
          <div className="orders-list__empty">No orders found</div>
        ) : (
          filtered.map((order) => (
            <OrderCard key={order.id} order={order} onAdvance={onAdvance} />
          ))
        )}
      </div>

    </div>
  );
}
