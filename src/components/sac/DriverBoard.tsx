import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

// === COMPONENTE PRINCIPAL ===
export default function DriverBoard() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Título */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Quadro do Motorista
      </Typography>

      {/* Tabs */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Dados do Motorista" />
          <Tab label="Romaneios do Motorista" />
          <Tab label="Notas Fiscais" />
        </Tabs>

        {/* Conteúdo da aba */}
        <Box sx={{ p: 3 }}>
          {tabIndex === 0 && <DriverData />}
          {tabIndex === 1 && <DriverShipments />}
          {tabIndex === 2 && <DriverInvoices />}
        </Box>
      </Paper>
    </Box>
  );
}

// === TABS INTERNAS ===

function DriverData() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Dados do Motorista
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Aqui serão exibidos os dados cadastrais do motorista (nome, CPF, CNH, situação, etc).
      </Typography>
    </Box>
  );
}

function DriverShipments() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Romaneios do Motorista
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Aqui você poderá visualizar os romaneios associados ao motorista selecionado.
      </Typography>
    </Box>
  );
}

function DriverInvoices() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Notas Fiscais
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Aqui serão listadas as notas fiscais vinculadas ao motorista.
      </Typography>
    </Box>
  );
}
