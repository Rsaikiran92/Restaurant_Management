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
import { UserContext } from "../../contextAPI/UserContextapi"
function Navbar({ pendingCount }) {
    const {data}=useContext(UserContext)
    console.log(data)
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
                  border:"1.5px solid rgba(255, 255, 255, 0.35)",
                  fontWeight:"700",
                  backgroundColor:"rgba(255, 255, 255, 0.2)",
                  color:"white"
                }}
              >
                <Avatar.Fallback name="Segun Adebayo" />
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
                        <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
                        <Avatar.Fallback name="Nate Foss" />
                      </Avatar.Root>
                      <Stack gap="0">
                        <Text fontWeight="semibold" textStyle="sm">
                          Sai Kiran
                        </Text>
                        <Text color="fg.muted" textStyle="sm">
                          saikiran@gmail.com
                        </Text>
                      </Stack>
                    </HStack>

                    <button className="admin-page__add-btn">Sign out</button>
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
