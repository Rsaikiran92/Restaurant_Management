import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const COLORS = {
  dineIn: "#3B82F6",
  takeaway: "#F59E0B",
  revenue: "#10B981",
  orders: "#8B5CF6",
  accent: "#F59E0B",
};

const monthlyData = [
  { month: "Jan", revenue: 124500, orders: 1820, dineInOrders: 1092, takeawayOrders: 728, dineInRev: 78435, takeawayRev: 46065 },
  { month: "Feb", revenue: 118200, orders: 1654, dineInOrders: 992,  takeawayOrders: 662, dineInRev: 74466, takeawayRev: 43734 },
  { month: "Mar", revenue: 135800, orders: 1942, dineInOrders: 1165, takeawayOrders: 777, dineInRev: 85554, takeawayRev: 50246 },
  { month: "Apr", revenue: 142300, orders: 2105, dineInOrders: 1263, takeawayOrders: 842, dineInRev: 89649, takeawayRev: 52651 },
  { month: "May", revenue: 98400,  orders: 1410, dineInOrders: 846,  takeawayOrders: 564, dineInRev: 61992, takeawayRev: 36408 },
];

const dailyData = [
  { day: "Mon", revenue: 4200, orders: 62, dineIn: 38, takeaway: 24 },
  { day: "Tue", revenue: 3800, orders: 54, dineIn: 32, takeaway: 22 },
  { day: "Wed", revenue: 4600, orders: 68, dineIn: 42, takeaway: 26 },
  { day: "Thu", revenue: 5100, orders: 74, dineIn: 45, takeaway: 29 },
  { day: "Fri", revenue: 6800, orders: 98, dineIn: 61, takeaway: 37 },
  { day: "Sat", revenue: 8200, orders: 118, dineIn: 74, takeaway: 44 },
  { day: "Sun", revenue: 7100, orders: 102, dineIn: 64, takeaway: 38 },
];

const peakHoursData = [
  { hour: "10am", orders: 12 }, { hour: "11am", orders: 24 }, { hour: "12pm", orders: 58 },
  { hour: "1pm",  orders: 72 }, { hour: "2pm",  orders: 45 }, { hour: "3pm",  orders: 18 },
  { hour: "4pm",  orders: 14 }, { hour: "5pm",  orders: 31 }, { hour: "6pm",  orders: 63 },
  { hour: "7pm",  orders: 88 }, { hour: "8pm",  orders: 76 }, { hour: "9pm",  orders: 44 },
];

const orderTypeDonut = [
  { name: "Dine-in", value: 60 },
  { name: "Takeaway", value: 40 },
];

const fmt = (n) => "₹" + n.toLocaleString("en-IN");
const fmtK = (n) => n >= 1000 ? "₹" + (n / 1000).toFixed(1) + "k" : "₹" + n;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--color-background-primary)",
      border: "0.5px solid var(--color-border-secondary)",
      borderRadius: "var(--border-radius-md)",
      padding: "10px 14px",
      fontSize: 13,
    }}>
      <p style={{ margin: "0 0 6px", fontWeight: 500, color: "var(--color-text-primary)" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ margin: "2px 0", color: p.color }}>
          {p.name}: {p.name.toLowerCase().includes("revenue") || p.name === "Revenue" ? fmt(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, sub, color, icon }) => (
  <div style={{
    background: "var(--color-background-secondary)",
    borderRadius: "var(--border-radius-lg)",
    padding: "1rem 1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500, letterSpacing: "0.03em", textTransform: "uppercase" }}>{label}</span>
      <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize: 16, color }} />
    </div>
    <p style={{ margin: 0, fontSize: 24, fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.2 }}>{value}</p>
    {sub && <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>{sub}</p>}
  </div>
);

const SectionLabel = ({ children }) => (
  <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)" }}>{children}</h3>
);

const CUSTOM_LEGEND = ({ items }) => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
    {items.map(({ label, color }) => (
      <span key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--color-text-secondary)" }}>
        <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }} />
        {label}
      </span>
    ))}
  </div>
);

