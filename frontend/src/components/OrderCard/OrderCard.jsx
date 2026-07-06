import { Clock, CreditCard, Plus, Printer } from "lucide-react";
import { ITEM_STATUSES } from "../../data/constants";
import { Badge } from "@chakra-ui/react"
import "./OrderCard.css";

export default function OrderCard({ order, setModal }) {
  const total = order.items.reduce(
    (sum, i) => sum + i.menuId.price * i.quantity,
    0,
  );
  const role = localStorage.getItem("role");
  console.log(role);
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
              {order.orderType === "takeaway"
                ? "Takeaway"
                : `Table ${order.tableNumber}`}
            </span>
          </div>
          {role != "waiter" && (
            <button className="btn-action btn-action--print">
              <Printer size={14} /> Print Bill
            </button>
          )}
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

            <Badge variant="solid" colorPalette={item.status=="waiting"?"red":item.status=="preparing"?"orange":"green"}>
              {item.status}
            </Badge>
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
       {role != "waiter" && <div className="order-card__item-row">
          <span>Grand Total</span>
          <span>₹{total}</span>
        </div>}
      </div>

      {/* Footer */}
      <div className="order-card__footer">
        <button
          className="btn-action btn-action--add"
          onClick={() => setModal({ type: "add" })}
        >
          <Plus size={14} /> Add Items
        </button>
        {role != "waiter" && (
          <button
            className="btn-action btn-action--pay"
            onClick={() => setModal({ type: "pay", data: order })}
          >
            <CreditCard size={14} />
            Mark as Paid
          </button>
        )}
      </div>
    </div>
  );
}
