import { getDrawerWidthTransitionMixin } from "@/utils/mixins";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 240;
const MIN_DRAWER_WIDTH = 90;

export interface DrawerProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  container?: Element;
}

export default function Drawer({ expanded, setExpanded, container }: DrawerProps) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 🔹 Define largura conforme o estado expandido
  const drawerWidth = expanded ? DRAWER_WIDTH : MIN_DRAWER_WIDTH;

  // 🔹 Persiste estado expandido no localStorage
  React.useEffect(() => {
    localStorage.setItem("drawer-expanded", String(expanded));
  }, [expanded]);

  // 🔹 Recupera estado salvo ao iniciar
  React.useEffect(() => {
    const stored = localStorage.getItem("drawer-expanded");
    if (stored !== null) {
      setExpanded(stored === "true");
    }
  }, [setExpanded]);

  // 🔹 Alterna entre expandido e recolhido
  const handleToggle = () => setExpanded(prev => !prev);
  const handleNavigate = (path: string) => () => navigate(path);

  const getDrawerSx = (isTemporary: boolean) => ({
    displayPrint: "none",
    width: drawerWidth,
    flexShrink: 0,
    ...getDrawerWidthTransitionMixin(expanded),
    ...(isTemporary
      ? { position: "absolute" }
      : {
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
              duration: theme.transitions.duration.standard,
            }),
            overflowX: "hidden",
          },
        }),
  });

  const menuActive = (path: string) => pathname.startsWith(path);

  const drawerContent = (
    <>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List disablePadding dense>
          <ListItemButton onClick={handleNavigate("/")} selected={menuActive("/")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Dashboard" />}
          </ListItemButton>

          <ListItemButton onClick={handleNavigate("/users")} selected={menuActive("/users")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Usuários" />}
          </ListItemButton>
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* 🔹 Drawer para mobile */}
      <MuiDrawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={() => setExpanded(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          ...getDrawerSx(true),
        }}
      >
        {drawerContent}
      </MuiDrawer>

      {/* 🔹 Drawer fixo (desktop) */}
      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          ...getDrawerSx(false),
        }}
        open
      >
        {drawerContent}

        {/* 🔹 Botão para expandir/recolher */}
        <IconButton
          onClick={handleToggle}
          sx={{
            position: "absolute",
            bottom: 8,
            right: expanded ? -12 : -18,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 1,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </MuiDrawer>
    </>
  );
}
