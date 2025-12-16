import api from "@/api/axiosInstance";
import { DriverSelectDTO } from "@/types/driver";
import { RomaneioDTO, RomaneioSimpleDTO } from "@/types/romaneio";
import { formatarDataHora } from "@/utils/format";
import {
  Box,
  Card,
  CircularProgress,
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
                      </Box>
                    }
                    secondary={formatarDataHora(r.dtBipEmb ?? undefined, r.hrBipEmb ?? undefined)}
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

      {/* Dados do Romaneio */}
      {!loading && romaneioDetails && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}>
            Dados do Romaneio
          </Typography>

          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
                gap: 2,
              }}
            >
              <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                <TextField
                  label="Motorista"
                  value={romaneioDetails.motNome || ""}
                  fullWidth
                  size="small"
                  disabled
                />
              </Box>

              <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                <TextField
                  label="Placa"
                  value={romaneioDetails.placaM1 || ""}
                  fullWidth
                  size="small"
                  disabled
                />
              </Box>

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
                  label="Data de Embarque"
                  value={formatarDataHora(
                    romaneioDetails.dtBipEmb ?? undefined,
                    romaneioDetails.hrBipEmb ?? undefined,
                  )}
                  fullWidth
                  size="small"
                  disabled
                />
              </Box>

              <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                <TextField
                  label="Peso Total"
                  value={romaneioDetails.totPeso ?? ""}
                  fullWidth
                  size="small"
                  disabled
                />
              </Box>

              <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                <TextField
                  label="Valor do Frete"
                  value={romaneioDetails.vlFrete ? `R$ ${romaneioDetails.vlFrete.toFixed(2)}` : ""}
                  fullWidth
                  size="small"
                  disabled
                />
              </Box>
            </Box>
          </Paper>

          <Box sx={{ mt: 3 }} />
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}>
            Itens do Romaneio
          </Typography>

          {(romaneioDetails.itens ?? []).map((item, index) => (
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 2 }} key={item.codigoId ?? index}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
                  gap: 2,
                }}
              >
                <Box sx={{ gridColumn: { xs: "span 12", md: "span 2" } }}>
                  <TextField
                    label="Código"
                    value={item.codigoId ?? ""}
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 12", md: "span 2" } }}>
                  <TextField label="Nº NFe" value={item.nf ?? ""} fullWidth size="small" disabled />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
                  <TextField
                    label="Chave NFe"
                    value={item.chaveNfe ?? ""}
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
                  <TextField
                    label="Nome do CD"
                    value={item.nomeCd ?? ""}
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
                  <TextField
                    label="Valor da NFe"
                    value={item.valorNf ? `R$ ${item.valorNf.toFixed(2)}` : ""}
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
                  <TextField
                    label="Peso Total"
                    value={item.peso ?? ""}
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                  <TextField
                    label="Observação"
                    value={item.obs ?? ""}
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                  <TextField
                    label="Remetente"
                    value={`${item.remRazao ?? ""} (${item.remCnpj ?? ""})`}
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                  <TextField
                    label="Destinatário"
                    value={`${item.nomeDest ?? ""} (${item.cnpj ?? ""})`}
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
                  <TextField
                    label="Município / Bairro"
                    value={`${item.destMun ?? ""} - ${item.destBairr ?? ""}`}
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>
              </Box>
            </Paper>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default DriverRomaneiosTab;
