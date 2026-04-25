import { useState } from "react";
import { ShoppingCart, Search, Plus, Minus, X } from "lucide-react";
import "./OrderPanel.css";
import { MENU, CATS, TABLES, WAITERS } from "../../data/constants";

export default function OrderPanel({ type, onPlace }) {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [table, setTable] = useState("T-1");
  const [waiter, setWaiter] = useState("Rajan");
  const [cart, setCart] = useState([]);

  const filteredMenu = MENU.filter(
    (m) =>
      (cat === "All" || m.category === cat) &&
      m.name.toLowerCase().includes(query.toLowerCase()),
  );

  const addItem = (item) =>
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      return existing
        ? prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
        : [...prev, { ...item, qty: 1 }];
    });

  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0),
    );

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  const canPlace =
    cart.length > 0 && (type === "dine" ? table && waiter : name.trim());

  const handlePlace = () => {
    onPlace({ name, phone, table, waiter });
    setName("");
    setPhone("");
  };

  return (
    <div className="order-panel">
      {/* ── Menu ── */}
      <div className="order-panel__menu">
        {/* Search */}
        <div className="order-panel__search-bar">
          <Search size={13} color="#a0704a" />
          <input
            className="order-panel__search-input"
            placeholder="Search dishes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Category chips */}
        <div className="order-panel__cats">
          {CATS.map((c) => (
            <button
              key={c}
              className={`order-panel__cat-btn${cat === c ? " order-panel__cat-btn--active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="order-panel__menu-grid">
          {filteredMenu.map((item) => {
            const inCart = cart.find((c) => c.id === item.id);
            return (
              <div key={item.id} className="order-panel__menu-card">
                <div className="order-panel__menu-emoji">{item.emoji}</div>
                <div className="order-panel__menu-body">
                  <div className="order-panel__menu-name">{item.name}</div>
                  <div className="order-panel__menu-desc">{item.desc}</div>
                  <div className="order-panel__menu-footer">
                    <span className="order-panel__menu-price">
                      ₹{item.price}
                    </span>
                    {inCart ? (
                      <div className="order-panel__qty">
                        <button
                          className="order-panel__qty-btn"
                          onClick={() => updateQty(item.id, -1)}
                        >
                          <Minus size={10} />
                        </button>
                        <span className="order-panel__qty-num">
                          {inCart.qty}
                        </span>
                        <button
                          className="order-panel__qty-btn"
                          onClick={() => addItem(item)}
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="order-panel__add-btn"
                        onClick={() => addItem(item)}
                      >
                        <Plus size={12} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Cart ── */}
      <div className="order-panel__cart">
        <div className="order-panel__cart-title">
          {type === "takeaway" ? "Takeaway Details" : "Dine-in Details"}
        </div>

        {/* Form */}
        <div className="order-panel__form-box">
          {type === "takeaway" ? (
            <>
              <input
                className="order-panel__input"
                placeholder="Customer Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="order-panel__input"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </>
          ) : (
            <>
              <div className="order-panel__form-label">Select Table</div>
              <div className="order-panel__table-grid">
                {TABLES.map((t) => (
                  <button
                    key={t}
                    className={`order-panel__table-btn ${
                      table === t
                        ? "order-panel__table-btn--active"
                        : "order-panel__table-btn--inactive"
                    }`}
                    onClick={() => setTable(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="order-panel__form-label" style={{ marginTop: 6 }}>
                Assign Waiter
              </div>
              <select
                className="order-panel__input"
                value={waiter}
                onChange={(e) => setWaiter(e.target.value)}
              >
                {WAITERS.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
              <input
                className="order-panel__input"
                placeholder="Customer name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}
        </div>

        {/* Cart label */}
        <div className="order-panel__cart-label">
          Cart{" "}
          {totalQty > 0 && (
            <span className="order-panel__cart-count">({totalQty} items)</span>
          )}
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div className="order-panel__empty">
            <ShoppingCart size={26} color="#d4a87a" />
            <span className="order-panel__empty-text">
              Add items from the menu
            </span>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="order-panel__cart-items">
              {cart.map((item) => (
                <div key={item.id} className="order-panel__cart-item">
                  <div className="order-panel__cart-item-info">
                    <div className="order-panel__cart-item-name">
                      {item.name}
                    </div>
                    <div className="order-panel__cart-item-price">
                      ₹{item.price} × {item.qty} ={" "}
                      <b>₹{item.price * item.qty}</b>
                    </div>
                  </div>
                  <div className="order-panel__qty">
                    <button
                      className="order-panel__qty-btn"
                      onClick={() => updateQty(item.id, -1)}
                    >
                      <Minus size={10} />
                    </button>
                    <span className="order-panel__qty-num">{item.qty}</span>
                    <button
                      className="order-panel__qty-btn"
                      onClick={() => updateQty(item.id, 1)}
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                  <button
                    className="order-panel__remove-btn"
                    onClick={() => updateQty(item.id, -item.qty)}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="order-panel__summary">
              <div className="order-panel__summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="order-panel__summary-row">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="order-panel__summary-row order-panel__summary-row--total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button
                className="order-panel__place-btn"
                onClick={handlePlace}
                disabled={!canPlace}
              >
                Place {type === "takeaway" ? "Takeaway" : "Dine-in"} Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
