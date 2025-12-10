import api from "@/api/axiosInstance";
import { DriverSelectDTO } from "@/types/driver";
import { RomaneioDTO, RomaneioSimpleDTO } from "@/types/romaneio";
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

interface Props {
  selectedDriver: DriverSelectDTO | null;
  romaneios: RomaneioSimpleDTO[];
  romaneioDetails: RomaneioDTO | null;
  setRomaneioDetails: (data: RomaneioDTO | null) => void;
}

const DriverRomaneiosTab: React.FC<Props> = ({
  selectedDriver,
  romaneios,
  romaneioDetails,
  setRomaneioDetails,
}) => {
  if (!selectedDriver)
    return <Typography color="text.secondary">Selecione um motorista primeiro.</Typography>;

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="romaneio-select-label">Selecionar Romaneio</InputLabel>
        <Select
          labelId="romaneio-select-label"
          value={romaneioDetails?.codigoId || ""}
          label="Selecionar Romaneio"
          onChange={async (e) => {
            const id = e.target.value as number;
            const res = await api.get<RomaneioDTO>(`/api/romaneios/${id}`);
            setRomaneioDetails(res.data);
          }}
        >
          {romaneios.length ? (
            romaneios.map((r) => (
              <MenuItem key={r.id} value={r.id}>
                Romaneio #{r.id} — {r.dataEmbarque} {r.horaEmbarque}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Nenhum romaneio encontrado</MenuItem>
          )}
        </Select>
      </FormControl>

      {romaneioDetails && (
        <Card sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">
            Romaneio #{romaneioDetails.codigoId} — {romaneioDetails.status}
          </Typography>
          <Typography>Cliente: {romaneioDetails.cliente}</Typography>
          <Typography>Placa: {romaneioDetails.placaM1}</Typography>
          <Typography>Peso Total: {romaneioDetails.totPeso ?? "—"}</Typography>
          <Typography>Valor Frete: {romaneioDetails.vlFrete ?? "—"}</Typography>
        </Card>
      )}
    </Box>
  );
};

export default DriverRomaneiosTab;
