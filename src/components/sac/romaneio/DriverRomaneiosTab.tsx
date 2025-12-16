import api from "@/api/axiosInstance";
import { DriverSelectDTO } from "@/types/driver";
import { RomaneioDTO, RomaneioSimpleDTO } from "@/types/romaneio";
import { formatarDataHora } from "@/utils/format";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
  selectedDriver: DriverSelectDTO | null;
  romaneios: RomaneioSimpleDTO[];
}

const DriverRomaneiosTab: React.FC<Props> = ({ selectedDriver, romaneios }) => {
  const [romaneioDetails, setRomaneioDetails] = useState<RomaneioDTO | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Adiciona keyframes de highlight dinamicamente (sem CSS externo)
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes highlightFade {
        0% { background-color: rgba(25, 118, 210, 0.25); transform: scale(1.02); }
        50% { background-color: rgba(25, 118, 210, 0.15); transform: scale(1.015); }
        100% { background-color: transparent; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Busca os detalhes do romaneio pelo ID
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

  // Seleciona automaticamente o primeiro romaneio ao trocar motorista
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
  }, [selectedDriver, romaneios, selectedId]);

  const handleSelectRomaneio = (id: number) => {
    if (!id || id === selectedId) return;
    setSelectedId(id);
    fetchRomaneioDetails(id);
  };

  if (!selectedDriver)
    return <Typography color="text.secondary">Selecione um motorista primeiro.</Typography>;

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Lista de romaneios com scroll */}
      <Paper
        elevation={3}
        sx={{
          maxHeight: 240,
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <List dense>
          {romaneios.length > 0 ? (
            romaneios.map((r) => {
              const isSelected = selectedId === r.codigoId;

              return (
                <ListItem disablePadding key={r.codigoId ?? Math.random()}>
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => handleSelectRomaneio(r.codigoId!)}
                    sx={{
                      position: "relative",
                      transition: "background-color 0.3s ease, transform 0.2s ease",
                      ...(isSelected && {
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(100, 181, 246, 0.15)"
                            : "rgba(25, 118, 210, 0.1)",
                        animation: "highlightFade 1.5s ease",
                        transform: "scale(1.02)",
                      }),
                      "&:hover": {
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(144,202,249,0.25)"
                            : "rgba(33,150,243,0.15)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography fontWeight={500}>Romaneio #{r.codigoId ?? "-"}</Typography>
                      }
                      secondary={formatarDataHora(r.dtBipEmb, r.hrBipEmb)}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText primary="Nenhum romaneio encontrado." />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Indicador de carregamento */}
      {loading && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {/* Detalhes do romaneio selecionado */}
      {!loading && romaneioDetails && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Detalhes do Romaneio #{romaneioDetails.codigoId}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(12, 1fr)",
              },
              gap: 2,
            }}
          >
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Status"
                value={romaneioDetails.status || ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Tipo do Romaneio"
                value={romaneioDetails.tipo || ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Tipo da Carga"
                value={romaneioDetails.tipoCarga || ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Tipo do Documento"
                value={romaneioDetails.tipoDoc || ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Data do BIP Embarque"
                value={formatarDataHora(romaneioDetails.dtBipEmb, romaneioDetails.hrBipEmb) || ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Data da Seperação"
                value={formatarDataHora(romaneioDetails.dtSep, romaneioDetails.hrSep) || ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Data do BIP de Seperação"
                value={formatarDataHora(romaneioDetails.dtBipSep, romaneioDetails.hrBipSep) || ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Valor do Frete"
                value={romaneioDetails.vlFrete || ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default DriverRomaneiosTab;
