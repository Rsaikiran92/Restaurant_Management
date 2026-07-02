import OrderCard from "../../components/OrderCard/OrderCard";
import AddItemsModal from "./AddItemsModel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./OrdersList.css";
import PayModal from "./PayModel";
import socket from "../../utils/socket";
import { addOrder } from "../../redux/slice/orderSlice";

export default function OrdersList({ type }) {
  const [modal, setModal] = useState({}); // "add" | "pay" | "print"
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const filtered = orders.filter((o) => o.orderType === type);
 
  useEffect(() => {
     socket.on("newOrder", (order) => {
      console.log(order,"userffect")
      dispatch(addOrder(order))
    });

    return () => {
      socket.off("newOrder");
    };
  },[]);
  return (
    <div className="orders-list">
      {/* Header */}
      <div className="orders-list__header">
        <div className="orders-list__title">
          {type === "takeaway" ? "Takeaway Orders" : "Dine-in Orders"}
        </div>
      </div>

      {/* Grid */}
      <div className="orders-list__grid">
        {filtered.length === 0 ? (
          <div className="orders-list__empty">No orders found</div>
        ) : (
          filtered.map((order) => (
            <OrderCard key={order.id} order={order} setModal={setModal} />
          ))
        )}
      </div>
      {modal.type === "add"   && <AddItemsModal  onClose={() => setModal({})} />}
      {modal.type === "pay"   && <PayModal order={modal.data}
      //  onPay={handlePay} 
      onClose={() => setModal({})} />}
    </div>
  );
}

//onAdd={handleAddItems}