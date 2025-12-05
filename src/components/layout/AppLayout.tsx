import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
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

  const setIsNavigationExpanded = React.useCallback(
    (newExpanded: boolean) => {
      if (isOverMdViewport) {
        setIsDesktopNavigationExpanded(newExpanded);
      } else {
        setIsMobileNavigationExpanded(newExpanded);
      }
    },
    [isOverMdViewport],
  );

  // ✅ Sincroniza com localStorage ao iniciar
  React.useEffect(() => {
    const stored = localStorage.getItem(DRAWER_EXPANDED_KEY);
    if (stored !== null) {
      setIsDesktopNavigationExpanded(stored === "true");
    }
  }, []);

  // ✅ Persiste sempre que mudar
  React.useEffect(() => {
    localStorage.setItem(DRAWER_EXPANDED_KEY, String(isDesktopNavigationExpanded));
  }, [isDesktopNavigationExpanded]);

  // ✅ Toggle via AppBar
  const handleToggleHeaderMenu = React.useCallback(() => {
    setIsNavigationExpanded(!isNavigationExpanded);
  }, [isNavigationExpanded, setIsNavigationExpanded]);

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
        setExpanded={setIsNavigationExpanded}
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
