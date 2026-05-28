export const CATS = ["All", "Starters", "Mains", "Breads", "Drinks", "Desserts"];


export const STATUS_CONFIG = {
  pending:   { label: "Pending",   fg: "#9c4a00", bg: "#fff3e0", dot: "#f57c00" },
  preparing: { label: "Preparing", fg: "#004085", bg: "#e3f2fd", dot: "#1976d2" },
  ready:     { label: "Ready",     fg: "#155724", bg: "#e8f5e9", dot: "#2e7d32" },
  served:    { label: "Served",    fg: "#3d3d3d", bg: "#f5f5f5", dot: "#757575" },
};

// export const NEXT_STATUS = {
//   pending: "preparing",
//   preparing: "ready",
//   ready: "served",
// };

export const NAV_GROUPS = [
  {
    key: "overview",
    label: "Overview",
    items: [{ id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" , roles: ["admin"]}],
  },
  {
    key: "Manage",
    label: "Manage",
    items: [
      { id: "manageusers", label: "Manage users", icon: "Users" ,roles: ["admin"] },
      { id: "managemenu", label: "Manage Menu", icon: "Menu" ,roles: ["admin"] },
      { id: "managetable", label: "Manage Table", icon: "Menu" ,roles: ["admin"] },
    ],
  },
  {
    key: "place",
    label: "Place Orders",
    items: [
      { id: "takeaway", label: "Takeaway Order", icon: "Package",  cartKey: "tk"  ,roles: ["waiter"] },
      { id: "dine",     label: "Dine-in Order",  icon: "Utensils", cartKey: "dine" ,roles: ["waiter"]},
    ],
  },
  {
    key: "view",
    label: "View Orders",
    items: [
      { id: "tkList",   label: "Takeaway Orders", icon: "ClipboardList",roles: ["admin"] },
      { id: "dineList", label: "Dine-in Orders",  icon: "Users"    ,roles: ["admin"]     },
    ],
  },
];


export const ITEM_STATUSES=["preparing", "ready", "served"]