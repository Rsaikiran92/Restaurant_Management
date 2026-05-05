import { Minus, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CATS } from "../../data/constants";

function AddItemsModal({ onAdd, onClose }) {
  const [search,  setSearch]  = useState("");
  const [cat,     setCat]     = useState("All");
  const [picked,  setPicked]  = useState({});
  const { loading, menu, error } = useSelector((state) => state.menu);
  const filtered = menu.filter(
    (m) => (cat === "All" || m.category === cat) && m.name.toLowerCase().includes(search.toLowerCase())
  );

  const setQty = (id, val) => setPicked((prev) => {
    const n = Math.max(0, (prev[id] || 0) + val);
    const next = { ...prev };
    if (n === 0) delete next[id]; else next[id] = n;
    return next;
  });

  const hasItems = Object.keys(picked).length > 0;
  const totalItems = Object.values(picked).reduce((s, q) => s + q, 0);

  const handleAdd = () => {
    const toAdd = Object.entries(picked).map(([id, qty]) => {
      const item = MENU.find((m) => m.id === Number(id));
      return { itemId: Date.now() + Number(id), name: item.name, qty, price: item.price, status: "pending" };
    });
    onAdd(toAdd);
  };

  return (
    <div className="modal-overlay">
      <div className="modal add-items-modal">
        <div className="modal__header">
          <span className="modal__title">Add More Items</span>
          <button className="modal__close" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal__body">
          {/* search */}
          <div className="menu-search">
            <Search size={13} color="#a0704a" />
            <input placeholder="Search dishes…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {/* category chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding: "4px 12px", borderRadius: 20, border: "1px solid", fontFamily: "inherit",
                  borderColor: cat === c ? "#b84c00" : "#e8c9a0",
                  background: cat === c ? "#b84c00" : "#fff",
                  color: cat === c ? "#fff" : "#6b3d1e", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                {c}
              </button>
            ))}
          </div>
          {/* items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filtered.map((item) => {
              const qty = picked[item.id] || 0;
              return (
                <div key={item.id} className="menu-item-pick">
                  <div className="menu-item-pick__emoji">{item.emoji}</div>
                  <div className="menu-item-pick__info">
                    <div className="menu-item-pick__name">{item.name}</div>
                    <div className="menu-item-pick__price">₹{item.price}</div>
                  </div>
                  <div className="menu-item-pick__qty">
                    <button className="qty-btn" onClick={() => setQty(item.id, -1)} disabled={qty === 0}>
                      <Minus size={12} />
                    </button>
                    <span className="qty-num">{qty}</span>
                    <button className="qty-btn" onClick={() => setQty(item.id, 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleAdd} disabled={!hasItems}>
            Add {totalItems > 0 ? `${totalItems} item${totalItems > 1 ? "s" : ""}` : "Items"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemsModal