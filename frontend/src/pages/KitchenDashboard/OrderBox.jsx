import { Clock, Plus } from "lucide-react";
import "./OrderBox.css";
import { useState } from "react";
import API from "../../utils/api";
import { toaster } from "../../components/ui/toaster";
import { Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { LuCheck, LuCookingPot } from "react-icons/lu";
import { IoIosHourglass } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlineNavigateNext } from "react-icons/md";
const steps = [
  {
    icon: <IoIosHourglass />,
    description: "Waiting"
  },
  {
    icon: <LuCookingPot />,
    description: "Preparing"
  },
  {
    icon: <IoMdDoneAll />,
    description: "Ready"
  },
  
];

const stepscount = {
  pending: 0,
  preparing: 1,
  ready: 2,
  served: 3,
};
export default function OrderBox({ order }) {

  const updateItemStatus = async (orderId, itemId, val) => {
    if(val==1){
      val="preparing"
    }else if(val==2){
      val="ready"
    }else{
      val="served"
    }
  
    try {
      const responce = await API.put(`/order/${orderId}`, {
        itemId,
        status: val,
      });
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
    <div className="order-box" key={order._id}>
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
              : `Table ${order.tableNumber}`}
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
            <div>
              {item.quantity} X {item.menuId.name}
            </div>
            <div>
              <Steps.Root
                defaultStep={stepscount[item.status]}
                count={steps.length}
                gap={0}
                colorPalette={"green"}
                size="sm"
                onStepChange={(e)=>updateItemStatus(order._id,item._id,e.step)}
              >
                <div
                  style={{ display: "flex",gap:"10px"}}
                >
                  <Steps.List style={{width:"90%" }}>
                    {steps.map((step, index) => (
                      <Steps.Item key={index} index={index} gap={0}>
                        <Steps.Indicator>
                          <Steps.Status
                            incomplete={step.icon}
                            complete={step.icon}
                          />
                        </Steps.Indicator>
                        <Steps.Separator />
                      </Steps.Item>
                    ))}
                  </Steps.List>
                  <ButtonGroup size="xs" variant="outline">
                    {/* <Steps.PrevTrigger asChild>
                      <Button>Prev</Button>
                    </Steps.PrevTrigger> */}
                    <Steps.NextTrigger asChild>
                      <Button><MdOutlineNavigateNext/></Button>
                    </Steps.NextTrigger>
                  </ButtonGroup>
                </div>
                {steps.map((step, index) => (
                  <Steps.Content key={index} index={index}>
                    {step.description}
                  </Steps.Content>
                ))}
                <Steps.CompletedContent>
                  All steps are complete!
                </Steps.CompletedContent>
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
