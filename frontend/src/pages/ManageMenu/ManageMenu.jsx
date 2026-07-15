import {
  loadingMenu,
  successMenu,
  errorMenu,
} from "../../redux/slice/menuSlice";
import { CgUnavailable } from "react-icons/cg";
import { MdEventAvailable } from "react-icons/md";
import {
  Table,
  HStack,
  Avatar,
  Stack,
  Text,
  Button,
  Toaster,
} from "@chakra-ui/react";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "../../components/ui/toaster";
import API, { fetchMenu } from "../../utils/api";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { CATS } from "../../data/constants";
import MenuModal from "./MenuModel";
import "../admin.shared.css";

function DeleteModal({ item, onConfirm, onClose }) {
  const { loading } = useSelector((state) => state.menu);
  return (
    <div className="modal-overlay">
      <div className="modal modal--confirm" style={{ maxWidth: 380 }}>
        <div className="modal__header">
          <span className="modal__title">Remove Menu Item</span>
          <button className="modal__close" onClick={onClose} disabled={loading} >
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
          <button className="btn-cancel" disabled={loading} onClick={onClose}>
            Cancel
          </button>
          <Button className="btn-delete" loading={loading} onClick={onConfirm}>
            Remove Item
          </Button>
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

const ROLE_COLORS = {
  admin: { bg: "#f3e5f5", color: "#6a1b9a" },
  desk: { bg: "#e3f2fd", color: "#1565c0" },
  manager: { bg: "#fff3e0", color: "#e65100" },
  waiter: { bg: "#e8f5e9", color: "#2e7d32" },
};
export default function ManageMenu() {
  const { loading, menu, error } = useSelector((state) => state.menu);
  const [catFilter, setCatFilter] = useState("All");
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchMenu(dispatch);
    console.log(loading,"sai")
  }, []);

  const filtered = menu.filter(
    (m) =>
      (catFilter === "All" || m.category === catFilter) &&
      m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = async (form) => {
    const id = "item-updates-toast"
    if (modal.item) {
      try {
        toaster.loading({id, title: "Updateing...", description: "Please wait" })
        dispatch(loadingMenu());
        const responce = await API.put(`/menu/${modal.item._id}`, form);
        dispatch(successMenu(responce.data.menu));
        setModal(null);
        toaster.update(id,{
          title: "Item update",
          description: "Item updated successfully",
          type: "success",
          closable: false,
          action: {
            label: "ok",
          },
        });
      } catch (error) {
        toaster.update(id,{
          title: "Item update",
          description: "Item updated Failed",
          type: "error",
          closable: false,
          action: {
            label: "ok",
          },
        });
      }
    } else {
      try {
        toaster.loading({id, title: "Uploading...", description: "Please wait" })
        dispatch(loadingMenu());
        const responce = await API.post("/menu", form);
        dispatch(successMenu(responce.data.menu));
        setModal(null);
        toaster.update(id,{
          title: "Item added",
          description: "Item added successfully",
          type: "success",
          closable: false,
          action: {
            label: "ok",
          },
        });
      } catch (error) {
        console.log(error);
        toaster.update(id,{
          title: "Item added",
          description: "Item updated Failed",
          type: "error",
          closable: false,
          action: {
            label: "ok",
          },
        });
        // dispatch(error("Failed to create menu"));
      }
    }
  };

  const handleDelete = async () => {
    const id="item-delete-toast"
    try {
      toaster.loading({id, title: "Deleteing...", description: "Please wait" })
      dispatch(loadingMenu());
      const responce = await API.delete(`/menu/${modal.item._id}`);
      dispatch(successMenu(responce.data.menu));
      toaster.update(id,{
          title: "Item delete",
          description: "Item deleted successfully",
          type: "success",
          closable: false,
          action: {
            label: "ok",
          },
        });
      setModal(null);
    } catch (err) {
      toaster.update(id,{
          title: "Item delete",
          description: "Item deleted Failed. Please try again.",
          type: "error",
          closable: false,
          action: {
            label: "ok",
          },
        });
      dispatch(errorMenu("Failed to delete user acount. Please try again."));
    }
  };

  return (
    <>
      <div className="admin-page">
        <div className="admin-page__header">
          <div className="admin-page__title-block">
            <div className="admin-page__title">Manage Menu</div>
            <div className="admin-page__subtitle">
              {menu.length} items {CATS.length - 1} categories
            </div>
          </div>
           
          {role=="admin"&&(<button
            className="admin-page__add-btn"
            onClick={() => setModal({ type: "add" })}
          >
            <Plus size={15} /> Add Item
          </button>)}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              width: "100%",
            }}
          >
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
        </div>
        {loading ? (
          <Loading />
        ) : view === "grid" ? (
          <div className="tables-grid">
            {filtered.map((t) => {
              const cc = CAT_COLORS[t.category] || {};
              return (
                <div
                  className={`table-card ${t.isAvailable ? "table-card--available" : "table-card--occupied"}`}
                  key={t._id}
                >
                  <HStack justifyContent={"space-between"} alignItems={"start"}>
                    <HStack gap={3}>
                      <Stack gap="0" style={{ width: "180px" }}>
                        <Text
                          fontWeight="semibold"
                          textStyle="sm"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {t.name}
                        </Text>
                        <Text
                          color="fg.muted"
                          textStyle="sm"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {t.description}
                        </Text>
                        <Text
                          color="fg.muted"
                          textStyle="sm"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          ₹ {t.price}
                        </Text>
                      </Stack>
                    </HStack>
                    <span
                      className="admin-pill"
                      style={{ background: cc.bg, color: cc.color }}
                    >
                      {t.category}
                    </span>
                  </HStack>
                  <div>
                    <span
                      className={`admin-pill ${t.isAvailable ? "admin-pill--active" : "admin-pill--inactive"}`}
                    >
                      {t.isAvailable && <MdEventAvailable size={10} />}
                      {!t.isAvailable && <CgUnavailable size={10} />}
                      {t.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <div className="table-card__actions">
                    <Button
                    className="admin-table__btn admin-table__btn--edit"
                      variant="subtle"
                      colorPalette="blue"
                      flex="1"
                      borderRadius={"6px"}
                      onClick={() => setModal({ type: "edit", item: t })}
                    >
              
                        <Pencil />
                      Edit
                    </Button>
                    {role === "admin" && (
                      <Button
                       className="admin-table__btn admin-table__btn--delete"
                        variant="subtle"
                        colorPalette="red"
                        flex="1"
                        borderRadius={"6px"}
                        onClick={() => setModal({ type: "delete", item: t })}
                      >
                        <Trash2 />
                        Delete
                      </Button>
                    )}
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
                            {role === "admin" && (
                              <button
                                className="admin-table__btn admin-table__btn--delete"
                                onClick={() =>
                                  setModal({ type: "delete", item: m })
                                }
                                title="Delete"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
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
    </>
  );
}
