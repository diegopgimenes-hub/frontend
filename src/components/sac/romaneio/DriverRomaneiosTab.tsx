import api from "@/api/axiosInstance";
import { DriverSelectDTO } from "@/types/driver";
import { RomaneioDTO, RomaneioSimpleDTO } from "@/types/romaneio";
import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import React, { useEffect, useState } from "react";

dayjs.locale("pt-br");

interface Props {
  selectedDriver: DriverSelectDTO | null;
  romaneios: RomaneioSimpleDTO[];
}

const DriverRomaneiosTab: React.FC<Props> = ({ selectedDriver, romaneios }) => {
  const [romaneioDetails, setRomaneioDetails] = useState<RomaneioDTO | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Função para buscar detalhes
  const fetchRomaneioDetails = async (id: number) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.get<RomaneioDTO>(`/api/romaneios/${id}`);
      setRomaneioDetails(res.data);
    } catch (err) {
      console.error("Erro ao buscar detalhes do romaneio:", err);
    } finally {
      setLoading(false);
    }
  };

  // Selecionar automaticamente o primeiro romaneio quando o motorista mudar
  useEffect(() => {
    if (romaneios.length > 0) {
      const primeiro = romaneios[0];
      if (primeiro?.codigoId && primeiro.codigoId !== selectedId) {
        setSelectedId(primeiro.codigoId);
        fetchRomaneioDetails(primeiro.codigoId);
      }
    } else {
      setSelectedId(null);
      setRomaneioDetails(null);
    }
  }, [selectedDriver, romaneios]);

  const handleSelectRomaneio = (id: number) => {
    if (!id || id === selectedId) return;
    setSelectedId(id);
    fetchRomaneioDetails(id);
  };

  // Helpers
  const formatarDataHora = (data?: string, hora?: string) => {
    if (!data) return "Sem data";
    const formatada = dayjs(data).format("DD/MM/YYYY");
    return hora ? `${formatada} às ${hora}` : formatada;
  };

  const getStatusChipColor = (status?: string) => {
    switch ((status ?? "").toUpperCase()) {
      case "F":
      case "FINALIZADO":
        return "success";
      case "E":
      case "EM ANDAMENTO":
        return "warning";
      case "C":
      case "CANCELADO":
        return "error";
      default:
        return "default";
    }
  };

  if (!selectedDriver)
    return <Typography color="text.secondary">Selecione um motorista primeiro.</Typography>;

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Lista de romaneios */}
      <Paper
        elevation={2}
        sx={{
          maxHeight: 240,
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <List dense>
          {romaneios.length > 0 ? (
            romaneios.map((r) => (
              <ListItem disablePadding key={r.codigoId}>
                <ListItemButton
                  selected={selectedId === r.codigoId}
                  onClick={() => handleSelectRomaneio(r.codigoId!)}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography fontWeight={500}>Romaneio #{r.codigoId ?? "-"}</Typography>
                        {r.status && (
                          <Chip
                            size="small"
                            label={r.status}
                            color={getStatusChipColor(r.status)}
                          />
                        )}
                      </Box>
                    }
                    secondary={formatarDataHora(r.dtBipEmb, r.hrBipEmb)}
                  />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Nenhum romaneio encontrado." />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Loading */}
      {loading && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {/* Detalhes */}
      {!loading && romaneioDetails && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Detalhes do Romaneio #{romaneioDetails.codigoId}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Motorista
              </Typography>
              <Typography variant="subtitle1">{romaneioDetails.motNome ?? "-"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Placa
              </Typography>
              <Typography variant="subtitle1">{romaneioDetails.placaM1 ?? "-"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Chip
                size="small"
                label={romaneioDetails.status ?? "-"}
                color={getStatusChipColor(romaneioDetails.status)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Data de Embarque
              </Typography>
              <Typography variant="subtitle1">
                {formatarDataHora(romaneioDetails.dtBipEmb, romaneioDetails.hrBipEmb)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Peso Total
              </Typography>
              <Typography variant="subtitle1">{romaneioDetails.totPeso ?? "-"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Valor do Frete
              </Typography>
              <Typography variant="subtitle1">
                {romaneioDetails.vlFrete ? `R$ ${romaneioDetails.vlFrete.toFixed(2)}` : "-"}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )}
    </Box>
  );
};

export default DriverRomaneiosTab;
