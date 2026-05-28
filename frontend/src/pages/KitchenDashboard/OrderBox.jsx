import { Clock, Plus } from "lucide-react";
import "./OrderBox.css";
import { ITEM_STATUSES } from "../../data/constants";
import { useState } from "react";
import API from "../../utils/api";
import {toaster} from "../../components/ui/toaster"

export default function OrderBox({ order }) {
  const [status,setstatus]=useState("")

  const updateItemStatus = async (orderId,itemId,val) => {
    setstatus(val)
    try {
      const responce = await API.put(`/order/${orderId}`, {itemId,status:val});
      toaster.success({
        title: "Menu added successful",
        description: "Menu added successfully from the server",
        closable: false,
        action: {
          label: "ok",
        },
      });
    } catch (error) {
      console.log(error);
   
    }
  };

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
            {order.orderType === "takeaway"
              ? "Takeaway"
              : `Table ${order.orderTable}`}
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
            value={status}
            onChange={(e) =>
              updateItemStatus(order._id,item._id, e.target.value)
            }
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
