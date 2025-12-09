import api from "@/api/axiosInstance";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

// DTO mínimo — /api/drivers/selection
interface DriverSelectDTO {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
}

// DTO completo — /api/drivers/{id}
interface DriverDTO {
  codigoId: number;
  nomeMot: string;
  cpfMot: string;
  rgMot?: string;
  estadoMot?: string;
  dataNasc?: string;
  cnhMot?: string;
  catCnh?: string;
  vencCnh?: string;
  endMot?: string;
  cidAtual?: string;
  ufAtual?: string;
  telRes?: string;
  emailMot?: string;
  placaVeic?: string;
  tipoVeic?: string;
  propNom?: string;
  propCpf?: string;
  status?: string;
}

const DriverBoard: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<DriverDTO | null>(null);

  // Modal de seleção
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DriverSelectDTO[]>([]);
  const [searching, setSearching] = useState(false);

  // 🔍 Busca motoristas no modal
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setSearching(true);
        const response = await api.get<DriverSelectDTO[]>("/api/drivers/selection", {
          params: { q: query },
        });
        setResults(response.data ?? []);
      } catch (err) {
        console.error("Erro ao buscar motoristas:", err);
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  // 🧭 Seleciona motorista
  const handleSelect = async (driver: DriverSelectDTO) => {
    try {
      setLoading(true);
      const response = await api.get<DriverDTO>(`/api/drivers/${driver.id}`);
      setSelectedDriver(response.data);
      setModalOpen(false);
    } catch (err) {
      console.error("Erro ao carregar dados do motorista:", err);
      setSelectedDriver(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      {/* Cabeçalho com título e lupa */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          Quadro do Motorista{" "}
          <Typography component="span" variant="subtitle1" color="text.secondary">
            {selectedDriver
              ? `(${selectedDriver.nomeMot} — CPF: ${selectedDriver.cpfMot})`
              : "(Nenhum motorista selecionado)"}
          </Typography>
        </Typography>

        <IconButton onClick={() => setModalOpen(true)} color="primary" title="Selecionar motorista">
          <Search size={20} />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Dados do Motorista" />
        <Tab label="Romaneios do Motorista" />
        <Tab label="Notas Fiscais" />
      </Tabs>

      {/* Aba: Dados do Motorista */}
      {tab === 0 && (
        <Card variant="outlined">
          <CardContent>
            {loading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : selectedDriver ? (
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Nome:</Typography>
                  <Typography>{selectedDriver.nomeMot}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">CPF:</Typography>
                  <Typography>{selectedDriver.cpfMot}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">RG:</Typography>
                  <Typography>{selectedDriver.rgMot || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">CNH:</Typography>
                  <Typography>{selectedDriver.cnhMot || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Categoria:</Typography>
                  <Typography>{selectedDriver.catCnh || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Validade CNH:</Typography>
                  <Typography>{selectedDriver.vencCnh || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Typography variant="subtitle2">Endereço:</Typography>
                  <Typography>{selectedDriver.endMot || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Cidade Atual:</Typography>
                  <Typography>{selectedDriver.cidAtual || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">UF:</Typography>
                  <Typography>{selectedDriver.ufAtual || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Telefone:</Typography>
                  <Typography>{selectedDriver.telRes || "-"}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">E-mail:</Typography>
                  <Typography>{selectedDriver.emailMot || "-"}</Typography>
                </Grid2>
              </Grid2>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Selecione um motorista clicando na lupa acima.
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Aba: Romaneios */}
      {tab === 1 && (
        <Typography variant="body2" color="text.secondary">
          (Em breve) Aqui serão listados os romaneios do motorista.
        </Typography>
      )}

      {/* Aba: Notas Fiscais */}
      {tab === 2 && (
        <Typography variant="body2" color="text.secondary">
          (Em breve) Aqui serão listadas as notas fiscais do motorista.
        </Typography>
      )}

      {/* Modal de seleção de motorista */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Selecionar Motorista</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Buscar motorista"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              endAdornment: searching ? <CircularProgress size={20} /> : null,
            }}
          />
          <List>
            {results.map((driver) => (
              <ListItemButton key={driver.id} onClick={() => handleSelect(driver)}>
                <ListItemText
                  primary={driver.nome}
                  secondary={`CPF: ${driver.cpf} — Cel: ${driver.celular}`}
                />
              </ListItemButton>
            ))}
            {!searching && results.length === 0 && query.length >= 2 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, textAlign: "center" }}
              >
                Nenhum motorista encontrado.
              </Typography>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DriverBoard;
