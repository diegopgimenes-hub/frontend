import api from "@/api/axiosInstance";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";

// DTOs
interface DriverSelectDTO {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
}

interface DriverDTO extends DriverSelectDTO {
  cnh?: string;
  categoria?: string;
  validadeCnh?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  placaVeiculo?: string;
  tipoVeiculo?: string;
  observacoes?: string;
}

// ====================== COMPONENTE PRINCIPAL ======================
const DriverBoard: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<DriverSelectDTO[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverDTO | null>(null);

  // --- busca opções para o autocomplete ---
  useEffect(() => {
    if (query.trim().length < 2) {
      setOptions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await api.get<DriverSelectDTO[]>("/api/drivers/selection", {
          params: { q: query },
        });
        setOptions(response.data ?? []);
      } catch (err) {
        console.error("Erro ao buscar motoristas:", err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  // --- quando um motorista é selecionado ---
  const handleSelect = async (driver: DriverSelectDTO | null) => {
    if (!driver) {
      setSelectedDriver(null);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get<DriverDTO>(`/api/drivers/${driver.id}`);
      setSelectedDriver(response.data);
    } catch (err) {
      console.error("Erro ao carregar dados do motorista:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- renderização ---
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Quadro do Motorista
      </Typography>

      {/* Campo de seleção */}
      <Autocomplete
        fullWidth
        options={options}
        getOptionLabel={(option) => `${option.nome} — CPF: ${option.cpf} — Cel: ${option.celular}`}
        loading={loading}
        onInputChange={(_, value) => setQuery(value)}
        onChange={(_, value) => handleSelect(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecione o motorista"
            variant="outlined"
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
        sx={{ mb: 3, mt: 1 }}
      />

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Dados do Motorista" />
        <Tab label="Romaneios do Motorista" />
        <Tab label="Notas Fiscais" />
      </Tabs>

      {/* Conteúdo das abas */}
      {tab === 0 && (
        <Card variant="outlined">
          <CardContent>
            {selectedDriver ? (
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Nome:</Typography>
                  <Typography>{selectedDriver.nome}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">CPF:</Typography>
                  <Typography>{selectedDriver.cpf}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Celular:</Typography>
                  <Typography>{selectedDriver.celular}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">CNH:</Typography>
                  <Typography>{selectedDriver.cnh || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Categoria:</Typography>
                  <Typography>{selectedDriver.categoria || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Validade CNH:</Typography>
                  <Typography>{selectedDriver.validadeCnh || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Typography variant="subtitle2">Endereço:</Typography>
                  <Typography>{selectedDriver.endereco || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Cidade:</Typography>
                  <Typography>{selectedDriver.cidade || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Estado:</Typography>
                  <Typography>{selectedDriver.estado || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Placa do Veículo:</Typography>
                  <Typography>{selectedDriver.placaVeiculo || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Tipo de Veículo:</Typography>
                  <Typography>{selectedDriver.tipoVeiculo || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Typography variant="subtitle2">Observações:</Typography>
                  <Typography>{selectedDriver.observacoes || "-"}</Typography>
                </Grid2>
              </Grid2>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Selecione um motorista para visualizar os dados.
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Typography variant="body2" color="text.secondary">
          (Em breve) Aqui serão listados os romaneios do motorista.
        </Typography>
      )}

      {tab === 2 && (
        <Typography variant="body2" color="text.secondary">
          (Em breve) Aqui serão listadas as notas fiscais do motorista.
        </Typography>
      )}
    </Box>
  );
};

export default DriverBoard;
