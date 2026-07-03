import { Clock, Plus } from "lucide-react";
import "./OrderBox.css";
import { ITEM_STATUSES } from "../../data/constants";
import { useState } from "react";
import API from "../../utils/api";
import {toaster} from "../../components/ui/toaster"
import { Button, ButtonGroup, Steps } from "@chakra-ui/react"
const steps = [
  {
    title: "Step 1",
    description: "Step 1 description",
  },
  {
    title: "Step 2",
    description: "Step 2 description",
  },
  {
    title: "Step 3",
    description: "Step 3 description",
  },
]
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
              <div>{item.quantity} X {item.menuId.name}</div>
              {/* <div className="order-box__item-price">
                Qty: {item.quantity} · ₹{item.menuId.price} each
              </div> */}
            </span>
            {/* <select
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
            </select> */}
            <Steps.Root defaultStep={1} count={steps.length}>
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} title={step.title} >
            <Steps.Indicator />
            
            <Steps.Separator />
          </Steps.Item>
          
        ))}
      </Steps.List>

      
      <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

      {/* <ButtonGroup size="sm" variant="outline">
        <Steps.PrevTrigger asChild>
          <Button>Prev</Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button>Next</Button>
        </Steps.NextTrigger>
      </ButtonGroup> */}
    </Steps.Root>
          </div>
        ))}
      </div>
      <div>
        <button className="order-box-btn">Order Completed</button>
      </div>
    </div>
  );
}
