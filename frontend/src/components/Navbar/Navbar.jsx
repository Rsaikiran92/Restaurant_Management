import {
  ChefHat,
  Bell,
  LayoutDashboard,
  Package,
  Utensils,
  ClipboardList,
  Users,
} from "lucide-react";
import "./Navbar.css";
import { Avatar, Menu, Portal } from "@chakra-ui/react";
import { Button, Card, HStack, Stack, Strong, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../contextAPI/UserContextapi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Navbar({ pendingCount }) {
  const { data } = useContext(UserContext);
  const navigate = useNavigate();
  
  function handlelogout(){
    console.log("ok")
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/")    
  }
  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Brand */}
        <div className="navbar__brand">
          <div className="navbar__logo-box">
            <ChefHat size={20} color="#fff" />
          </div>
          <div>
            <div className="navbar__title">Spice Garden</div>
            <div className="navbar__subtitle">Restaurant Management</div>
          </div>
        </div>

        {/* Right */}
        <div className="navbar__right">
          {pendingCount > 0 && (
            <div className="navbar__pending-pill">
              <Bell size={12} />
              {pendingCount} pending
            </div>
          )}
          {/* <div className="navbar__avatar">FD</div> */}
          <Menu.Root>
            <Menu.Trigger rounded="full" focusRing="outside">
              <Avatar.Root
                size="sm"
                css={{
                  border: "1.5px solid rgba(255, 255, 255, 0.35)",
                  fontWeight: "700",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                }}
              >
                <Avatar.Fallback name={data.name} />
              </Avatar.Root>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  <div
                    style={{
                      maxWidth: 500,

                      padding: "1rem",
                    }}
                  >
                    <HStack mb="6" gap="3">
                      <Avatar.Root>
                        {/* <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" /> */}
                        <Avatar.Fallback name={data.name} />
                      </Avatar.Root>
                      <Stack gap="0">
                        <Text fontWeight="semibold" textStyle="sm">
                          {data.name}
                        </Text>
                        <Text color="fg.muted" textStyle="sm">
                          {data.email}
                        </Text>
                      </Stack>
                    </HStack>

                    <button className="admin-page__add-btn" onClick={handlelogout}>Sign out</button>
                  </div>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
