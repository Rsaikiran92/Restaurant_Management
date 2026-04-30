import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import "../admin.shared.css";
import { CATS } from "../../data/constants";
import { Table, Toaster } from "@chakra-ui/react";
import API from "../../utils/api";
import {
  loadingMenu,
  successMenu,
  errorMenu,
} from "../../redux/slice/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import MenuModal from "./MenuModel";
import { toaster } from "../../components/ui/toaster";

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
  const dispatch = useDispatch();
  const { loading, menu, error } = useSelector((state) => state.menu);
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(loadingMenu());
        const responce = await API.get("/menu");
        dispatch(successMenu(responce.data));
      } catch (err) {
        dispatch(errorMenu("Failed to get users data. Please try again."));
      }
    }
    fetchData();
  }, []);

  const filtered = menu.filter(
    (m) =>
      (catFilter === "All" || m.category === catFilter) &&
      m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = async (form) => {
    if (modal.item) {
      try {
        dispatch(loadingMenu());
        const responce = await API.put(`/menu/${modal.item._id}`, form);
        dispatch(successMenu(responce.data.menu));
        setModal(null);
      } catch (error) {
        console.log(error);
        dispatch(error("Failed to edit item"));
      }
    } else {
      try {
        dispatch(loadingMenu());
        const responce = await API.post("/menu", form);
        dispatch(successMenu(responce.data));
        setModal(null);
      } catch (error) {
        console.log(error);
        dispatch(error("Failed to create menu"));
      }
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(loadingMenu());
      const responce = await API.delete(`/menu/${modal.item._id}`);
      dispatch(successMenu(responce.data.menu));
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
      dispatch(errorMenu("Failed to delete user acount. Please try again."));
    }
  };

  return (
 
      <div className="admin-page" style={{ height: "90vh" }}>
        <div className="admin-page__header">
          <div className="admin-page__title-block">
            <div className="admin-page__title">Manage Menu</div>
            <div className="admin-page__subtitle">
              {menu.length} items {CATS.length - 1} categories
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
        {loading ? (
          <Loading />
        ) : view === "grid" ? (
          <div className="tables-grid">
            {filtered.map((t) => {
              // const rc = ROLE_COLORS[t.role] || {};
              // const cfg = STATUS_CFG[t.status];
              return (
                <div className={`table-card `} key={t._id}>
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
                    <span className={`admin-pill `}>
                      {t.available ? "Available" : "Unavailable"}
                    </span>
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
          <Table.ScrollArea
            borderWidth="1px"
            maxW="100%"
            className="users-table"
          >
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
                      <Table.Row key={m._id}>
                        <Table.Cell
                          style={{ color: "#a0704a", fontWeight: 600 }}
                        >
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
                        <Table.Cell
                          style={{ fontWeight: 700, color: "#b84c00" }}
                        >
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
                          {m.description}
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            className={`admin-pill ${m.isAvailable ? "admin-pill--active" : "admin-pill--inactive"}`}
                          >
                            {m.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="admin-table__actions">
                            <button
                              className="admin-table__btn admin-table__btn--edit"
                              onClick={() =>
                                setModal({ type: "edit", item: m })
                              }
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
