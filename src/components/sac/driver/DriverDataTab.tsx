import { DriverDTO } from "@/types/driver";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import DriverBancariosTab from "./tabs/DriverBancariosTab";
import DriverCadastraisTab from "./tabs/DriverCadastraisTab";
import DriverContatoTab from "./tabs/DriverContatoTab";
import DriverDocumentosTab from "./tabs/DriverDocumentosTab";
import DriverLogTab from "./tabs/DriverLogTab";

interface DriverDataTabProps {
  driver: DriverDTO | null;
}

const DriverDataTab: React.FC<DriverDataTabProps> = ({ driver }) => {
  const [tabIndex, setTabIndex] = useState(0);

  if (!driver) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        Nenhum motorista selecionado.
      </Typography>
    );
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }} elevation={3}>
      <Box>
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 2 }}
        >
          <Tab label="Cadastrais" />
          <Tab label="Documentos" />
          <Tab label="Contato" />
          <Tab label="Bancários" />
          <Tab label="Log" />
        </Tabs>

        {tabIndex === 0 && <DriverCadastraisTab driver={driver} />}
        {tabIndex === 1 && <DriverDocumentosTab driver={driver} />}
        {tabIndex === 2 && <DriverContatoTab driver={driver} />}
        {tabIndex === 3 && <DriverBancariosTab driver={driver} />}
        {tabIndex === 4 && <DriverLogTab driver={driver} />}
      </Box>
    </Paper>
  );
};

export default DriverDataTab;
