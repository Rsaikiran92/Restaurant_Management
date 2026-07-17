import { Minus, Plus, Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toaster } from "../../components/ui/toaster";
import API from "../../utils/api";
import { loadingOrder, successOrder } from "../../redux/slice/orderSlice";
import socket from "../../utils/socket";
import { updateMenu } from "../../redux/slice/menuSlice";
import { Button } from "@chakra-ui/react";

function AddItemsModal({ onAdd, onClose, id }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [picked, setPicked] = useState({});
  const [loading,setLoading]=useState(false)
  const {  menu, error } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const filtered = menu.filter(
    (m) =>
      (cat === "All" || m.category === cat) &&
      m.name.toLowerCase().includes(search.toLowerCase()),
  );
  let category = menu.map((item) => item.category);
  category = category.filter((item, index) => category.indexOf(item) === index);

  useEffect(() => {
    socket.on("updateMenu", (menu) => {
      console.log(menu)
      dispatch(updateMenu(menu));
      menu.map((item) => {
        if (!item.isAvailable ) {
          setQty(item._id, 0);
        }
      });
    });
    return () => {
      socket.off("updateMenu");
    };
  }, []);

  const setQty = (id, val) =>{
    setPicked((prev) => {
      let n = Math.max(0, (prev[id] || 0) + val);
      if(val==0){
        n=0
      }
      const next = { ...prev };
      if (n === 0) delete next[id];
      else next[id] = n;
      return next;
    });
  }
  const hasItems = Object.keys(picked).length > 0;
  const totalItems = Object.values(picked).reduce((s, q) => s + q, 0);

  const handleAdd = async () => {
    setLoading(true)
    const toAdd = Object.entries(picked).map(([id, qty]) => {
      return { menuId: id, quantity: qty };
    });

    try {

      const response = await API.put(`/order/${id}/add-item`, toAdd);
      setLoading(false)
      toaster.success({
        title: "Add item successful",
        description: "Added item successfully to the order",
        closable: false,
        action: {
          label: "ok",
        },
      });
      onClose();
    } catch (err) {
      setLoading(false)
      console.log(err);
      toaster.error({
        title: "Add item failed",
        description: err,
        closable: false,
        action: {
          label: "ok",
        },
      });
      
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal add-items-modal">
        <div className="modal__header">
          <span className="modal__title">Add More Items</span>
          <button className="modal__close" onClick={onClose} disabled={loading}>
            <X size={14} />
          </button>
        </div>
        <div className="modal__body">
          {/* search */}
          <div className="menu-search">
            <Search size={13} color="#a0704a" />
            <input
              placeholder="Search dishes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* category chips */}
          <div className="order-panel__cats">
            <button
              className={`order-panel__cat-btn${cat === "All" ? " order-panel__cat-btn--active" : ""}`}
              onClick={() => setCat("All")}
            >
              All
            </button>
            {category.map((c) => (
              <button
                key={c}
                className={`order-panel__cat-btn${cat === c ? " order-panel__cat-btn--active" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filtered.map((item) => {
              const qty = picked[item._id] || 0;
              return (
                <div
                  key={item._id}
                  className={`menu-item-pick ${!item.isAvailable && "out-of-stock"}`}
                  key={item._id}
                >
                  <div className="menu-item-pick__emoji">{item.emoji}</div>
                  <div className="menu-item-pick__info">
                    <div className="menu-item-pick__name">{item.name}</div>
                    <div className="menu-item-pick__price">₹{item.price}</div>
                  </div>
                  <div className="menu-item-pick__qty">
                    <button
                      className="qty-btn"
                      onClick={() => setQty(item._id, -1)}
                      disabled={qty === 0}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-num">{qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => setQty(item._id, 1)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn-cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <Button className="btn-save" loading={loading} onClick={handleAdd} disabled={!hasItems}>
            Add{" "}
            {totalItems > 0
              ? `${totalItems} item${totalItems > 1 ? "s" : ""}`
              : "Items"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddItemsModal;
