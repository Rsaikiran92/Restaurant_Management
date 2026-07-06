import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

const orderTotal = (order) => order.items.reduce((s, i) => s + i.menuId.price * i.quantity, 0);

function PayModal({ order, onPay, onClose }) {
  const [method, setMethod] = useState(null);
  const subtotal = orderTotal(order);
  const gst      = Math.round(subtotal * 0.05);
  const total    = subtotal + gst;
  console.log(order,"pay")
  const methods = [
    { id: "cash", label: "Cash", icon: "💵" },
    { id: "card", label: "Card", icon: "💳" },
    { id: "upi",  label: "UPI",  icon: "📱" },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal pay-modal">
        <div className="modal__header">
          <span className="modal__title">Collect Payment</span>
          <button className="modal__close" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal__body">
          {/* Bill preview */}
          <div className="pay-bill-preview">
            <div className="pay-bill-row"><span>Order</span><span style={{ fontWeight: 700 }}>{order.orderNumber}</span></div>
            <div className="pay-bill-row"><span>Customer</span><span>{order.customerNumber}</span></div>
            <div className="pay-bill-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="pay-bill-row"><span>GST (5%)</span><span>₹{gst}</span></div>
            <div className="pay-bill-row pay-bill-row--total"><span>Total Amount</span><span>₹{total}</span></div>
          </div>

          {/* Payment method */}
          <div style={{ fontWeight: 600, fontSize: 13, color: "#2d1a00" }}>Select Payment Method</div>
          <div className="pay-methods">
            {methods.map((m) => (
              <button key={m.id} className={`pay-method-btn${method === m.id ? " pay-method-btn--active" : ""}`}
                onClick={() => setMethod(m.id)}>
                <div className="pay-method-btn__icon">{m.icon}</div>
                <div className="pay-method-btn__label">{m.label}</div>
              </button>
            ))}
          </div>

          <button className="pay-confirm-btn" disabled={!method} onClick={() => onPay(method)}>
            <CheckCircle size={16} />
            {method ? `Confirm Payment via ${method.toUpperCase()}` : "Select a payment method"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayModal