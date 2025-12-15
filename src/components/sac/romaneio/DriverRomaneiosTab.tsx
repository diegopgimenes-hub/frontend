import api from "@/api/axiosInstance";
import { DriverSelectDTO } from "@/types/driver";
import { RomaneioDTO, RomaneioSimpleDTO } from "@/types/romaneio";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  selectedDriver: DriverSelectDTO | null;
  romaneios: RomaneioSimpleDTO[];
}

const DriverRomaneiosTab: React.FC<Props> = ({ selectedDriver, romaneios }) => {
  const [romaneioDetails, setRomaneioDetails] = useState<RomaneioDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectRomaneio = async (id: number | "") => {
    if (!id) {
      setRomaneioDetails(null);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get<RomaneioDTO>(`/api/romaneios/${id}`);
      setRomaneioDetails(res.data);
    } catch (err) {
      console.error("Erro ao buscar romaneio:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedDriver)
    return <Typography color="text.secondary">Selecione um motorista primeiro.</Typography>;

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="romaneio-select-label">Selecionar Romaneio</InputLabel>
        <Select
          labelId="romaneio-select-label"
          value={romaneioDetails?.codigoId ?? ""}
          label="Selecionar Romaneio"
          onChange={(e) => handleSelectRomaneio(e.target.value as number | "")}
        >
          {romaneios.length ? (
            romaneios.map((r) => (
              <MenuItem key={r.codigoId} value={r.codigoId}>
                Romaneio #{r.codigoId} — {r.dtBipEmb ?? "sem data"} {r.hrBipEmb ?? ""}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Nenhum romaneio encontrado</MenuItem>
          )}
        </Select>
      </FormControl>

      {loading && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {!loading && romaneioDetails && (
        <Card sx={{ p: 3, mt: 3 }}>
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
              <Typography variant="subtitle1">{romaneioDetails.status ?? "-"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Data de Embarque
              </Typography>
              <Typography variant="subtitle1">{romaneioDetails.dtBipEmb ?? "-"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Hora de Embarque
              </Typography>
              <Typography variant="subtitle1">{romaneioDetails.hrBipEmb ?? "-"}</Typography>
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

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Cliente
              </Typography>
              <Typography variant="subtitle1">{romaneioDetails.cliente ?? "-"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Cidade Destino
              </Typography>
              <Typography variant="subtitle1">{romaneioDetails.coleta ?? "-"}</Typography>
            </Grid>
          </Grid>
        </Card>
      )}
    </Box>
  );
};

export default DriverRomaneiosTab;
