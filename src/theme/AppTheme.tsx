// src/theme/AppTheme.tsx
import { buttonCustomizations } from "@/theme/customizations/button";
import { dataGridCustomizations } from "@/theme/customizations/dataGrid";
import { datePickersCustomizations } from "@/theme/customizations/datePickers";
import { formInputCustomizations } from "@/theme/customizations/formInput";
import { sidebarCustomizations } from "@/theme/customizations/sidebar";
import { PaletteMode, ThemeOptions } from "@mui/material";

export default function getDesignTokens(mode: PaletteMode): ThemeOptions {
  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f9fafb",
              paper: "#ffffff",
            },
            text: {
              primary: "#1a1a1a",
              secondary: "#4b5563",
            },
          }
        : {
            background: {
              default: "#0f172a",
              paper: "#1e293b",
            },
            text: {
              primary: "#f8fafc",
              secondary: "#cbd5e1",
            },
          }),
    },
    components: {
      ...dataGridCustomizations,
      ...datePickersCustomizations,
      ...formInputCustomizations,
      ...sidebarCustomizations,
      ...buttonCustomizations,
    },
  };
}
