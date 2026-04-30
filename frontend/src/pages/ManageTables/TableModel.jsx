import { X } from "lucide-react";
import { useState } from "react";

const STATUSES = ["available", "occupied", "reserved"];

function TableModal({ table, onSave, onClose }) {
  const [form, setForm] = useState(
    table || { name: "", capacity: 4, status: "available" }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <span className="modal__title">{table ? "Edit Table" : "Add New Table"}</span>
          <button className="modal__close" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal__body">
          <div className="form-row">
            <div className="form-group">
              <label>Table ID *</label>
              <input value={form.id} onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. T-11" disabled={!!table} />
            </div>
            <div className="form-group">
              <label>Capacity (seats) *</label>
              <input type="number" min="1" max="20" value={form.capacity}
                onChange={(e) => set("capacity", Number(e.target.value))} />
            </div>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save"
            onClick={() => { if (form.name && form.capacity) onSave(form); }}>
            {table ? "Save Changes" : "Add Table"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TableModal