import { X } from "lucide-react";
import { useState } from "react";
import { CATS } from "../../data/constants";

function MenuModal({ item, onSave, onClose }) {
  const [form, setForm] = useState(
    item || {
      name: "",
      category: "Mains",
      price: "",
      description: "",
      isAvailable: true,
    },
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <span className="modal__title">
            {item ? "Edit Menu Item" : "Add Menu Item"}
          </span>
          <button className="modal__close" onClick={onClose}>
            <X size={14} />
          </button>
        </div>
        <div className="modal__body">
          <div className="form-row">
            <div className="form-group">
              <label>Item Name *</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Butter Chicken"
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {CATS.filter((c) => c !== "All").map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="e.g. 220"
              />
            </div>
            <div className="form-group">
              <label>Availability</label>
              <select
                value={form.isAvailable ? "yes" : "no"}
                onChange={(e) => set("isAvailable", e.target.value === "yes")}
              >
                <option value="yes" >Available</option>
                <option value="no">Unavailable</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Short description of the dish…"
              style={{ resize: "none" }}
            />
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-save"
            onClick={() => {
              if (form.name && form.price) onSave(form);
            }}
          >
            {item ? "Save Changes" : "Add Item"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuModal