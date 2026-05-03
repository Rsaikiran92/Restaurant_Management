import { Clock, Plus } from "lucide-react";
import "./OrderBox.css";
import { ITEM_STATUSES } from "../../data/constants";

export default function OrderBox({ order, onAdvance }) {
  
  return (
    <div className="order-box">
      {/* Header */}
      <div className="order-box__header">
        <div className="order-box__id-group">
          <span className="order-box__id">{order.id}</span>
          <span
            className={`order-box__type-badge ${
              order.type === "takeaway"
                ? "order-box__type-badge--takeaway"
                : "order-box__type-badge--dine"
            }`}
          >
            {order.type === "takeaway" ? "Takeaway" : `Table ${order.table}`}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="order-box__meta">
        <span className="order-box__meta-time">
          <Clock size={10} /> {order.time}
        </span>
      </div>

      {/* Items */}
      <div className="order-box__items">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-box__item-row">
            <span>
              <div>{item.name}</div>
              <div className="order-box__item-price">
                Qty: {item.qty} · ₹{item.price} each
              </div>
            </span>
            <select
            // value={item.status}
            // onChange={(e) =>
            //   updateItemStatus(selected.id, item.itemId, e.target.value)
            // }
            >
              {ITEM_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    <div>
        <button>Order Completed</button>
    </div>
      
    </div>
  );
}
