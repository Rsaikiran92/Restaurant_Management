const AdminDashboard = () => {
  return (
    <Box style={{ height: "92vh" }}>
      <Tabs.Root
        variant="subtle"
        defaultValue="members"
        orientation="vertical"
        height={"92vh"}
      >
        <Tabs.List
          style={{
            padding: "20px",
            width: "20%",

            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <Tabs.Trigger value="members">Creater User</Tabs.Trigger>
          <Tabs.Trigger value="projects">Takeaway</Tabs.Trigger>
          <Tabs.Trigger value="tasks">Take order</Tabs.Trigger>
          <Tabs.Trigger value="menu">Menu</Tabs.Trigger>
        </Tabs.List>
        <Box style={{ padding: "20px" }}>
          <Tabs.Content value="members">Dine-in order list</Tabs.Content>

          <Tabs.Content value="projects">
            Manage your projects and their status here.
          </Tabs.Content>

          <Tabs.Content value="tasks">
            Manage your tasks and their progress here.
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
};
export default AdminDashboard;
