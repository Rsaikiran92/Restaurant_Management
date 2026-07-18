import OrderCard from "../../components/OrderCard/OrderCard";
import AddItemsModal from "./AddItemsModel";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import "./OrdersList.css";
import PayModal from "./PayModel";
import socket from "../../utils/socket";
import { addOrder, successOrder } from "../../redux/slice/orderSlice";
import { fetchMenu, fetchOrders } from "../../utils/api";
import playNotificationSound from "../../components/playNotificationSound";
import { UserContext } from "../../contextAPI/UserContextapi";
import Loading from "../../components/Loading";


export default function OrdersList({ type }) {
  const [modal, setModal] = useState({}); // "add" | "pay" | "print"
  const { loading,orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const filtered = orders.filter((o) => o.orderType === type);
  const {data}=useContext(UserContext)

  useEffect(() => {
    fetchOrders(dispatch);
    fetchMenu(dispatch);
  }, []);

  useEffect(() => {
    socket.on("newOrder", (order) => {
      fetchOrders(dispatch)
    });
    socket.on("addItems",()=>{
      fetchOrders(dispatch);
    })
    socket.on("itemStatus", ({order,status}) => {
      fetchOrders(dispatch);
      if(order.createdBy==data.id && status=="ready"){
        playNotificationSound()
      }
      // playNotificationSound()
    });
    socket.on("orderPayment",()=>{
      fetchOrders(dispatch)
    })
    return () => {
      socket.off("newOrder");
      socket.off("addItems");
      socket.off("itemStatus");
      socket.off("orderPayment");
    };
  }, []);
  
 
  return (
    <div className="orders-list">
      {/* Header */}
      <div className="orders-list__header">
        <div className="orders-list__title">
          {type === "takeaway" ? "Takeaway Orders" : "Dine-in Orders"}
        </div>
      </div>

      {/* Grid */}
      {loading?<Loading/>:
      <div className="orders-list__grid">
        {filtered.length === 0 ? (
          <div className="orders-list__empty">No orders found</div>
        ) : (
          filtered.map((order) => <OrderCard key={order.id} order={order} setModal={setModal} key={order._id} />)
        )}
      </div>}
      {modal.type === "add" && <AddItemsModal id={modal.id} onClose={() => setModal({})} />}
      {modal.type === "pay" && <PayModal order={modal.data} type={type} onClose={() => setModal({})} />}
    </div>
  );
}

//onAdd={handleAddItems}
