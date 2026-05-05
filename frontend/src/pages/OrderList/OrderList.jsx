import OrderCard from "../../components/OrderCard/OrderCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./OrdersList.css";
import AddItemsModal from "./AddItemsModel";

export default function OrdersList({ type }) {
    const [modal, setModal] = useState(null); // "add" | "pay" | "print"
  const { orders } = useSelector((state) => state.order);

  const filtered = orders.filter((o) => o.orderType === type);
  console.log(orders)

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
            <OrderCard key={order.id} order={order}  setModal={setModal}  />
          ))
        )}
      </div>
      {/* {modal === "add"   && <AddItemsModal onAdd={handleAddItems} onClose={() => setModal(null)} />} */}
    </div>
  );
}
