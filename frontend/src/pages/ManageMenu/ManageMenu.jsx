import { useState } from "react";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import "../admin.shared.css";
import { MENU, CATS } from "../../data/constants";
import { Table } from "@chakra-ui/react";

const EMOJIS = [
  "🍛",
  "🧀",
  "🍚",
  "🫘",
  "🫓",
  "🍗",
  "☕",
  "🥭",
  "🍮",
  "🍼",
  "🥟",
  "🍱",
  "🥗",
  "🍜",
  "🫕",
];

function MenuModal({ item, onSave, onClose }) {
  const [form, setForm] = useState(
    item || {
      name: "",
      category: "Mains",
      price: "",
      emoji: "🍛",
      desc: "",
      available: true,
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
                value={form.available ? "yes" : "no"}
                onChange={(e) => set("available", e.target.value === "yes")}
              >
                <option value="yes">Available</option>
                <option value="no">Unavailable</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={2}
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
              placeholder="Short description of the dish…"
              style={{ resize: "none" }}
            />
          </div>
          <div className="form-group">
            <label>Emoji Icon</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 4,
              }}
            >
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => set("emoji", e)}
                  style={{
                    fontSize: 20,
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: "1.5px solid",
                    borderColor: form.emoji === e ? "#b84c00" : "#e8c9a0",
                    background: form.emoji === e ? "#fff8f0" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
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

function DeleteModal({ item, onConfirm, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal modal--confirm" style={{ maxWidth: 380 }}>
        <div className="modal__header">
          <span className="modal__title">Remove Menu Item</span>
          <button className="modal__close" onClick={onClose}>
            <X size={14} />
          </button>
        </div>
        <div className="modal__body">
          <div className="confirm-icon">
            <Trash2 size={24} color="#c62828" />
          </div>
          <div className="confirm-title">Remove "{item.name}"?</div>
          <div className="confirm-desc">
            This item will be removed from the menu and will no longer be
            available for new orders.
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-delete" onClick={onConfirm}>
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
}

const CAT_COLORS = {
  Starters: { bg: "#fdecea", color: "#c62828" },
  Mains: { bg: "#fff3e0", color: "#e65100" },
  Breads: { bg: "#fff8e1", color: "#f57f17" },
  Drinks: { bg: "#e3f2fd", color: "#1565c0" },
  Desserts: { bg: "#f3e5f5", color: "#6a1b9a" },
};

export default function ManageMenu() {
  const [items, setItems] = useState(
    MENU.map((m) => ({ ...m, available: true })),
  );
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modal, setModal] = useState(null);

  const filtered = items.filter(
    (m) =>
      (catFilter === "All" || m.category === catFilter) &&
      m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = (form) => {
    if (modal.item) {
      setItems((prev) =>
        prev.map((m) =>
          m.id === modal.item.id
            ? { ...m, ...form, price: Number(form.price) }
            : m,
        ),
      );
    } else {
      setItems((prev) => [
        ...prev,
        { ...form, id: Date.now(), price: Number(form.price) },
      ]);
    }
    setModal(null);
  };

  const handleDelete = () => {
    setItems((prev) => prev.filter((m) => m.id !== modal.item.id));
    setModal(null);
  };

  return (
    <div className="admin-page" style={{ height: "90vh" }}>
      <div className="admin-page__header">
        <div className="admin-page__title-block">
          <div className="admin-page__title">Manage Menu</div>
          <div className="admin-page__subtitle">
            {items.length} items {CATS.length - 1} categories
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              display: "flex",
              background: "#fff",
              border: "1px solid #e8c9a0",
              borderRadius: 9,
              overflow: "hidden",
            }}
          >
            {["grid", "list"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "7px 14px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 12,
                  fontWeight: 600,
                  transition: "background 0.12s",
                  background: view === v ? "#b84c00" : "transparent",
                  color: view === v ? "#fff" : "#6b3d1e",
                }}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <button
            className="admin-page__add-btn"
            onClick={() => setModal({ type: "add" })}
          >
            <Plus size={15} /> Add Item
          </button>
        </div>
      </div>

      <div className="admin-page__toolbar">
        <div className="admin-page__search">
          <Search size={14} color="#a0704a" />
          <input
            placeholder="Search menu items…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="admin-page__filter-select"
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
        >
          {CATS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {view === "grid" ? (
        <div className="tables-grid">
          {filtered.map((t) => {
            // const rc = ROLE_COLORS[t.role] || {};
            // const cfg = STATUS_CFG[t.status];
            return (
              <div className={`table-card `}>
                <div className="table-card__header">
                  <span className="table-card__id">{t.name}</span>
                </div>
                <div>
                  {/* <span
                    className="admin-pill"
                    // style={{ background: rc.bg, color: rc.color }}
                  >
                    {t.role === "admin" && <ShieldCheck size={10} />}
                    {t.role !== "admin" && <User size={10} />}
                    {t.role.charAt(0).toUpperCase() + t.role.slice(1)}
                  </span> */}
                  <span className={`admin-pill `}>{t.available ? "Available" : "Unavailable"}</span>
                </div>
                <div className="table-card__seats">
                  
                  <span> </span>
                </div>
                <div className="table-card__actions">
                  <button
                    className="admin-table__btn admin-table__btn--edit"
                    title="Edit"
                    onClick={() => setModal({ type: "edit", user: t })}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    className="admin-table__btn admin-table__btn--delete"
                    title="Delete"
                    onClick={() => setModal({ type: "delete", user: t })}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Table.ScrollArea borderWidth="1px" maxW="100%" className="users-table">
          <Table.Root
            size="sm"
            variant="outline"
            css={{
              "& [data-sticky]": {
                position: "sticky",
                zIndex: 1,
                bg: "#fdf0e0",
              },

              "& [data-sticky=end]": {
                bg: "white",
              },
            }}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>#</Table.ColumnHeader>
                <Table.ColumnHeader data-sticky minW="100px" left="0">
                  Item
                </Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader>Price</Table.ColumnHeader>
                <Table.ColumnHeader>Description</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Action</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filtered.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6} className="admin-table__empty">
                    No menu items found
                  </Table.Cell>
                </Table.Row>
              ) : (
                filtered.map((m, i) => {
                  const cc = CAT_COLORS[m.category] || {};
                  return (
                    <Table.Row key={m.id}>
                      <Table.Cell style={{ color: "#a0704a", fontWeight: 600 }}>
                        {i + 1}
                      </Table.Cell>
                      <Table.Cell data-sticky="end" left={0}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span style={{ fontSize: 22 }}>{m.emoji}</span>
                          <span style={{ fontWeight: 600 }}>{m.name}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className="admin-pill"
                          style={{ background: cc.bg, color: cc.color }}
                        >
                          {m.category}
                        </span>
                      </Table.Cell>
                      <Table.Cell style={{ fontWeight: 700, color: "#b84c00" }}>
                        ₹{m.price}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          color: "#6b3d1e",
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.desc}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={`admin-pill ${m.available ? "admin-pill--active" : "admin-pill--inactive"}`}
                        >
                          {m.available ? "Available" : "Unavailable"}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="admin-table__actions">
                          <button
                            className="admin-table__btn admin-table__btn--edit"
                            onClick={() => setModal({ type: "edit", item: m })}
                            title="Edit"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            className="admin-table__btn admin-table__btn--delete"
                            onClick={() =>
                              setModal({ type: "delete", item: m })
                            }
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      )}

      {(modal?.type === "add" || modal?.type === "edit") && (
        <MenuModal
          item={modal.item || null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteModal
          item={modal.item}
          onConfirm={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
