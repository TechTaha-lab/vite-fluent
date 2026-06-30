import { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { Navigation24Regular } from "@fluentui/react-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useNavbarStyles } from "./Navbar.styles";

export default function Navbar() {
  const styles = useNavbarStyles();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>FlowAI</div>

      <div className={styles.links}>
        <NavLink to="/">
          <Button appearance="subtle">Home</Button>
        </NavLink>

        <NavLink to="/features">
          <Button appearance="subtle">Features</Button>
        </NavLink>

        <NavLink to="/pricing">
          <Button appearance="subtle">Pricing</Button>
        </NavLink>

        <NavLink to="/testimonials">
          <Button appearance="subtle">Testimonials</Button>
        </NavLink>

        <NavLink to="/contact">
          <Button appearance="subtle">Contact</Button>
        </NavLink>
      </div>

      <div className={styles.right}>
        {!isLoggedIn ? (
          <>
            <NavLink to="/login">
              <Button appearance="subtle">Login</Button>
            </NavLink>

            <NavLink to="/register">
              <Button appearance="primary" className={styles.desktopButton}>
                Create Account
              </Button>
            </NavLink>
          </>
        ) : (
          <Button appearance="primary" onClick={handleLogout}>
            Logout
          </Button>
        )}

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="subtle"
              icon={<Navigation24Regular />}
              className={styles.mobileMenuButton}
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>
                <NavLink to="/">Home</NavLink>
              </MenuItem>

              <MenuItem>
                <NavLink to="/features">Features</NavLink>
              </MenuItem>

              <MenuItem>
                <NavLink to="/pricing">Pricing</NavLink>
              </MenuItem>

              <MenuItem>
                <NavLink to="/testimonials">Testimonials</NavLink>
              </MenuItem>

              <MenuItem>
                <NavLink to="/contact">Contact</NavLink>
              </MenuItem>

              {!isLoggedIn ? (
                <>
                  <MenuItem>
                    <NavLink to="/login">Login</NavLink>
                  </MenuItem>

                  <MenuItem>
                    <NavLink to="/register">Create Account</NavLink>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              )}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </header>
  );
}