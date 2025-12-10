import { DriverDTO } from "@/types/driver";
import { Grid, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverBancariosTab({ driver }: Props) {
  if (!driver) return null;

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField label="Banco" value={driver.bcoMot || ""} fullWidth size="small" disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Agência" value={driver.agencia || ""} fullWidth size="small" disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Conta" value={driver.ctaMot || ""} fullWidth size="small" disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Operação" value={driver.bcoOp || ""} fullWidth size="small" disabled />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Favorecido"
            value={driver.nomFav || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Tipo Pix"
            value={driver.motTpPix || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Chave Pix"
            value={driver.motChPix || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
