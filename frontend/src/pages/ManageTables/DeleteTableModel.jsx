import { Button } from "@chakra-ui/react";
import { Trash2, X } from "lucide-react";
import { useSelector } from "react-redux";

function DeleteTableModal({ table, onConfirm, onClose }) {
   const { loading } = useSelector((state) => state.table);
  return (
    <div className="modal-overlay">
      <div className="modal modal--confirm" style={{ maxWidth: 380 }}>
        <div className="modal__header">
          <span className="modal__title">Remove Table</span>
          <button className="modal__close" disabled={loading} onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal__body">
          <div className="confirm-icon"><Trash2 size={24} color="#c62828" /></div>
          <div className="confirm-title">Remove {table.name}?</div>
          <div className="confirm-desc">This table will be removed from the floor plan and will no longer be assignable to orders.</div>
        </div>
        <div className="modal__footer">
          <button className="btn-cancel" disabled={loading} onClick={onClose}>Cancel</button>
          <Button className="btn-delete" loading={loading} onClick={onConfirm}>Remove Table</Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTableModal