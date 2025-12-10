import api from "@/api/axiosInstance";
import { DriverDTO, DriverSelectDTO } from "@/types/driver";
import { RomaneioDTO, RomaneioSimpleDTO } from "@/types/romaneio";
import { Alert, Box, IconButton, Snackbar, Tab, Tabs, Typography } from "@mui/material";
import { Search } from "lucide-react";
import React, { useState } from "react";
import DriverDataTab from "./driver/DriverDataTab";
import DriverSelectionDialog from "./driver/DriverSelectionDialog";
import DriverRomaneiosTab from "./romaneio/DriverRomaneiosTab";

const DriverBoard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const [selectedDriver, setSelectedDriver] = useState<DriverSelectDTO | null>(null);
  const [driverDetails, setDriverDetails] = useState<DriverDTO | null>(null);
  const [romaneios, setRomaneios] = useState<RomaneioSimpleDTO[]>([]);
  const [romaneioDetails, setRomaneioDetails] = useState<RomaneioDTO | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [_loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "warning" | "info",
  });

  const showMessage = (msg: string, sev: "success" | "error" | "warning" | "info" = "info") =>
    setSnackbar({ open: true, message: msg, severity: sev });

  const handleSelectDriver = async (driver: DriverSelectDTO) => {
    try {
      setLoading(true);
      setSelectedDriver(driver);
      setOpenDialog(false);

      const driverRes = await api.get<DriverDTO>(`/api/drivers/${driver.id}`);
      setDriverDetails(driverRes.data);

      const romaneiosRes = await api.get<RomaneioSimpleDTO[]>(
        `/api/romaneios/driver/${driverRes.data.codMot}/last`,
      );
      setRomaneios(romaneiosRes.data);

      showMessage(`Motorista ${driver.nome} carregado com sucesso.`, "success");
    } catch (err) {
      console.error(err);
      showMessage("Erro ao carregar motorista.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Quadro do Motorista{" "}
          {selectedDriver ? (
            <Typography component="span" color="text.secondary">
              ({selectedDriver.nome} — CPF: {selectedDriver.cpf} — Cel: {selectedDriver.celular})
            </Typography>
          ) : (
            <Typography component="span" color="text.secondary">
              (Nenhum motorista selecionado)
            </Typography>
          )}
        </Typography>

        <IconButton color="primary" onClick={() => setOpenDialog(true)}>
          <Search />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mt: 2 }}>
        <Tab label="Dados do Motorista" />
        <Tab label="Romaneios do Motorista" />
        <Tab label="Notas Fiscais" />
      </Tabs>

      {/* Conteúdo das abas */}
      {tabValue === 0 && <DriverDataTab driver={driverDetails} />}

      {tabValue === 1 && (
        <DriverRomaneiosTab
          selectedDriver={selectedDriver}
          romaneios={romaneios}
          romaneioDetails={romaneioDetails}
          setRomaneioDetails={setRomaneioDetails}
        />
      )}

      {/* Modal de seleção */}
      <DriverSelectionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSelectDriver={handleSelectDriver}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DriverBoard;
