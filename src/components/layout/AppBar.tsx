import ThemeToggle from "@/components/layout/ThemeToggle";
import { MenuIcon, MenuOpenIcon } from "@/icons";
import {
  Box,
  IconButton,
  AppBar as MuiAppBar,
  Stack,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface AppBarProps {
  logo?: React.ReactNode;
  title?: string;
  menuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
}

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: 40,
  "& img": {
    maxHeight: 40,
  },
});

export default function AppBar({ logo, title, menuOpen, onToggleMenu }: AppBarProps) {
  const theme = useTheme();

  const handleToggleMenu = () => onToggleMenu(!menuOpen);

  return (
    <StyledAppBar position="fixed" color="inherit">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Esquerda — Menu + Logo */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title={menuOpen ? "Fechar menu" : "Abrir menu"}>
            <IconButton onClick={handleToggleMenu} size="small">
              {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {logo && <LogoContainer>{logo}</LogoContainer>}
              {title && (
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {title}
                </Typography>
              )}
            </Stack>
          </Link>
        </Stack>

        {/* Direita — Controles (ex: tema, perfil, logout, etc.) */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <ThemeToggle />
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}
