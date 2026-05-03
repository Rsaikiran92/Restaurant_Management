import OrderCard from "../../components/OrderCard/OrderCard";
import { SEED_ORDERS } from "../../data/constants";
import OrderBox from "./OrderBox";

const KitchenDashboard = () => {
  return (
    <div style={{height:"100vh",padding:"20px"}}>
    <div style={{display:"grid",gap:"15px",gridTemplateColumns:"repeat(4,1fr)"}}>
      {SEED_ORDERS.map((order) => (
        <OrderBox key={order.id} order={order} />
      ))}
    </div>
    </div>
  );
};
export default KitchenDashboard;
