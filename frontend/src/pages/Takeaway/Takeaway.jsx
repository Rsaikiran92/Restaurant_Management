import { ShoppingCart, Search, Plus, Minus, X } from "lucide-react";
import { useContext, useEffect, useReducer, useState } from "react";
import { UserContext } from "../../contextAPI/UserContextapi";
import { Accordion } from "@chakra-ui/react";
import { CATS } from "../../data/constants";
import { useSelector } from "react-redux";
import "../OrderPanel/OrderPanel.css";

const initialstate = {
  cat: "All",
  phone: "",
  query: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "phone":
      return { ...state, phone: action.payload };
    case "query":
      return { ...state, query: action.payload };
    case "cat":
      return { ...state, cat: action.payload };
    default:
      return state;
  }
};

export default function Takeaway({ onPlace }) {
  const { loading, menu, error } = useSelector((state) => state.menu);
  const [val, dispatch] = useReducer(reducer, initialstate);
  const user = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize(); // initial check
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const filteredMenu = menu.filter(
    (m) =>
      (val.cat === "All" || m.category === val.cat) &&
      m.name.toLowerCase().includes(val.query.toLowerCase()),
  );

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
  const canPlace = cart.length > 0 && val.phone !== "";

  const handlePlace = () => {
    console.log(val);
    const from = {
      customerNumber: val.phone,
      orderType: "takeaway",
      tableNumber: null,
      items: cart.map((item) => ({ menuId: item._id, quantity: item.qty })),
      totalAmount: total,
      paymentMethod: null,
      createdBy: user.data.id,
    };
    console.log(from);
    // setName("");
    // setPhone("");
    // {
    //     orderType: "dine-in",
    //     tableNumber: 5,
    //     items: [
    //       { menuId: "661f123abc123abc123abc12", quantity: 2 },
    //     ],
    //     totalAmount: 500,
    //     paymentMethod: "cash",
    //   }
  };

  return (
    <div className="order-panel">
      {/* ── Menu ── */}
      <div className="order-panel__menu">
        {/* Search */}
        <div className="order-panel__search-bar">
          <Search size={13} color="#a0704a" />
          <input
            className="order-panel__search-input"
            placeholder="Search dishes…"
            value={val.query}
            onChange={(e) =>
              dispatch({ type: "query", payload: e.target.value })
            }
          />
        </div>

        {/* Category chips */}
        <div className="order-panel__cats">
          {CATS.map((c) => (
            <button
              key={c}
              className={`order-panel__cat-btn${val.cat === c ? " order-panel__cat-btn--active" : ""}`}
              onClick={() => dispatch({ type: "cat", payload: c })}
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
              <div key={item._id} className="order-panel__menu-card">
                {/* <div className="order-panel__menu-emoji">{item.emoji}</div> */}
                <div className="order-panel__menu-body">
                  <div className="order-panel__menu-name">{item.name}</div>
                  <div className="order-panel__menu-desc">
                    {item.description}
                  </div>
                  <div className="order-panel__menu-footer">
                    <span className="order-panel__menu-price">
                      ₹{item.price}
                    </span>
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
              <div className="order-panel__cart-title">Takeaway Details {isMobile && <span className="order-panel__cart-count">
                      ({totalQty} items)
                    </span>}</div>
              {isMobile && <Accordion.ItemIndicator />}
            </Accordion.ItemTrigger>
            {/* Form */}
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <div className="order-panel__form-box">
                  <input
                    className="order-panel__input"
                    placeholder="Phone Number"
                    value={val.phone}
                    onChange={(e) =>
                      dispatch({ type: "phone", payload: e.target.value })
                    }
                  />
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
                    <ShoppingCart size={26} color="#d4a87a" />
                    <span className="order-panel__empty-text">
                      Add items from the menu
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Cart items */}
                    <div className="order-panel__cart-items">
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
                    </div>

                    {/* Summary */}
                    <div className="order-panel__summary">
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
