import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ShieldCheck,
  User,
  Users,
  Mail,
} from "lucide-react";
import "./ManageUsers.css";
import { SEED_USERS } from "../../data/constants";
import { Table } from "@chakra-ui/react";
import DeleteUserModal from "./DeleteUserModel";
import UserModal from "./UserModel";

const ROLES = ["admin", "desk", "manager", "waiter"];

const STATUS_CFG = {
  active: {
    label: "Available",
    pill: "admin-pill--available",
    card: "table-card--available",
  },
  inactive: {
    label: "Occupied",
    pill: "admin-pill--occupied",
    card: "table-card--occupied",
  },
};

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
  const [view, setView] = useState("list");

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
            <Plus size={15} /> Add User
          </button>
        </div>
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
        <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
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
      </div>

      {/* Table */}
      {view === "grid" ? (
        <div className="tables-grid">
          {filtered.map((t) => {
            const rc = ROLE_COLORS[t.role] || {};
            const cfg = STATUS_CFG[t.status];
            return (
              <div className={`table-card ${cfg.card}`}>
                <div className="table-card__header">
                  <span className="table-card__id">{t.name}</span>
                </div>
                <div>
                  <span
                    className="admin-pill"
                    style={{ background: rc.bg, color: rc.color }}
                  >
                    {t.role === "admin" && <ShieldCheck size={10} />}
                    {t.role !== "admin" && <User size={10} />}
                    {t.role.charAt(0).toUpperCase() + t.role.slice(1)}
                  </span>
                  <span className={`admin-pill ${cfg.pill}`}>{t.status}</span>
                </div>
                <div className="table-card__seats">
                  <Mail size={14} />
                  <span> {t.email}</span>
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
                            onClick={() =>
                              setModal({ type: "delete", user: u })
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

      {/* Modals */}
      {(modal?.type === "add" || modal?.type === "edit") && (
        <UserModal
          user={modal.user || null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteUserModal
          user={modal.user}
          onConfirm={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

export default ManageUsers;
