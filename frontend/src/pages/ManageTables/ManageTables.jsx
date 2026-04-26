import { useState } from "react";
import { Plus, Pencil, Trash2, X, Users } from "lucide-react";
import "../admin.shared.css";
import "./ManageTables.css";
import { SEED_TABLES } from "../../data/constants";

const STATUSES = ["available", "occupied", "reserved"];

function TableModal({ table, onSave, onClose }) {
  const [form, setForm] = useState(
    table || { id: "", capacity: 4, status: "available" }
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
              <input value={form.id} onChange={(e) => set("id", e.target.value)}
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
            onClick={() => { if (form.id && form.capacity) onSave(form); }}>
            {table ? "Save Changes" : "Add Table"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ table, onConfirm, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal modal--confirm" style={{ maxWidth: 380 }}>
        <div className="modal__header">
          <span className="modal__title">Remove Table</span>
          <button className="modal__close" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal__body">
          <div className="confirm-icon"><Trash2 size={24} color="#c62828" /></div>
          <div className="confirm-title">Remove {table.id}?</div>
          <div className="confirm-desc">This table will be removed from the floor plan and will no longer be assignable to orders.</div>
        </div>
        <div className="modal__footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-delete" onClick={onConfirm}>Remove Table</button>
        </div>
      </div>
    </div>
  );
}

const STATUS_CFG = {
  available: { label: "Available", pill: "admin-pill--available", card: "table-card--available" },
  occupied:  { label: "Occupied",  pill: "admin-pill--occupied",  card: "table-card--occupied"  },
  reserved:  { label: "Reserved",  pill: "admin-pill--reserved",  card: "table-card--reserved"  },
};

export default function ManageTables() {
  const [tables, setTables] = useState(SEED_TABLES);
  const [modal, setModal]   = useState(null);
  const [view, setView]     = useState("grid"); // "grid" | "list"

  const handleSave = (form) => {
    if (modal.table) {
      setTables((prev) => prev.map((t) => t.id === modal.table.id ? { ...t, ...form } : t));
    } else {
      setTables((prev) => [...prev, form]);
    }
    setModal(null);
  };

  const handleDelete = () => {
    setTables((prev) => prev.filter((t) => t.id !== modal.table.id));
    setModal(null);
  };

  const counts = {
    available: tables.filter((t) => t.status === "available").length,
    occupied:  tables.filter((t) => t.status === "occupied").length,
    reserved:  tables.filter((t) => t.status === "reserved").length,
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page__header">
        <div className="admin-page__title-block">
          <div className="admin-page__title">Manage Tables</div>
          <div className="admin-page__subtitle">{tables.length} tables · {counts.available} available</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {/* View toggle */}
          <div style={{ display: "flex", background: "#fff", border: "1px solid #e8c9a0", borderRadius: 9, overflow: "hidden" }}>
            {["grid","list"].map((v) => (
              <button key={v} onClick={() => setView(v)}
                style={{ padding: "7px 14px", border: "none", cursor: "pointer", fontFamily: "inherit",
                  fontSize: 12, fontWeight: 600, transition: "background 0.12s",
                  background: view === v ? "#b84c00" : "transparent",
                  color: view === v ? "#fff" : "#6b3d1e" }}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <button className="admin-page__add-btn" onClick={() => setModal({ type: "add" })}>
            <Plus size={15} /> Add Table
          </button>
        </div>
      </div>

      {/* Status summary */}
      <div className="tables-summary">
        {[
          { label: "Available", count: counts.available, color: "#2e7d32", bg: "#e8f5e9" },
          { label: "Occupied",  count: counts.occupied,  color: "#c62828", bg: "#fdecea" },
          { label: "Reserved",  count: counts.reserved,  color: "#e65100", bg: "#fff3e0" },
          { label: "Total",     count: tables.length,    color: "#b84c00", bg: "#fff8f0" },
        ].map((s) => (
          <div key={s.label} className="tables-summary__card" style={{ background: s.bg }}>
            <div className="tables-summary__value" style={{ color: s.color }}>{s.count}</div>
            <div className="tables-summary__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Grid view */}
      {view === "grid" ? (
        <div className="tables-grid">
          {tables.map((t) => {
            const cfg = STATUS_CFG[t.status];
            return (
              <div key={t.id} className={`table-card ${cfg.card}`}>
                <div className="table-card__header">
                  <span className="table-card__id">{t.id}</span>
                  <span className={`admin-pill ${cfg.pill}`}>{cfg.label}</span>
                </div>
                <div className="table-card__seats">
                  <Users size={14} />
                  <span>{t.capacity} seats</span>
                </div>
                <div className="table-card__actions">
                  <button className="admin-table__btn admin-table__btn--edit"
                    onClick={() => setModal({ type: "edit", table: t })} title="Edit">
                    <Pencil size={13} />
                  </button>
                  <button className="admin-table__btn admin-table__btn--delete"
                    onClick={() => setModal({ type: "delete", table: t })} title="Delete">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List view */
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Table ID</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((t) => {
                const cfg = STATUS_CFG[t.status];
                return (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700 }}>{t.id}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#6b3d1e" }}>
                        <Users size={13} /> {t.capacity} seats
                      </div>
                    </td>
                    <td><span className={`admin-pill ${cfg.pill}`}>{cfg.label}</span></td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-table__btn admin-table__btn--edit"
                          onClick={() => setModal({ type: "edit", table: t })}><Pencil size={13} /></button>
                        <button className="admin-table__btn admin-table__btn--delete"
                          onClick={() => setModal({ type: "delete", table: t })}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {(modal?.type === "add" || modal?.type === "edit") && (
        <TableModal table={modal.table || null} onSave={handleSave} onClose={() => setModal(null)} />
      )}
      {modal?.type === "delete" && (
        <DeleteModal table={modal.table} onConfirm={handleDelete} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
