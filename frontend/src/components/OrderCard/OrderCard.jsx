import { Clock, CreditCard, Plus, Printer } from "lucide-react";
import {ITEM_STATUSES,} from "../../data/constants";
// import Badge from "../Badge/Badge";
import "./OrderCard.css";

export default function OrderCard({ order,setModal}) {
  const total = order.items.reduce((sum, i) => sum + i.menuId.price * i.quantity, 0);

  return (
    <div className="order-card">

      {/* Header */}
      <div className="order-card__header">
        <div className="order-card__id-group">
          <div>
            <span className="order-card__id">{order.orderNumber}</span>
            <span
              className={`order-card__type-badge ${
                order.type === "takeaway"
                  ? "order-card__type-badge--takeaway"
                  : "order-card__type-badge--dine"
              }`}
            >
              {order.orderType === "takeaway" ? "Takeaway" : `Table ${order.tableNumber}`}
            </span>
          </div>
          <button className="btn-action btn-action--print">
            <Printer size={14} /> Print Bill
          </button>
        </div>
        {/* <Badge status={order.status} /> */}
      </div>

      <div className="order-card__meta">
        <span>
          <b>Customer:</b> {order.customerNumber}
        </span>
        {order.createdBy.name && (
          <span>
            <b>Waiter:</b> {order.createdBy.name}
          </span>
        )}
        {order.phone && (
          <span>
            <b>Phone:</b> {order.customerNumber}
          </span>
        )}
        <span className="order-card__meta-time">
          <Clock size={10} /> {order.orderTime}
        </span>
      </div>

      {/* Items */}
      <div className="order-card__items">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-card__item-row">
            <span>
              <div>{item.menuId.name}</div>
              <div className="order-card__item-price">
                Qty: {item.quantity} · ₹{item.menuId.price} each
              </div>
            </span>
            <span className="order-card__item-price">
              ₹{item.menuId.price * item.quantity}
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
      </div>

      {/* Bill summary */}
        <div className="order-bill">
          {/* <div className="order-card__item-row">
            <span>Subtotal</span>
            <span>₹</span>
          </div>
          <div className="order-card__item-row">
            <span>GST (5%)</span>
            <span>₹</span>
          </div> */}
          <div className="order-card__item-row">
            <span>Grand Total</span>
            <span>₹{total}</span>
          </div>
        </div>

      {/* Footer */}
      <div className="order-card__footer">
        <button className="btn-action btn-action--add" onClick={() => setModal({type:"add"})}>
          <Plus size={14} /> Add Items
        </button>
        <button className="btn-action btn-action--pay" onClick={() => setModal({type:"pay",data:order})}>
          <CreditCard size={14} />
          Mark as Paid
        </button>
      </div>
    </div>
  );
}
