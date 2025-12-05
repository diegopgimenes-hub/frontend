import { useColorMode } from "@/context/ColorModeContext"; // ✅ usa o contexto certo
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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
