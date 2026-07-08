import {addOrder, successOrder} from "../../redux/slice/orderSlice";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderBox from "./OrderBox";
import API, { fetchOrders } from "../../utils/api";
import socket from "../../utils/socket";

const KitchenDashboard = () => {
  const dispatch = useDispatch();
  const {orders}=useSelector((state)=>state.order)

  const filter=orders.filter(order =>
  order.items.every(item => item.status !== "served")
  )
 

  useEffect(()=>{
    fetchOrders(dispatch);
  },[])
  
  useEffect(() => {
     socket.on("newOrder", (order) => {
      dispatch(addOrder(order))
    });
    socket.on("addItems",(order)=>{
      console.log(order,"kitch")
      dispatch(successOrder(order))
    })
    return () => {
      socket.off("newOrder");
      socket.off("addItems")
    };
  },[]);


  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <div
        style={{
          display: "grid",
          gap: "15px",
          gridTemplateColumns: "repeat(4,1fr)",
        }}
      >
        {orders.map((order) => (
          <OrderBox key={order._id}  order={order} />
        ))}
      </div>
    </div>
  );
};
export default KitchenDashboard;
