import {cat,setphone,query,cart,isMobile,settable} from "../../redux/slice/orderPanelSlice"
import { ShoppingCart, Search, Plus, Minus, X } from "lucide-react";
import { updateMenu } from "../../redux/slice/menuSlice";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "@chakra-ui/react";
import socket from "../../utils/socket";
import "../OrderPanel/OrderPanel.css";
import API from "../../utils/api";
import { successTable } from "../../redux/slice/tableSlice";
import { Box } from "@chakra-ui/react"




export default function OrderPanel({ type, onPlace }) {
  const {cat, phone, query, table}=useSelector((state)=>state.orderPanel)
  const { loading, menu, error } = useSelector((state) => state.menu);
  const { tables } = useSelector((state) => state.table);
  const dispatch=useDispatch()
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize(); // initial check
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
     socket.on("updateMenu", (menu) => {
      dispatch(updateMenu(menu))
    });

    return () => {
      socket.off("updateMenu");
    };
  },[]);

  const filteredMenu = menu.filter(
    (m) =>
      (cat === "All" || m.category === cat) &&
      m.name.toLowerCase().includes(query.toLowerCase()),
  );
  let category = menu.map((item) => item.category);
  category = category.filter((item, index) => category.indexOf(item) === index);

  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c._id === item._id);
      return existing
        ? prev.map((c) => (c._id === item._id ? { ...c, qty: c.qty + 1 } : c))
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev
        .map((c) => (c._id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0),
    );

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  let canPlace;
  if (type == "takeaway") {
    canPlace = cart.length > 0 && phone !== "";
  } else {
    canPlace = cart.length > 0;
  }

  const handlePlace = async () => {
    const from = {
      customerNumber: phone,
      orderType: type === "takeaway" ? "takeaway" : "dine-in",
      tableNumber: type === "takeaway" ? null : table,
      items: cart.map((item) => ({ menuId: item._id, quantity: item.qty })),
      totalAmount: total,
      paymentMethod: null,
    };
    const table_id=tables.filter((item)=>item.name===table)[0]._id
    try {
      const responce = await API.post("/order", from);
      const response = await API.put(`/table/${table_id}`, {status: "occupied"});
      dispatch(successTable(response.data.table));
      dispatch(setphone(""))
      dispatch(settable(""))
      setCart([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="order-panel" >
      {/* ── Menu ── */}
      <div className="order-panel__menu">
        {/* Search */}
        <div className="order-panel__search-bar">
          <Search size={13} color="#a0704a" />
          <input
            className="order-panel__search-input"
            placeholder="Search dishes…"
            value={query}
            onChange={(e) =>
              dispatch(query(e.target.value))
            }
          />
        </div>

        {/* Category chips */}
        <div className="order-panel__cats">
          <button
            className={`order-panel__cat-btn${cat === "All" ? " order-panel__cat-btn--active" : ""}`}
            onClick={() => dispatch(cat("All"))}
          >
            All
          </button>
          {category.map((c) => (
            <button
              key={c}
              className={`order-panel__cat-btn${cat === c ? " order-panel__cat-btn--active" : ""}`}
              onClick={() => dispatch(cat("All"))}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="order-panel__menu-grid">
          {filteredMenu.map((item) => {
            const inCart = cart.find((c) => c._id === item._id);
            return (
              <div
                key={item._id}
                className={`order-panel__menu-card ${!item.isAvailable && "out-of-stock"}`}
              >
                <div className="order-panel__menu-body">
                  <div className="order-panel__menu-name">{item.name}</div>
                  <div className="order-panel__menu-desc">
                    {item.description}
                  </div>
                  <div className="order-panel__menu-footer">
                    <div>
                      <span className="order-panel__menu-price">
                        ₹{item.price}
                      </span>
                      <span
                        className={`out-of-stock-badge ${!item.isAvailable && "out-of-stock-active"}`}
                      >
                        {" "}
                        — sold out
                      </span>
                    </div>
                    {inCart ? (
                      <div className="order-panel__qty">
                        <button
                          className="order-panel__qty-btn"
                          onClick={() => updateQty(item._id, -1)}
                        >
                          <Minus size={10} />
                        </button>
                        <span className="order-panel__qty-num">
                          {inCart.qty}
                        </span>
                        <button
                          className="order-panel__qty-btn"
                          onClick={() => addItem(item)}
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="order-panel__add-btn"
                        onClick={() => addItem(item)}
                      >
                        <Plus size={12} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Cart ── */}
      <Accordion.Root
        variant={"plain"}
        collapsible={isMobile ? true : false}
        defaultValue={isMobile ? ["b"] : ["a"]}
        className="order-panel__cart"
      >
        <Accordion.Item value="a">
          <div>
            <Accordion.ItemTrigger>
              <div className="order-panel__cart-title">
                {type === "takeaway" ? "Takeaway Details" : "Dine-in Details"}
                {isMobile && (
                  <span className="order-panel__cart-count">
                    ({totalQty} items)
                  </span>
                )}
              </div>
              {isMobile && <Accordion.ItemIndicator />}
            </Accordion.ItemTrigger>
            {/* Form */}
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <div className="order-panel__form-box">
                  {type == "takeaway" ? (
                    <input
                      className="order-panel__input"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) =>
                        dispatch(setphone( e.target.value))
                      }
                    />
                  ) : (
                    <>
                      <div className="order-panel__form-label">
                        Select Table
                      </div>
                      <div className="form-group">
                        <select
                          value={table}
                          onChange={(e) => dispatch(settable(e.target.value))}
                        >
                          <option value="">Please select Table</option>
                          {tables.map((item) => (
                            <option
                              key={item._id}
                              disabled={item.status == "occupied"}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        className="order-panel__input"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) =>
                          dispatch(setphone(e.target.value ))
                        }
                      />
                    </>
                  )}
                </div>

                {/* Cart label */}
                <div className="order-panel__cart-label">
                  Cart{" "}
                  {totalQty > 0 && (
                    <span className="order-panel__cart-count">
                      ({totalQty} items)
                    </span>
                  )}
                </div>

                {/* Empty state */}
                {cart.length === 0 ? (
                  <div className="order-panel__empty">
                    <ShoppingCart size={26} color="#d4a87a"  />
                    <span className="order-panel__empty-text">
                      Add items from the menu
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Cart items */}
                    <Box className="order-panel__cart-items" h={type=="takeaway"?"260px":"190px"}>
                      {cart.map((item) => (
                        <div key={item.id} className="order-panel__cart-item">
                          <div className="order-panel__cart-item-info">
                            <div className="order-panel__cart-item-name">
                              {item.name}
                            </div>
                            <div className="order-panel__cart-item-price">
                              ₹{item.price} × {item.qty} ={" "}
                              <b>₹{item.price * item.qty}</b>
                            </div>
                          </div>
                          <div className="order-panel__qty">
                            <button
                              className="order-panel__qty-btn"
                              onClick={() => updateQty(item._id, -1)}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="order-panel__qty-num">
                              {item.qty}
                            </span>
                            <button
                              className="order-panel__qty-btn"
                              onClick={() => updateQty(item._id, 1)}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <button
                            className="order-panel__remove-btn"
                            onClick={() => updateQty(item._id, -item.qty)}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </Box>

                    {/* Summary */}
                    <div className="order-panel__summary" >
                      <div className="order-panel__summary-row">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="order-panel__summary-row">
                        <span>GST (5%)</span>
                        <span>₹{gst}</span>
                      </div>
                      <div className="order-panel__summary-row order-panel__summary-row--total">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                      <button
                        className="order-panel__place-btn"
                        onClick={handlePlace}
                        disabled={!canPlace}
                      >
                        Place Takeaway Order
                      </button>
                    </div>
                  </>
                )}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </div>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}
