import api from "@/api/axiosInstance";
import { DriverSelectDTO } from "@/types/driver";
import { RomaneioSimpleDTO } from "@/types/romaneio";
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

interface Props {
  selectedDriver: DriverSelectDTO | null;
  romaneios: RomaneioSimpleDTO[];
  romaneioDetails: RomaneioSimpleDTO | null;
  setRomaneioDetails: (data: RomaneioSimpleDTO | null) => void;
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
          value={romaneioDetails?.codigoId ?? ""}
          label="Selecionar Romaneio"
          onChange={async (e) => {
            const id = e.target.value as number;
            const res = await api.get<RomaneioSimpleDTO>(`/api/romaneios/${id}`);
            setRomaneioDetails(res.data);
          }}
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

      {romaneioDetails && (
        <Card sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Romaneio #{romaneioDetails.codigoId}</Typography>
          <Typography>Data de Embarque: {romaneioDetails.dtBipEmb ?? "-"}</Typography>
          <Typography>Hora de Embarque: {romaneioDetails.hrBipEmb ?? "-"}</Typography>
        </Card>
      )}
    </Box>
  );
};

export default DriverRomaneiosTab;
