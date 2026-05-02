import { Clock, Plus } from "lucide-react";
import "./OrderCard.css";
// import Badge from "../Badge/Badge";
import {
  NEXT_STATUS,
  STATUS_CONFIG,
  ITEM_STATUSES,
} from "../../data/constants";

export default function OrderCard({ order, onAdvance }) {
  const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="order-card">
      {/* Header */}
      <div className="order-card__header">
        <div className="order-card__id-group">
          <span className="order-card__id">{order.id}</span>
          <span
            className={`order-card__type-badge ${
              order.type === "takeaway"
                ? "order-card__type-badge--takeaway"
                : "order-card__type-badge--dine"
            }`}
          >
            {order.type === "takeaway" ? "Takeaway" : `Table ${order.table}`}
          </span>
        </div>
        {/* <Badge status={order.status} /> */}
      </div>

      {/* Meta */}
      <div className="order-card__meta">
        <span>
          <b>Customer:</b> {order.customer}
        </span>
        {order.waiter && (
          <span>
            <b>Waiter:</b> {order.waiter}
          </span>
        )}
        {order.phone && (
          <span>
            <b>Phone:</b> {order.phone}
          </span>
        )}
        <span className="order-card__meta-time">
          <Clock size={10} /> {order.time}
        </span>
      </div>

      {/* Items */}
      <div className="order-card__items">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-card__item-row">
            <span>
              {item.qty}× {item.name}
            </span>
            <span className="order-card__item-price">
              ₹{item.price * item.qty}
            </span>
            {/* <select
            // value={item.status}
            // disabled={selected.paid}
            // className={`item-status-select item-status-select--${item.status}`}
            // onChange={(e) =>
            //   updateItemStatus(selected.id, item.itemId, e.target.value)
            // }
            >
              {ITEM_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select> */}
          </div>
        ))}
        {/* Bill summary */}
      <div className="order-bill">
        <div className="order-card__item-row">
          <span>Subtotal</span>
          <span>₹</span>
        </div>
        <div className="order-card__item-row">
          <span>GST (5%)</span>
          <span>₹</span>
        </div>
        <div className="order-card__item-row">
          <span>Grand Total</span>
          <span>₹{total}</span>
        </div>
      </div>
      </div>

      
      {/* Footer */}
      <div className="order-card__footer">
        
      </div>
    </div>
  );
}
