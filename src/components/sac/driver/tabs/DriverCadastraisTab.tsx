import { DriverDTO } from "@/types/driver";
import { Box, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverCadastraisTab({ driver }: Props) {
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
        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField
            label="Nome Motorista"
            value={driver.nomeMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="CPF" value={driver.cpfMot || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Cartão Pagbem"
            value={driver.numPagbem || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Tipo Motorista"
            value={driver.tpMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Rastreado"
            value={driver.rastreado || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="Placa" value={driver.placaVeic || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Placa Carreta"
            value={driver.placaCar || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="ANTT" value={driver.antt || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Vencimento ANTT"
            value={driver.anttVcto || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="RNTC" value={driver.rntc || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Vencimento Buonny"
            value={driver.venctoBon || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="CEP" value={driver.cepMot || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" }, gridColumn: "span 6" }} />

        {/* Endereço */}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField label="Endereço" value={driver.endMot || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
          <TextField label="Número" value={driver.numResMo || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" }, gridColumn: "span 3" }} />

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Bairro"
            value={driver.bairroMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Município"
            value={driver.cidAtual || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Região"
            value={driver.regiaoDes || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 2" } }}>
          <TextField label="UF" value={driver.ufAtual || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" }, gridColumn: "span 10" }} />

        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField label="E-mail" value={driver.emailMot || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="Situação" value={driver.status || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" }, gridColumn: "span 6" }} />
      </Box>
    </Paper>
  );
}
