import { DriverDTO } from "@/types/driver";
import { Box, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverLogTab({ driver }: Props) {
  if (!driver) return null;

  return (
    <Paper sx={{ p: 2, mt: 2 }} elevation={3}>
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
            label="Cód. Usu. Inc"
            value={driver.uCodInc || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Nome Usu. Inc"
            value={driver.nCodInc || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="DT Inclusão"
            value={driver.dtaInc || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="HR. Inclusão"
            value={driver.hrInc || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="DT Atualização"
            value={driver.datau || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="HR. Atualização"
            value={driver.horau || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
      </Box>
    </Paper>
  );
}
