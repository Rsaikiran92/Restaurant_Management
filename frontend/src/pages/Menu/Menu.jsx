import { useState } from "react";
import { ShoppingCart, Search, Plus, Minus, X } from "lucide-react";
import "../OrderPanel/OrderPanel.css";
import { MENU, CATS, TABLES, WAITERS } from "../../data/constants";

export default function Menu({ type, onPlace }) {
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
                    <select
                      className="order-panel__add-btn"
                      onClick={() => addItem(item)}
                    >

                      <option>available</option>
                      <option>Unavailable</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
