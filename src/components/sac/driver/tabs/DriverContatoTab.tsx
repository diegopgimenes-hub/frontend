import { DriverDTO } from "@/types/driver";
import { formatPhone } from "@/utils/format";
import { Grid, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverContatoTab({ driver }: Props) {
  if (!driver) return null;

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Telefone Residencial"
            value={formatPhone(driver.telRes)}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Telefone Comercial"
            value={formatPhone(driver.telCom)}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Contato 1"
            value={driver.cont1Mot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Contato 2"
            value={driver.cont2Mot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField label="E-mail" value={driver.emailMot || ""} fullWidth size="small" disabled />
        </Grid>
      </Grid>
    </Paper>
  );
}
