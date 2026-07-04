import { Clock, Plus } from "lucide-react";
import "./OrderBox.css";
import { ITEM_STATUSES } from "../../data/constants";
import { useState } from "react";
import API from "../../utils/api";
import {toaster} from "../../components/ui/toaster"
import { Button, ButtonGroup, Steps } from "@chakra-ui/react"
import { LuCheck, LuCookingPot } from "react-icons/lu";
import { IoIosHourglass } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
const steps = [
  {
    icon: <IoIosHourglass />,
    description: "Waiting",
  },
  {
    icon: <LuCookingPot />,
    description: "Preparing",
  },
  {
    icon: <IoMdDoneAll />,
    description: "Book an Appointment",
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
            
              <div>{item.quantity} X {item.menuId.name}</div>
              {/* <div className="order-box__item-price">
                Qty: {item.quantity} · ₹{item.menuId.price} each
              </div> */}
            
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
            <div>
            <Steps.Root defaultStep={1} count={steps.length}  colorPalette={"green"} size="sm">
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index}>
            <Steps.Indicator color={"white"}>
              <Steps.Status incomplete={step.icon}  complete={step.icon} />
            </Steps.Indicator>
            <Steps.Separator />
          </Steps.Item>
          
        ))}
      </Steps.List>
   <div style={{display:"flex",justifyContent:"space-between"}}>
      {steps.map((step, index) => (
        <Steps.Content key={index} index={index} >
          {step.description}
        </Steps.Content>
      ))}
      <Steps.CompletedContent >All steps are complete!</Steps.CompletedContent>

      <ButtonGroup size="xs" variant="outline" >
        {/* <Steps.PrevTrigger asChild>
          <Button>Prev</Button>
        </Steps.PrevTrigger> */}
        <Steps.NextTrigger asChild>
          <Button>Next</Button>
        </Steps.NextTrigger>
      </ButtonGroup>
      </div>
    </Steps.Root>
    </div>
          </div>
        ))}
      </div>
      <div>
        <button className="order-box-btn">Order Completed</button>
      </div>
    </div>
  );
}
