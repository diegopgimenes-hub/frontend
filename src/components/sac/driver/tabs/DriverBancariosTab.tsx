import { DriverDTO } from "@/types/driver";
import { Box, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverBancariosTab({ driver }: Props) {
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
            label="Cód. Banco"
            value={driver.bcoCod || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Nome Banco"
            value={driver.bcoMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="Agencia" value={driver.agencia || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="Operação" value={driver.bcoOp || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="Conta" value={driver.ctaMot || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" }, gridColumn: "span 6" }} />

        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField
            label="Nome Favorecido"
            value={driver.nomFav || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Tipo Chave PIX"
            value={driver.motTpPix || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" }, gridColumn: "span 6" }} />

        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField
            label="Chave PIX"
            value={driver.motChPix || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Nº Cartão Comb."
            value={driver.motNCvc || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="% Adian V. Comb."
            value={driver.motPAvc || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
      </Box>
    </Paper>
  );
}
