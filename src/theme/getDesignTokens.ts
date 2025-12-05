import { PaletteMode, ThemeOptions } from "@mui/material";

export default function getDesignTokens(mode: PaletteMode): ThemeOptions {
  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // tema claro
            background: { default: "#f9f9f9", paper: "#fff" },
            text: { primary: "#000", secondary: "#555" },
          }
        : {
            // tema escuro
            background: { default: "#121212", paper: "#1d1d1d" },
            text: { primary: "#fff", secondary: "#bbb" },
          }),
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  };
}
