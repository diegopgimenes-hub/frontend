// 📄 src/components/home/HomePage.tsx
import { Box, Paper, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo ao Sistema
        </Typography>
        <Typography variant="body1">
          Esta é a página inicial do sistema. Aqui você pode visualizar informações gerais ou
          atalhos para as principais funcionalidades.
        </Typography>
      </Paper>
    </Box>
  );
}
