import { Trash2, X } from "lucide-react";

function DeleteTableModal({ table, onConfirm, onClose }) {
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

export default DeleteTableModal