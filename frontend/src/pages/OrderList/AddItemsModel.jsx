import { Minus, Plus, Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toaster } from "../../components/ui/toaster";
import API from "../../utils/api";
import { loadingOrder, successOrder } from "../../redux/slice/orderSlice";

function AddItemsModal({ onAdd, onClose, id }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [picked, setPicked] = useState({});
  const { loading, menu, error } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const filtered = menu.filter(
    (m) =>
      (cat === "All" || m.category === cat) &&
      m.name.toLowerCase().includes(search.toLowerCase()),
  );
  let category = menu.map((item) => item.category);
  category = category.filter((item, index) => category.indexOf(item) === index);

  const setQty = (id, val) =>
    setPicked((prev) => {
      const n = Math.max(0, (prev[id] || 0) + val);
      const next = { ...prev };
      if (n === 0) delete next[id];
      else next[id] = n;
      return next;
    });

  const hasItems = Object.keys(picked).length > 0;
  const totalItems = Object.values(picked).reduce((s, q) => s + q, 0);

  const handleAdd = async () => {
    const toAdd = Object.entries(picked).map(([id, qty]) => {
      return { menuId: id, quantity: qty };
    });
    
    try {
      dispatch(loadingOrder());
      const response = await API.put(`/order/${id}/add-item`, toAdd);
      // dispatch(successOrder(response.data.order));
      // console.log(response.data.order)
      // toaster.success({
      //   title: "Update successful",
      //   description: "Update data successfully to the server",
      //   closable: false,
      //   action: {
      //     label: "ok",
      //   },
      // });
      onClose()
    } catch (err) {
      console.log(err)
      // toaster.create({
      //   title: "Update failed",
      //   description: err,
      //   type: error,
      // });
      // dispatch(failed("Failed to edit user informasion. Please try again."));
    }
    // onAdd(toAdd);
  };

  return (
    <div className="modal-overlay">
      <div className="modal add-items-modal">
        <div className="modal__header">
          <span className="modal__title">Add More Items</span>
          <button className="modal__close" onClick={onClose}>
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
                onClick={() => setCat("All")}
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
                <div key={item._id} className="menu-item-pick" key={item._id}>
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
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleAdd} disabled={!hasItems}>
            Add{" "}
            {totalItems > 0
              ? `${totalItems} item${totalItems > 1 ? "s" : ""}`
              : "Items"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemsModal;
