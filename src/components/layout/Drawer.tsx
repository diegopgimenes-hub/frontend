import { getDrawerWidthTransitionMixin } from "@/utils/mixins";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // 🚚 NOVO ícone
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Collapse,
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

  const drawerWidth = expanded ? DRAWER_WIDTH : MIN_DRAWER_WIDTH;
  const [openSystemConfig, setOpenSystemConfig] = React.useState(false);
  const [openSAC, setOpenSAC] = React.useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);
  const handleNavigate = (path: string) => () => navigate(path);
  const menuActive = (path: string) => pathname.startsWith(path);

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

  const drawerContent = (
    <>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List disablePadding dense>
          {/* HOME */}
          <ListItemButton onClick={handleNavigate("/")} selected={menuActive("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Home" />}
          </ListItemButton>

          {/* CONFIGURAÇÕES DE SISTEMA */}
          <ListItemButton onClick={() => setOpenSystemConfig(!openSystemConfig)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {expanded && (
              <ListItemText
                primary="Configurações de Sistema"
                primaryTypographyProps={{ fontWeight: "bold" }}
              />
            )}
          </ListItemButton>

          <Collapse in={openSystemConfig && expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={handleNavigate("/users")}
                selected={menuActive("/users")}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                onClick={handleNavigate("/roles")}
                selected={menuActive("/roles")}
              >
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Roles" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* SAC */}
          <ListItemButton onClick={() => setOpenSAC(!openSAC)}>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            {expanded && (
              <ListItemText primary="SAC" primaryTypographyProps={{ fontWeight: "bold" }} />
            )}
          </ListItemButton>

          <Collapse in={openSAC && expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={handleNavigate("/sac/driver-board")}
                selected={menuActive("/sac/driver-board")}
              >
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Quadro do Motorista" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Drawer temporário (mobile) */}
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

      {/* Drawer fixo (desktop) */}
      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          ...getDrawerSx(false),
        }}
        open
      >
        {drawerContent}

        {/* Botão expandir/recolher */}
        <IconButton
          onClick={handleToggle}
          sx={{
            position: "absolute",
            bottom: 8,
            right: expanded ? -12 : -18,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 1,
            "&:hover": { backgroundColor: theme.palette.action.hover },
          }}
        >
          {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </MuiDrawer>
    </>
  );
}
