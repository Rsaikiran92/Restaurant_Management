import { CheckCircle, X } from "lucide-react";
import { useRef, useState } from "react";
import API, { fetchOrders } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { successTable } from "../../redux/slice/tableSlice";
import { Button } from "@chakra-ui/react";
import { toaster } from "../../components/ui/toaster";

const orderTotal = (order) =>
  order.items.reduce((s, i) => s + i.menuId.price * i.quantity, 0);

function PayModal({ order, onClose ,type}) {
  const { tables } = useSelector((state) => state.table);
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const subtotal = orderTotal(order);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  
  const methods = [
    { id: "cash", label: "Cash", icon: "💵" },
    { id: "card", label: "Card", icon: "💳" },
    { id: "upi", label: "UPI", icon: "📱" },
  ];

  const handlePay = async () => {
    setLoading(true);
    try {
      await API.put(`/order/payment/${order._id}`, {
        isPaid: true,
        paymentMethod: method,
      });
      
      if(!type=="takeaway"){
        const table_id=tables.filter((item)=>item.name===order.tableNumber)[0]._id
        console.log(table_id,"table")
        const response = await API.put(`/table/${table_id}`, {status: "available"});
        dispatch(successTable(response.data.table));
      }
      fetchOrders(dispatch);
      setLoading(false)
      onClose();
      toaster.success({
        title: "Payment successful",
        description: "Update data successfully to the server",
        closable: false,
        action: {
          label: "ok",
        },
      });
      
    } catch (err) {
      console.log(err);
      toaster.error({
        title: "Update failed",
        description: err,
        closable: false,
        action: {
          label: "ok",
        },
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal pay-modal">
        <div className="modal__header">
          <span className="modal__title">Collect Payment</span>
          <button className="modal__close" onClick={onClose} disabled={loading}>
            <X size={14} />
          </button>
        </div>
        <div className="modal__body">
          {/* Bill preview */}
          <div className="pay-bill-preview">
            <div className="pay-bill-row">
              <span>Order</span>
              <span style={{ fontWeight: 700 }}>{order.orderNumber}</span>
            </div>
            <div className="pay-bill-row">
              <span>Customer</span>
              <span>{order.customerNumber}</span>
            </div>
            <div className="pay-bill-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="pay-bill-row">
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="pay-bill-row pay-bill-row--total">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Payment method */}
          <div style={{ fontWeight: 600, fontSize: 13, color: "#2d1a00" }}>
            Select Payment Method
          </div>
          <div className="pay-methods">
            {methods.map((m) => (
              <button
                key={m.id}
                className={`pay-method-btn${method === m.id ? " pay-method-btn--active" : ""}`}
                onClick={() => setMethod(m.id)}
              >
                <div className="pay-method-btn__icon">{m.icon}</div>
                <div className="pay-method-btn__label">{m.label}</div>
              </button>
            ))}
          </div>

          <Button
            loading={loading}
            className="pay-confirm-btn"
            disabled={!method}
            onClick={handlePay}
          >
            <CheckCircle size={16} />
            {method
              ? `Confirm Payment via ${method.toUpperCase()}`
              : "Select a payment method"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PayModal;
