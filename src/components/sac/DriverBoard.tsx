import api from "@/api/axiosInstance";
import { RomaneioDTO, RomaneioSimpleDTO } from "@/types/romaneio";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface DriverSelectDTO {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
}

interface DriverDTO {
  codigoId: number;
  nomeMot: string;
  cpfMot: string;
  rgMot: string;
  cnhMot: string;
  catCnh: string;
  vencCnh: string;
  endMot: string;
  bairroMot: string;
  cidAtual: string;
  ufAtual: string;
  cepMot: string;
  telRes: string;
  emailMot: string;
  placaVeic: string;
  modeloVei: string;
  corVeic: string;
  tipoVeic: string;
  antt: string;
  status: string;
  [key: string]: any;
}

const DriverBoard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDriver, setSelectedDriver] = useState<DriverSelectDTO | null>(null);
  const [driverDetails, setDriverDetails] = useState<DriverDTO | null>(null);
  const [driverList, setDriverList] = useState<DriverSelectDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [romaneios, setRomaneios] = useState<RomaneioSimpleDTO[]>([]);
  const [selectedRomaneioId, setSelectedRomaneioId] = useState<number | null>(null);
  const [romaneioDetails, setRomaneioDetails] = useState<RomaneioDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "warning" | "info",
  });

  const showMessage = (
    message: string,
    severity: "success" | "error" | "warning" | "info" = "info",
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  // 🔍 Buscar motoristas por texto
  const handleSearchDrivers = async () => {
    try {
      const res = await api.get<DriverSelectDTO[]>(`/api/drivers/selection?q=${searchQuery}`);
      setDriverList(res.data);
    } catch (err) {
      showMessage("Erro ao buscar motoristas.", "error");
      console.error(err);
    }
  };

  // ✅ Selecionar motorista → carrega detalhes e romaneios
  const handleSelectDriver = async (driver: DriverSelectDTO) => {
    try {
      setLoading(true);
      setSelectedDriver(driver);
      setOpenModal(false);

      // Carregar dados completos do motorista
      const driverRes = await api.get<DriverDTO>(`/api/drivers/${driver.id}`);
      setDriverDetails(driverRes.data);

      // Carregar romaneios do motorista
      const romaneiosRes = await api.get<RomaneioSimpleDTO[]>(
        `/api/romaneios/driver/${driverRes.data.codMot || driverRes.data.codigoId}/last`,
      );
      setRomaneios(romaneiosRes.data);
      setRomaneioDetails(null);
      setSelectedRomaneioId(null);

      showMessage(`Motorista ${driver.nome} carregado com sucesso.`, "success");
    } catch (err) {
      console.error(err);
      showMessage("Erro ao carregar dados do motorista.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeTab = (_: any, newValue: number) => setTabValue(newValue);

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Quadro do Motorista{" "}
          {selectedDriver ? (
            <Typography component="span" color="text.secondary" fontSize="1rem">
              ({selectedDriver.nome} — CPF: {selectedDriver.cpf} — Cel: {selectedDriver.celular})
            </Typography>
          ) : (
            <Typography component="span" color="text.secondary" fontSize="1rem">
              (Nenhum motorista selecionado)
            </Typography>
          )}
        </Typography>
        <IconButton color="primary" onClick={() => setOpenModal(true)}>
          <Search />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleChangeTab} sx={{ mt: 2 }}>
        <Tab label="Dados do Motorista" />
        <Tab label="Romaneios do Motorista" />
        <Tab label="Notas Fiscais" />
      </Tabs>

      {/* === Aba: Dados do Motorista === */}
      {tabValue === 0 && (
        <Box sx={{ mt: 3 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : !driverDetails ? (
            <Typography color="text.secondary">
              Selecione um motorista para visualizar os dados.
            </Typography>
          ) : (
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Grid container spacing={2}>
                {Object.entries(driverDetails).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Typography variant="body2">
                      <strong>{key}:</strong> {value ?? "—"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Card>
          )}
        </Box>
      )}

      {/* === Aba: Romaneios do Motorista === */}
      {tabValue === 1 && (
        <Box sx={{ mt: 2 }}>
          {!selectedDriver ? (
            <Typography variant="body1" color="text.secondary">
              Selecione um motorista para visualizar seus romaneios.
            </Typography>
          ) : (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel id="romaneio-select-label">Selecionar Romaneio</InputLabel>
                <Select
                  labelId="romaneio-select-label"
                  value={selectedRomaneioId || ""}
                  label="Selecionar Romaneio"
                  onChange={async (e) => {
                    const id = e.target.value as number;
                    setSelectedRomaneioId(id);
                    try {
                      const response = await api.get<RomaneioDTO>(`/api/romaneios/${id}`);
                      setRomaneioDetails(response.data);
                    } catch (err) {
                      console.error("Erro ao buscar romaneio:", err);
                      showMessage("Erro ao buscar detalhes do romaneio.", "error");
                    }
                  }}
                >
                  {romaneios.length > 0 ? (
                    romaneios.map((r) => (
                      <MenuItem key={r.id} value={r.id}>
                        {`Romaneio #${r.id} — ${r.dataEmbarque ?? "Sem data"} ${
                          r.horaEmbarque ?? ""
                        }`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Nenhum romaneio encontrado</MenuItem>
                  )}
                </Select>
              </FormControl>

              {romaneioDetails && (
                <Card sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Detalhes do Romaneio #{romaneioDetails.codigoId}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">
                        <strong>Status:</strong> {romaneioDetails.status ?? "—"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Motorista:</strong> {romaneioDetails.motNome ?? "—"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Cliente:</strong> {romaneioDetails.cliente ?? "—"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">
                        <strong>Placa:</strong> {romaneioDetails.placaM1 ?? "—"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Peso Total:</strong>{" "}
                        {romaneioDetails.totPeso ? `${romaneioDetails.totPeso} kg` : "—"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Valor Frete:</strong>{" "}
                        {romaneioDetails.vlFrete ? `R$ ${romaneioDetails.vlFrete.toFixed(2)}` : "—"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              )}
            </>
          )}
        </Box>
      )}

      {/* === Modal de seleção de motoristas === */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Selecionar Motorista</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <input
              type="text"
              placeholder="Buscar motorista..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <Button onClick={handleSearchDrivers} variant="contained">
              Buscar
            </Button>
          </Box>
          {driverList.length === 0 ? (
            <Typography color="text.secondary">Nenhum motorista encontrado.</Typography>
          ) : (
            driverList.map((d) => (
              <Card
                key={d.id}
                sx={{
                  mb: 1,
                  p: 1.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => handleSelectDriver(d)}
              >
                <Typography fontWeight="bold">{d.nome}</Typography>
                <Typography variant="body2">CPF: {d.cpf}</Typography>
                <Typography variant="body2">Celular: {d.celular}</Typography>
              </Card>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DriverBoard;
