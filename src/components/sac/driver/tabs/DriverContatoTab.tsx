import { DriverDTO } from "@/types/driver";
import { Box, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverContatoTab({ driver }: Props) {
  if (!driver) return null;

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
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
          <TextField label="Celular" value={driver.telRes || ""} fullWidth size="small" disabled />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Contato"
            value={driver.cont1Mot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Tel. Com."
            value={driver.telCom || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Contato"
            value={driver.cont2Mot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Tel. Ref. 1"
            value={driver.ref1Mot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Contato"
            value={driver.cont3Mot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Tel. Ref. 2"
            value={driver.ref2Mot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Contato"
            value={driver.cont4Mot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
      </Box>
    </Paper>
  );
}
