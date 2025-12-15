import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import getDesignTokens from "../theme/AppTheme";

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
  const [mode, setMode] = useState<ColorMode>(() => {
    // 🧠 Recupera o valor salvo do localStorage ou padrão "light"
    const savedMode = localStorage.getItem("colorMode") as ColorMode | null;
    return savedMode ?? "light";
  });

  // 💾 Atualiza o localStorage sempre que o modo muda
  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 🎨 Cria o tema com base no modo
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // 🌙 Suaviza a transição visual entre temas
  useEffect(() => {
    const root = document.documentElement;
    root.style.transition = "background-color 0.4s ease, color 0.4s ease";
  }, []);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        {/* ⬇️ aplica uma animação suave de transição ao fundo e texto */}
        <CssBaseline />
        <div
          style={{
            transition: "background-color 0.4s ease, color 0.4s ease",
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
