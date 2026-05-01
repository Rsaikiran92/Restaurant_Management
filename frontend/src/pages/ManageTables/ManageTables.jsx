import {
  errorTable,
  loadingTable,
  successTable,
} from "../../redux/slice/tableSlice";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "../../components/ui/toaster";
import { useEffect, useState } from "react";
import DeleteTableModal from "./DeleteTableModel";
import TableModal from "./TableModel";
import API from "../../utils/api";
import "../admin.shared.css";
import "./ManageTables.css";
import { Toaster } from "@chakra-ui/react";
import Loading from "../../components/Loading";

const STATUS_CFG = {
  available: {
    label: "Available",
    pill: "admin-pill--available",
    card: "table-card--available",
  },
  occupied: {
    label: "Occupied",
    pill: "admin-pill--occupied",
    card: "table-card--occupied",
  },
  reserved: {
    label: "Reserved",
    pill: "admin-pill--reserved",
    card: "table-card--reserved",
  },
};

export default function ManageTables() {
  const [modal, setModal] = useState(null);
  const [view, setView] = useState("grid");
  const dispatch = useDispatch();
  const { loading, tables, error } = useSelector((state) => state.table);

 

  const handleSave = async (form) => {
    if (modal.type == "edit") {
      // edit user acount
      try {
        dispatch(loadingTable());
        const response = await API.put(`/table/${modal.table._id}`, form);
        dispatch(successTable(response.data.table));
        toaster.success({
          title: "Update successful",
          description: "Update data successfully to the server",
          closable: false,
          action: {
            label: "ok",
          },
        });
        setModal(null);
      } catch (err) {
        console.log(err);
        toaster.create({
          title: "Update failed",
          description: err,
          type: error,
        });
        dispatch(
          errorTable("Failed to edit user informasion. Please try again."),
        );
      }
    } else {
      // create user acount
      try {
        dispatch(loadingTable());
        const responce = await API.post("/table", form);
        dispatch(successTable(responce.data.table));
        toaster.success({
          title: "Created successful",
          description: "created acount successfully",
          closable: false,
          action: {
            label: "ok",
          },
        });
        setModal(null);
      } catch (err) {
        toaster.create({
          title: "Created Acount failed. Please try again.",
          description: err,
          type: "error",
        });
        dispatch(errorTable("Failed to create user acount. Please try again."));
      }
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(loadingTable());
      const responce = await API.delete(`/table/${modal.table._id}`);
      dispatch(successTable(responce.data.table));
      toaster.success({
        title: "Acount deleted successful",
        description: "Acount deleted successfully from the server",
        closable: false,
        action: {
          label: "ok",
        },
      });
      setModal(null);
    } catch (err) {
      toaster.create({
        title: "Acount deleted failed. Please try again.",
        description: err,
        type: error,
      });
      dispatch(errorTable("Failed to delete user acount. Please try again."));
    }
  };

  const counts = {
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page__header">
        <div className="admin-page__title-block">
          <div className="admin-page__title">Manage Tables</div>
          <div className="admin-page__subtitle">
            {tables.length} tables · {counts.available} available
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {/* View toggle */}
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
            <Plus size={15} /> Add Table
          </button>
        </div>
      </div>

      {/* Status summary */}
      <div className="tables-summary">
        {[
          {
            label: "Available",
            count: counts.available,
            color: "#2e7d32",
            bg: "#e8f5e9",
          },
          {
            label: "Occupied",
            count: counts.occupied,
            color: "#c62828",
            bg: "#fdecea",
          },
          {
            label: "Reserved",
            count: counts.reserved,
            color: "#e65100",
            bg: "#fff3e0",
          },
          {
            label: "Total",
            count: tables.length,
            color: "#b84c00",
            bg: "#fff8f0",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="tables-summary__card"
            style={{ background: s.bg }}
          >
            <div className="tables-summary__value" style={{ color: s.color }}>
              {s.count}
            </div>
            <div className="tables-summary__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Grid view */}
      {loading ? (
        <Loading />
      ) : view === "grid" ? (
        <div className="tables-grid">
          {tables.map((t) => {
            const cfg = STATUS_CFG[t.status];
            return (
              <div key={t._id} className={`table-card ${cfg.card}`}>
                <div className="table-card__header">
                  <span className="table-card__id">{t.name}</span>
                  <span className={`admin-pill ${cfg.pill}`}>{cfg.label}</span>
                </div>
                <div className="table-card__seats">
                  <Users size={14} />
                  <span>{t.capacity} seats</span>
                </div>
                <div className="table-card__actions">
                  <button
                    className="admin-table__btn admin-table__btn--edit"
                    onClick={() => setModal({ type: "edit", table: t })}
                    title="Edit"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    className="admin-table__btn admin-table__btn--delete"
                    onClick={() => setModal({ type: "delete", table: t })}
                    title="Delete"
                  >
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
                    <td style={{ fontWeight: 700 }}>{t.name}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          color: "#6b3d1e",
                        }}
                      >
                        <Users size={13} /> {t.capacity} seats
                      </div>
                    </td>
                    <td>
                      <span className={`admin-pill ${cfg.pill}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button
                          className="admin-table__btn admin-table__btn--edit"
                          onClick={() => setModal({ type: "edit", table: t })}
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          className="admin-table__btn admin-table__btn--delete"
                          onClick={() => setModal({ type: "delete", table: t })}
                        >
                          <Trash2 size={13} />
                        </button>
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
        <TableModal
          table={modal.table || null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteTableModal
          table={modal.table}
          onConfirm={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
