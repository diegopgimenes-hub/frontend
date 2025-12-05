import { buttonCustomizations } from "@/theme/customizations/button";
import { dataGridCustomizations } from "@/theme/customizations/dataGrid";
import { datePickersCustomizations } from "@/theme/customizations/datePickers";
import { formInputCustomizations } from "@/theme/customizations/formInput";
import { sidebarCustomizations } from "@/theme/customizations/sidebar";
import { PaletteMode, ThemeOptions } from "@mui/material";

/**
 * Retorna as configurações de design do tema MUI
 * com base no modo (light/dark) e nas customizações padrão.
 */
export default function getDesignTokens(mode: PaletteMode): ThemeOptions {
  return {
    palette: {
      mode,
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
