import { Button } from "@chakra-ui/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ROLES = ["admin", "desk", "manager", "waiter"];

function UserModal({ user, onSave, onClose }) {
  const { loading } = useSelector((state) => state.user);
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
          {loading ? (
            <Button className="btn-save" loading loadingText="Saving...">
              Click me
            </Button>
          ) : (
            <button
              className="btn-save"
              onClick={() => {
                if (form.name && form.email) onSave(form);
              }}
            >
              {isEdit ? "Save Changes" : "Add User"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserModal;
