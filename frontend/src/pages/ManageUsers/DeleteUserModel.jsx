import { Trash2, X } from "lucide-react";

function DeleteUserModal({ user, onConfirm, onClose }) {
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

export default DeleteUserModal