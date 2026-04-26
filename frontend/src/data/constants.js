export const MENU = [
  { id: 1,  name: "Butter Chicken",   category: "Mains",    price: 220, emoji: "🍛", desc: "Creamy tomato-based curry" },
  { id: 2,  name: "Paneer Tikka",     category: "Starters", price: 160, emoji: "🧀", desc: "Grilled cottage cheese cubes" },
  { id: 3,  name: "Biryani",          category: "Mains",    price: 250, emoji: "🍚", desc: "Aromatic basmati rice dish" },
  { id: 4,  name: "Dal Makhani",      category: "Mains",    price: 160, emoji: "🫘", desc: "Slow-cooked black lentils" },
  { id: 5,  name: "Garlic Naan",      category: "Breads",   price: 50,  emoji: "🫓", desc: "Soft garlic-buttered bread" },
  { id: 6,  name: "Tandoori Chicken", category: "Starters", price: 280, emoji: "🍗", desc: "Clay oven roasted chicken" },
  { id: 7,  name: "Masala Chai",      category: "Drinks",   price: 40,  emoji: "☕", desc: "Spiced Indian tea" },
  { id: 8,  name: "Mango Lassi",      category: "Drinks",   price: 80,  emoji: "🥭", desc: "Sweet mango yogurt drink" },
  { id: 9,  name: "Gulab Jamun",      category: "Desserts", price: 80,  emoji: "🍮", desc: "Syrup-soaked milk dumplings" },
  { id: 10, name: "Rasmalai",         category: "Desserts", price: 90,  emoji: "🍼", desc: "Soft cottage cheese in cream" },
  { id: 11, name: "Samosa",           category: "Starters", price: 60,  emoji: "🥟", desc: "Crispy fried pastry" },
  { id: 12, name: "Roti",             category: "Breads",   price: 30,  emoji: "🫓", desc: "Whole wheat flatbread" },
];

export const CATS = ["All", "Starters", "Mains", "Breads", "Drinks", "Desserts"];

export const TABLES = ["T-1","T-2","T-3","T-4","T-5","T-6","T-7","T-8","T-9","T-10"];

export const WAITERS = ["Rajan", "Priya", "Arjun", "Meena", "Suresh"];

export const SEED_ORDERS = [
  {
    id: "W001", type: "dine", waiter: "Rajan", table: "T-4",
    customer: "Sharma Family", status: "preparing", time: "12:35 PM",
    items: [
      { name: "Butter Chicken", qty: 2, price: 220 },
      { name: "Garlic Naan",    qty: 4, price: 50  },
      { name: "Mango Lassi",    qty: 2, price: 80  },
    ],
  },
  {
    id: "W002", type: "dine", waiter: "Priya", table: "T-7",
    customer: "Mehta Group", status: "served", time: "12:10 PM",
    items: [
      { name: "Biryani",      qty: 3, price: 250 },
      { name: "Paneer Tikka", qty: 1, price: 160 },
      { name: "Masala Chai",  qty: 3, price: 40  },
    ],
  },
  {
    id: "W003", type: "dine", waiter: "Arjun", table: "T-2",
    customer: "Reddy Party", status: "pending", time: "12:48 PM",
    items: [
      { name: "Tandoori Chicken", qty: 2, price: 280 },
      { name: "Dal Makhani",      qty: 2, price: 160 },
      { name: "Gulab Jamun",      qty: 4, price: 80  },
    ],
  },
  {
    id: "TK001", type: "takeaway",
    customer: "Vikram R", phone: "9876543210", status: "ready", time: "12:55 PM",
    items: [
      { name: "Biryani",    qty: 2, price: 250 },
      { name: "Masala Chai",qty: 2, price: 40  },
    ],
  },
  {
    id: "TK002", type: "takeaway",
    customer: "Lalitha S", phone: "9988776655", status: "pending", time: "01:02 PM",
    items: [
      { name: "Samosa",     qty: 4, price: 60 },
      { name: "Mango Lassi",qty: 1, price: 80 },
    ],
  },
];

export const STATUS_CONFIG = {
  pending:   { label: "Pending",   fg: "#9c4a00", bg: "#fff3e0", dot: "#f57c00" },
  preparing: { label: "Preparing", fg: "#004085", bg: "#e3f2fd", dot: "#1976d2" },
  ready:     { label: "Ready",     fg: "#155724", bg: "#e8f5e9", dot: "#2e7d32" },
  served:    { label: "Served",    fg: "#3d3d3d", bg: "#f5f5f5", dot: "#757575" },
};

export const NEXT_STATUS = {
  pending: "preparing",
  preparing: "ready",
  ready: "served",
};

export const NAV_GROUPS = [
  {
    key: "overview",
    label: "Overview",
    items: [{ id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" }],
  },
  {
    key: "Manage",
    label: "Manage",
    items: [
      { id: "manageusers", label: "Manage users", icon: "Users"  },
      { id: "managemenu", label: "Manage Menu", icon: "Menu"  },
      { id: "managetable", label: "Manage Table", icon: "Menu"  },
    ],
  },
  {
    key: "Menu",
    label: "Menu",
    items: [
      { id: "menu", label: "Menu", icon: "Menu"  },
    ],
  },
  {
    key: "place",
    label: "Place Orders",
    items: [
      { id: "takeaway", label: "Takeaway Order", icon: "Package",  cartKey: "tk"   },
      { id: "dine",     label: "Dine-in Order",  icon: "Utensils", cartKey: "dine" },
    ],
  },
  {
    key: "view",
    label: "View Orders",
    items: [
      { id: "tkList",   label: "Takeaway Orders", icon: "ClipboardList" },
      { id: "dineList", label: "Dine-in Orders",  icon: "Users"         },
    ],
  },
];


export const SEED_USERS = [
  { id: 1, name: "Admin",      email: "admin@spice.in",     role: "admin",   password: "admin123", status: "active"   },
  { id: 2, name: "Front Desk", email: "frontdesk@spice.in", role: "desk",    password: "desk123",  status: "active"   },
  { id: 3, name: "Manager",    email: "manager@spice.in",   role: "manager", password: "mgr123",   status: "active"   },
  { id: 4, name: "Rajan",      email: "rajan@spice.in",     role: "waiter",  password: "wait123",  status: "active"   },
  { id: 5, name: "Priya",      email: "priya@spice.in",     role: "waiter",  password: "wait123",  status: "active"   },
  { id: 6, name: "Arjun",      email: "arjun@spice.in",     role: "waiter",  password: "wait123",  status: "inactive" },
];

export const SEED_TABLES = [
  { id: "T-1",  capacity: 2, status: "available" },
  { id: "T-2",  capacity: 4, status: "occupied"  },
  { id: "T-3",  capacity: 4, status: "available" },
  { id: "T-4",  capacity: 6, status: "occupied"  },
  { id: "T-5",  capacity: 2, status: "reserved"  },
  { id: "T-6",  capacity: 4, status: "available" },
  { id: "T-7",  capacity: 8, status: "occupied"  },
  { id: "T-8",  capacity: 2, status: "available" },
  { id: "T-9",  capacity: 6, status: "reserved"  },
  { id: "T-10", capacity: 4, status: "available" },
];