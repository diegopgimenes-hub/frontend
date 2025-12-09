import api from "@/api/axiosInstance";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

// === Tipos ===
interface Driver {
  id: number;
  name: string;
  cpf?: string;
  celular?: string;
}

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
  const [query, setQuery] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setDrivers([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await api.get<Driver[]>("/api/drivers/selection", {
          params: { q: query },
        });
        setDrivers(response.data);
      } catch (err) {
        console.error("Erro ao buscar motoristas:", err);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce de 400ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Dados do Motorista
      </Typography>

      {/* Campo de seleção de motorista */}
      <Autocomplete
        options={drivers}
        getOptionLabel={(option) => option.name}
        value={selectedDriver}
        loading={loading}
        onInputChange={(_, value) => setQuery(value)}
        onChange={(_, value) => setSelectedDriver(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecione o motorista"
            placeholder="Digite o nome ou CPF"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        sx={{ maxWidth: 400, mb: 3 }}
      />

      {/* Exibe dados do motorista selecionado */}
      {selectedDriver && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {selectedDriver.name}
          </Typography>
          {selectedDriver.cpf && (
            <Typography variant="body2" color="text.secondary">
              CPF: {selectedDriver.cpf}
            </Typography>
          )}
        </Paper>
      )}
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
