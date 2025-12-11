import { useColorMode } from "@/context/ColorModeContext";
import Tooltip from "@mui/material/Tooltip";

import { DarkModeIcon, IconButton, LightModeIcon } from "@/icons";

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useColorMode(); // ✅ hook do contexto
  const isDark = mode === "dark";

  return (
    <Tooltip title={`Alternar para modo ${isDark ? "claro" : "escuro"}`} enterDelay={500}>
      <IconButton
        size="small"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        onClick={toggleColorMode}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
