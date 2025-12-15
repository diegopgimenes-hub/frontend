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

  const setNavigationExpanded = React.useCallback(
    (value: boolean) => {
      if (isOverMdViewport) setIsDesktopNavigationExpanded(value);
      else setIsMobileNavigationExpanded(value);
    },
    [isOverMdViewport],
  );

  React.useEffect(() => {
    const stored = localStorage.getItem(DRAWER_EXPANDED_KEY);
    if (stored !== null) setNavigationExpanded(stored === "true");
  }, [setNavigationExpanded]);

  React.useEffect(() => {
    localStorage.setItem(DRAWER_EXPANDED_KEY, String(isNavigationExpanded));
  }, [isNavigationExpanded]);

  const handleToggleHeaderMenu = React.useCallback(() => {
    setNavigationExpanded((prev) => !prev);
  }, [setNavigationExpanded]);

  const layoutRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={layoutRef}
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden", // drawer precisa disso
        bgcolor: "background.default",
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
        setExpanded={setNavigationExpanded}
        container={layoutRef?.current ?? undefined}
      />

      {/* 🔽 Container principal com scroll */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: `${theme.palette.primary.main} transparent`,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor:
              theme.palette.mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
