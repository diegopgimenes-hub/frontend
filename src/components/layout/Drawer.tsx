import { getDrawerSxTransitionMixin, getDrawerWidthTransitionMixin } from "@/utils/mixins";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 📏 Drawer dimensions (local, sem constants.ts)
const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 90;

// 🔧 LocalStorage keys
const MENU_OPEN_KEY = "drawer-menu-open";
const DRAWER_EXPANDED_KEY = "drawer-expanded";

export interface DrawerProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  disableCollapsibleSidebar?: boolean;
  container?: Element;
}

export default function Drawer({
  expanded,
  setExpanded,
  disableCollapsibleSidebar = false,
  container,
}: DrawerProps) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up("sm"));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));

  // 🧠 Persistência: carregar estado salvo no primeiro render
  React.useEffect(() => {
    const stored = localStorage.getItem(DRAWER_EXPANDED_KEY);
    if (stored) setExpanded(stored === "true");
  }, [setExpanded]);

  // 🧠 Persistência: salvar sempre que mudar
  React.useEffect(() => {
    localStorage.setItem(DRAWER_EXPANDED_KEY, String(expanded));
  }, [expanded]);

  const mini = !disableCollapsibleSidebar && !expanded;

  // 🧠 Persistência do menu principal (nível 0)
  const [menuOpen, setMenuOpen] = React.useState(() => {
    const stored = localStorage.getItem(MENU_OPEN_KEY);
    return stored ? stored === "true" : true; // padrão: aberto
  });

  const handleToggleMenu = () => {
    setMenuOpen(prev => {
      const newValue = !prev;
      localStorage.setItem(MENU_OPEN_KEY, String(newValue));
      return newValue;
    });
  };

  const handleNavigate = (path: string) => () => navigate(path);

  const hasDrawerTransitions = isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);

  const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  const getDrawerSharedSx = (isTemporary: boolean) => ({
    displayPrint: "none",
    width: drawerWidth,
    flexShrink: 0,
    ...getDrawerWidthTransitionMixin(expanded),
    ...(isTemporary ? { position: "absolute" } : {}),
    "& .MuiDrawer-paper": {
      position: "absolute",
      width: drawerWidth,
      boxSizing: "border-box",
      backgroundImage: "none",
      ...getDrawerWidthTransitionMixin(expanded),
    },
  });

  const menuActive = (path: string) => pathname.startsWith(path);

  const content = (
    <>
      <Toolbar />
      <Box
        component="nav"
        sx={{
          height: "100%",
          overflow: "auto",
          pt: 1,
          ...(hasDrawerTransitions ? getDrawerSxTransitionMixin(expanded, "padding") : {}),
        }}
      >
        <List disablePadding dense>
          {/* ✅ Nó raiz “Menu” */}
          <ListItemButton onClick={handleToggleMenu}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
            {menuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Subnível: Dashboard + Employees */}
          <Collapse in={menuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={pathname === "/"}
                onClick={handleNavigate("/")}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={menuActive("/users")}
                onClick={() => navigate("/users")}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Drawer responsivo (mobile e desktop) */}
      <MuiDrawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={() => setExpanded(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: {
            xs: "block",
            sm: disableCollapsibleSidebar ? "block" : "none",
            md: "none",
          },
          ...getDrawerSharedSx(true),
        }}
      >
        {content}
      </MuiDrawer>

      <MuiDrawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            sm: disableCollapsibleSidebar ? "none" : "block",
            md: "block",
          },
          ...getDrawerSharedSx(false),
        }}
      >
        {content}
      </MuiDrawer>
    </>
  );
}
