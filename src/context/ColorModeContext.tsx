import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useMemo, useState } from "react";
import getDesignTokens from "../theme/AppTheme"; // ✅ importa a função pura

type ColorMode = "light" | "dark";

interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ColorMode>("light");

  const toggleColorMode = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"));
  };

  // 🧩 Cria o tema MUI com base nos tokens
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
