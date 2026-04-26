import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ShieldCheck,
  User,
} from "lucide-react";
import "./ManageUsers.css"
import { SEED_USERS } from "../../data/constants";
import { Table } from "@chakra-ui/react";

const ROLES = ["admin", "desk", "manager", "waiter"];

function UserModal({ user, onSave, onClose }) {
  const [form, setForm] = useState(
    user || {
      name: "",
      email: "",
      role: "desk",
      password: "",
      status: "active",
    },
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const isEdit = !!user;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <span className="modal__title">
            {isEdit ? "Edit User" : "Add New User"}
          </span>
          <button className="modal__close" onClick={onClose}>
            <X size={14} />
          </button>
        </div>
        <div className="modal__body">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Rajan Kumar"
              />
            </div>
            <div className="form-group">
              <label>Role *</label>
              <select
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="user@spice.in"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{isEdit ? "New Password" : "Password *"}</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder={isEdit ? "Leave blank to keep" : "Min 6 chars"}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
              if (form.name && form.email) onSave(form);
            }}
          >
            {isEdit ? "Save Changes" : "Add User"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ user, onConfirm, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal modal--confirm" style={{ maxWidth: 380 }}>
        <div className="modal__header">
          <span className="modal__title">Delete User</span>
          <button className="modal__close" onClick={onClose}>
            <X size={14} />
          </button>
        </div>
        <div className="modal__body">
          <div className="confirm-icon">
            <Trash2 size={24} color="#c62828" />
          </div>
          <div className="confirm-title">Delete "{user.name}"?</div>
          <div className="confirm-desc">
            This action cannot be undone. The user will lose access to the
            system immediately.
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-delete" onClick={onConfirm}>
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}

const ROLE_COLORS = {
  admin: { bg: "#f3e5f5", color: "#6a1b9a" },
  desk: { bg: "#e3f2fd", color: "#1565c0" },
  manager: { bg: "#fff3e0", color: "#e65100" },
  waiter: { bg: "#e8f5e9", color: "#2e7d32" },
};

function ManageUsers() {
  const [users, setUsers] = useState(SEED_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [modal, setModal] = useState(null); // null | { type: "add"|"edit"|"delete", user? }

  const filtered = users.filter(
    (u) =>
      (roleFilter === "all" || u.role === roleFilter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())),
  );

  const handleSave = (form) => {
    if (modal.user) {
      setUsers((prev) =>
        prev.map((u) => (u.id === modal.user.id ? { ...u, ...form } : u)),
      );
    } else {
      setUsers((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setModal(null);
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== modal.user.id));
    setModal(null);
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page__header">
        <div className="admin-page__title-block">
          <div className="admin-page__title">Manage Users</div>
          <div className="admin-page__subtitle">
            {users.length} staff accounts
          </div>
        </div>
        <button
          className="admin-page__add-btn"
          onClick={() => setModal({ type: "add" })}
        >
          <Plus size={15} /> Add User
        </button>
      </div>

      {/* Toolbar */}
      <div className="admin-page__toolbar">
        <div className="admin-page__search">
          <Search size={14} color="#a0704a" />
          <input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="admin-page__filter-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
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
                bg:"white",
            },
          }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>#</Table.ColumnHeader>
              <Table.ColumnHeader data-sticky minW="160px" left="0">
                Name
              </Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Role</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6} className="admin-table__empty">
                  No users found
                </Table.Cell>
              </Table.Row>
            ) : (
              filtered.map((u, i) => {
                const rc = ROLE_COLORS[u.role] || {};
                return (
                  <Table.Row key={u.id}>
                    <Table.Cell style={{ color: "#a0704a", fontWeight: 600 }}>
                      {i + 1}
                    </Table.Cell>
                    <Table.Cell data-sticky="end" left="0">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: rc.bg,
                            color: rc.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 12,
                            flexShrink: 0,
                          }}
                        >
                          {u.name[0].toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600 }}>{u.name}</span>
                      </div>
                    </Table.Cell>
                    <Table.Cell style={{ color: "#6b3d1e" }}>
                      {u.email}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className="admin-pill"
                        style={{ background: rc.bg, color: rc.color }}
                      >
                        {u.role === "admin" && <ShieldCheck size={10} />}
                        {u.role !== "admin" && <User size={10} />}
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className={`admin-pill admin-pill--${u.status}`}>
                        {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="admin-table__actions">
                        <button
                          className="admin-table__btn admin-table__btn--edit"
                          onClick={() => setModal({ type: "edit", user: u })}
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          className="admin-table__btn admin-table__btn--delete"
                          onClick={() => setModal({ type: "delete", user: u })}
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

      {/* Modals */}
      {(modal?.type === "add" || modal?.type === "edit") && (
        <UserModal
          user={modal.user || null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteModal
          user={modal.user}
          onConfirm={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

export default ManageUsers;
