import React from "react";

const Bill = React.forwardRef(({ order, restaurantName = "Spice Garden" }, ref) => {
    console.log(order)
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "320px",
        margin: "0 auto",
        padding: "28px 24px",
        background: "#fdf8f3",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#2d1a00",
        overflow: "hidden",
        border: "1px solid #e8d9c5",
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-32deg)",
          fontSize: "42px",
          fontWeight: 700,
          letterSpacing: "4px",
          color: "#b84c00",
          opacity: 0.06,
          whiteSpace: "nowrap",
          textTransform: "uppercase",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {restaurantName} &nbsp; {restaurantName}
      </div>

      {/* Content sits above watermark */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              letterSpacing: "1px",
              color: "#b84c00",
              textTransform: "uppercase",
            }}
          >
            {restaurantName}
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#7c3d0a" }}>
            Fine Indian Dining
          </p>
        </div>

     

        {/* Order meta */}
        <div style={{ fontSize: "12px", lineHeight: 1.7, margin: "10px 0" }}>
          <Row label="Order No" value={order.orderNumber} />
          <Row label="Table" value={order.tableNumber} />
          <Row label="Date" value={order.orderDate} />
        </div>

        {/* Items */}
        <table width="100%" style={{ borderCollapse: "collapse", fontSize: "12px", margin: "10px 0" }}>
          <thead>
            <tr style={{ borderBottom: "1px dashed #b84c00",borderTop:"1px dashed #b84c00" }}>
              <th style={{ textAlign: "left", padding: "6px 0", color: "#3d1a00" }}>Item</th>
              <th style={{ textAlign: "center", padding: "6px 0", color: "#3d1a00" }}>Qty</th>
              <th style={{ textAlign: "right", padding: "6px 0", color: "#3d1a00" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item._id}>
                <td style={{ padding: "4px 0" }}>{item.menuId.name}</td>
                <td style={{ textAlign: "center", padding: "4px 0" }}>{item.quantity}</td>
                <td style={{ textAlign: "right", padding: "4px 0" }}>
                  ₹{item.menuId.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Dashed />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "4px 0",
            fontSize: "12px", margin: "5px 0"
          }}
        >
          <span>
            Subtotal
          </span>
          <span >
            ₹{order.totalAmount}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", 
          
            fontSize: "12px"        
          }}
        >
          <span>
            GST (5%)
          </span>
          <span >
            ₹{order.totalAmount}
          </span>
        </div>
        {/* Total */}
       
        <div
       
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "5px 0",
            padding:"4px 0",
            borderBottom: "1px dashed #b84c00",borderTop:"1px dashed #b84c00" 
          }}
        >
          <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.5px" }}>
            TOTAL
          </span>
          <span style={{ fontSize: "16px", fontWeight: 700 }}>
            ₹{order.totalAmount}
          </span>
        </div>
 
        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: "12px", margin: "16px 0 0", color: "#7c3d0a" }}>
          Thank You! Visit Again 😊
        </p>
      </div>
    </div>
  );
});

const Row = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span style={{ color: "#7c3d0a" }}>{label}</span>
    <span style={{ fontWeight: 600 }}>{value}</span>
  </div>
);

const Dashed = () => (
  <div style={{ borderTop: "1px dashed #b84c00", opacity: 0.5 }} />
);

export default Bill;