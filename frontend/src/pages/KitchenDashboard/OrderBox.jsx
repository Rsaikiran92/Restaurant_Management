import { Clock, Plus } from "lucide-react";
import "./OrderBox.css";
import { ITEM_STATUSES } from "../../data/constants";

export default function OrderBox({order}) {
  
  return (
    <div className="order-box">
      {/* Header */}
      
      <div className="order-box__header" key={order._id}>
        <div className="order-box__id-group">
          <span className="order-box__id">{order.orderNumber}</span>
          <span
            className={`order-box__type-badge ${
              order.type === "takeaway"
                ? "order-box__type-badge--takeaway"
                : "order-box__type-badge--dine"
            }`}
          >
            {order.orderType === "takeaway" ? "Takeaway" : `Table ${order.orderTable}`}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="order-box__meta">
        <span className="order-box__meta-time">
          <Clock size={10} /> {order.orderTime}
        </span>
      </div>

      {/* Items */}
      <div className="order-box__items">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-box__item-row">
            <span>
              <div>{item.menuId.name}</div>
              <div className="order-box__item-price">
                Qty: {item.quantity} · ₹{item.menuId.price} each
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
        <button className="order-box-btn">Order Completed</button>
    </div>
      
    </div>
  );
}
