import { DriverDTO } from "@/types/driver";
import { formatDate } from "@/utils/format";
import { Grid, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverDocumentosTab({ driver }: Props) {
  if (!driver) return null;

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="UF Emissor RG"
            value={driver.ufEmissor || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Data Emissão RG"
            value={formatDate(driver.dataEmiss)}
            fullWidth
            size="small"
            disabled
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField label="CNH" value={driver.cnhMot || ""} fullWidth size="small" disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Categoria"
            value={driver.catCnh || ""}
            fullWidth
            size="small"
            disabled
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Data 1ª Habilitação"
            value={formatDate(driver.data1Habi)}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Vencimento CNH"
            value={formatDate(driver.vencCnh)}
            fullWidth
            size="small"
            disabled
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField label="ANTT" value={driver.antt || ""} fullWidth size="small" disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Vencimento ANTT"
            value={formatDate(driver.anttVcto)}
            fullWidth
            size="small"
            disabled
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField label="RNTC" value={driver.rntc || ""} fullWidth size="small" disabled />
        </Grid>
      </Grid>
    </Paper>
  );
}
