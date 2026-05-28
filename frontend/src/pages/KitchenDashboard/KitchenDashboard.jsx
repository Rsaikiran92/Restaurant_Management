import {addOrder} from "../../redux/slice/orderSlice";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderBox from "./OrderBox";
import API from "../../utils/api";
import socket from "../../utils/socket";

const KitchenDashboard = () => {
  const dispatch = useDispatch();
  const {orders}=useSelector((state)=>state.order)

  useEffect(() => {
     socket.on("newOrder", (order) => {
      dispatch(addOrder(order))
    });

    return () => {
      socket.off("newOrder");
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
