import { DriverDTO } from "@/types/driver";
import { formatDate } from "@/utils/format";
import { Grid, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverLogTab({ driver }: Props) {
  if (!driver) return null;

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Nível App"
            value={driver.nivelApp || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Bloqueio App"
            value={driver.bloqueioApp || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Bloqueio Administrativo"
            value={driver.bloqueioA || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Data Última Atualização"
            value={formatDate(driver.datau)}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Hora Última Atualização"
            value={driver.horau || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Status" value={driver.status || ""} fullWidth size="small" disabled />
        </Grid>
      </Grid>
    </Paper>
  );
}