export default function Dashboard() {
  const [activeMonth, setActiveMonth] = useState(4);
  const selected = monthlyData[activeMonth];
  const prev = monthlyData[activeMonth - 1];
  const revenueGrowth = prev ? (((selected.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1) : null;
  const todayData = dailyData[dailyData.length - 1];
  const totalDineInRev = monthlyData.reduce((s, m) => s + m.dineInRev, 0);
  const totalTakeawayRev = monthlyData.reduce((s, m) => s + m.takeawayRev, 0);
  const totalDineInOrders = monthlyData.reduce((s, m) => s + m.dineInOrders, 0);
  const totalTakeawayOrders = monthlyData.reduce((s, m) => s + m.takeawayOrders, 0);
  const totalOrders = monthlyData.reduce((s, m) => s + m.orders, 0);
  const totalRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0);
  const avgOrder = Math.round(totalRevenue / totalOrders);

  return (
    <div style={{ padding: "1.5rem 0", fontFamily: "var(--font-sans)" }}>
      <h2 className="sr-only">Restaurant revenue dashboard showing monthly and daily revenue, order counts, dine-in and takeaway statistics.</h2>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)" }}>Revenue Dashboard</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>Jan – May 2026 · All outlets</p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {monthlyData.map((m, i) => (
            <button key={m.month} onClick={() => setActiveMonth(i)} style={{
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: i === activeMonth ? 500 : 400,
              borderRadius: "var(--border-radius-md)",
              background: i === activeMonth ? "var(--color-background-info)" : "transparent",
              color: i === activeMonth ? "var(--color-text-info)" : "var(--color-text-secondary)",
              border: i === activeMonth ? "0.5px solid var(--color-border-info)" : "0.5px solid var(--color-border-tertiary)",
              cursor: "pointer",
            }}>{m.month}</button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
        <StatCard label="Monthly Revenue" value={fmt(selected.revenue)} sub={revenueGrowth ? `${revenueGrowth > 0 ? "▲" : "▼"} ${Math.abs(revenueGrowth)}% vs last month` : "First month"} color="#10B981" icon="ti-currency-rupee" />
        <StatCard label="Today's Revenue" value={fmt(todayData.revenue)} sub={`${todayData.orders} orders`} color="#3B82F6" icon="ti-sun" />
        <StatCard label="Monthly Orders" value={selected.orders.toLocaleString()} sub={`Avg ₹${Math.round(selected.revenue / selected.orders)}/order`} color="#8B5CF6" icon="ti-shopping-cart" />
        <StatCard label="Avg Order Value" value={"₹" + avgOrder} sub="YTD average" color="#F59E0B" icon="ti-receipt" />
      </div>

      {/* Revenue + Donut row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
        {/* Monthly Revenue Trend */}
        <div>
          <SectionLabel>Monthly revenue trend</SectionLabel>
          <CUSTOM_LEGEND items={[{ label: "Revenue", color: "#10B981" }]} />
          <div style={{ position: "relative", width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(128,128,128,0.12)" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmtK} tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} width={48} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10B981" strokeWidth={2} fill="url(#revGrad)" dot={{ fill: "#10B981", r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut */}
        <div>
          <SectionLabel>Order type split · {selected.month}</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ position: "relative", width: "100%", height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={orderTypeDonut} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                    dataKey="value" startAngle={90} endAngle={-270} paddingAngle={3}>
                    <Cell fill={COLORS.dineIn} />
                    <Cell fill={COLORS.takeaway} />
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)" }}>{selected.orders}</p>
                <p style={{ margin: 0, fontSize: 10, color: "var(--color-text-secondary)" }}>orders</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-text-secondary)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: COLORS.dineIn }} />
                Dine-in 60%
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-text-secondary)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: COLORS.takeaway }} />
                Takeaway 40%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Revenue bar */}
      <div style={{ marginBottom: "1.5rem" }}>
        <SectionLabel>Daily revenue — this week</SectionLabel>
        <CUSTOM_LEGEND items={[{ label: "Dine-in revenue", color: COLORS.dineIn }, { label: "Takeaway revenue", color: COLORS.takeaway }]} />
        <div style={{ position: "relative", width: "100%", height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData.map(d => ({
              ...d,
              dineInRev: Math.round(d.revenue * 0.63),
              takeawayRev: Math.round(d.revenue * 0.37),
            }))} margin={{ top: 4, right: 8, bottom: 0, left: 0 }} barCategoryGap="30%">
              <CartesianGrid stroke="rgba(128,128,128,0.12)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtK} tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} width={48} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="dineInRev" name="Dine-in revenue" fill={COLORS.dineIn} stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="takeawayRev" name="Takeaway revenue" fill={COLORS.takeaway} stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dine-in vs Takeaway + Peak Hours row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
        {/* Dine-in vs Takeaway cards */}
        <div>
          <SectionLabel>Dine-in vs takeaway · YTD</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Dine-in", orders: totalDineInOrders, revenue: totalDineInRev, color: COLORS.dineIn, icon: "ti-building-store" },
              { label: "Takeaway", orders: totalTakeawayOrders, revenue: totalTakeawayRev, color: COLORS.takeaway, icon: "ti-package" },
            ].map(item => (
              <div key={item.label} style={{
                background: "var(--color-background-secondary)",
                borderRadius: "var(--border-radius-lg)",
                padding: "0.875rem 1rem",
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>
                    <i className={`ti ${item.icon}`} aria-hidden="true" style={{ fontSize: 15, color: item.color }} />
                    {item.label}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)" }}>{fmt(item.revenue)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{item.orders.toLocaleString()} orders</span>
                  <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Avg ₹{Math.round(item.revenue / item.orders)}/order</span>
                </div>
                <div style={{ marginTop: 8, height: 4, borderRadius: 4, background: "var(--color-border-tertiary)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.round(item.orders / totalDineInOrders + totalTakeawayOrders * 0.01 * 100)}%`, background: item.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak hours */}
        <div>
          <SectionLabel>Peak order hours · today</SectionLabel>
          <CUSTOM_LEGEND items={[{ label: "Orders", color: COLORS.orders }]} />
          <div style={{ position: "relative", width: "100%", height: 170 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="rgba(128,128,128,0.12)" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} interval={1} />
                <YAxis tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} width={28} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orders" name="Orders" fill={COLORS.orders} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly order breakdown table */}
      <div>
        <SectionLabel>Month-by-month breakdown</SectionLabel>
        <div style={{
          background: "var(--color-background-secondary)",
          borderRadius: "var(--border-radius-lg)",
          overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, tableLayout: "fixed" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                {["Month", "Revenue", "Orders", "Dine-in orders", "Takeaway orders", "Dine-in rev", "Takeaway rev"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m, i) => (
                <tr key={m.month} style={{
                  background: i === activeMonth ? "var(--color-background-info)" : "transparent",
                  borderBottom: i < monthlyData.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none",
                  transition: "background 0.15s",
                }}>
                  <td style={{ padding: "10px 12px", fontWeight: i === activeMonth ? 500 : 400, color: i === activeMonth ? "var(--color-text-info)" : "var(--color-text-primary)" }}>{m.month}</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-text-primary)" }}>{fmt(m.revenue)}</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-text-primary)" }}>{m.orders.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ color: COLORS.dineIn }}>{m.dineInOrders.toLocaleString()}</span>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ color: COLORS.takeaway }}>{m.takeawayOrders.toLocaleString()}</span>
                  </td>
                  <td style={{ padding: "10px 12px", color: "var(--color-text-secondary)" }}>{fmt(m.dineInRev)}</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-text-secondary)" }}>{fmt(m.takeawayRev)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)" }}>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: "var(--color-text-primary)", fontSize: 12 }}>YTD Total</td>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: "var(--color-text-primary)" }}>{fmt(totalRevenue)}</td>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: "var(--color-text-primary)" }}>{totalOrders.toLocaleString()}</td>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: COLORS.dineIn }}>{totalDineInOrders.toLocaleString()}</td>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: COLORS.takeaway }}>{totalTakeawayOrders.toLocaleString()}</td>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: "var(--color-text-secondary)" }}>{fmt(totalDineInRev)}</td>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: "var(--color-text-secondary)" }}>{fmt(totalTakeawayRev)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}