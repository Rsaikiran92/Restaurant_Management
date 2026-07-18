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
import { Avatar, Flex, Menu, Portal } from "@chakra-ui/react";
import { Button, Card, HStack, Stack, Strong, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../contextAPI/UserContextapi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import playNotificationSound from "../playNotificationSound";


function Navbar({ pendingCount }) {
  const { data } = useContext(UserContext);
  const navigate = useNavigate();
  const {orders}=useSelector((state)=>state.order)

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
          {orders.length > 0 && (
            <div className="navbar__pending-pill">
              <Bell size={12} />
              {orders.length} pending
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
                  style={{ backgroundColor: "white", color: "black",boxShadow:"none",borderRadius:"10px",border:"1px solid #f0d5b0" }}
                >
                  <div
                    style={{
                      maxWidth: 500,

                      padding: "1rem",
                    }}
                  >
                    <HStack mb="6" gap="3" style={{border:"1px solid #f0d5b0",padding:"15px",borderRadius:"10px"}}>
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
                    <Flex justifyContent={"end"}>
                    <button className="admin-page__add-btn" onClick={handlelogout}  >Sign out</button>
                    </Flex>
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
