import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { Outlet } from "react-router-dom";

import SitemarkIcon from "@/components/common/SitemarkIcon";
import AppBar from "@/components/layout/AppBar";
import Drawer from "@/components/layout/Drawer";

const DRAWER_EXPANDED_KEY = "drawer-expanded";

export default function AppLayout() {
  const theme = useTheme();

  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] = React.useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] = React.useState(false);

  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));

  const isNavigationExpanded = isOverMdViewport
    ? isDesktopNavigationExpanded
    : isMobileNavigationExpanded;

  const setNavigationExpanded = React.useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    value => {
      if (isOverMdViewport) {
        setIsDesktopNavigationExpanded(value);
      } else {
        setIsMobileNavigationExpanded(value);
      }
    },
    [isOverMdViewport], // ✅ só recria quando muda o breakpoint
  );

  // 🔹 Restaurar estado do Drawer salvo
  React.useEffect(() => {
    const stored = localStorage.getItem(DRAWER_EXPANDED_KEY);
    if (stored !== null) {
      setNavigationExpanded(stored === "true");
    }
  }, [setNavigationExpanded]);

  // 🔹 Salvar estado do Drawer
  React.useEffect(() => {
    localStorage.setItem(DRAWER_EXPANDED_KEY, String(isNavigationExpanded));
  }, [isNavigationExpanded]);

  const handleToggleHeaderMenu = React.useCallback(() => {
    setNavigationExpanded(prev => !prev);
  }, [setNavigationExpanded]);

  const layoutRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={layoutRef}
      sx={{
        position: "relative",
        display: "flex",
        overflow: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      <AppBar
        logo={<SitemarkIcon />}
        title="GMLT Admin"
        menuOpen={isNavigationExpanded}
        onToggleMenu={handleToggleHeaderMenu}
      />

      <Drawer
        expanded={isNavigationExpanded}
        setExpanded={setNavigationExpanded} // ✅ Corrigido
        container={layoutRef?.current ?? undefined}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ displayPrint: "none" }} />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
