import { DriverDTO } from "@/types/driver";
import { formatDate } from "@/utils/format";
import { Box, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverCadastraisTab({ driver }: Props) {
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
        {/* Nome — sempre linha inteira */}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField
            label="Nome Motorista"
            value={driver.nomeMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        {/* CPF e RG na linha abaixo */}
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
          <TextField label="CPF" value={driver.cpfMot || ""} fullWidth size="small" disabled />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
          <TextField
            label="Cartão Pagbem"
            value={driver.numPagbem || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
          <TextField label="RG" value={driver.rgMot || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
          <TextField
            label="Data Nascimento"
            value={formatDate(driver.dataNasc)}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
          <TextField
            label="Cidade Nascimento"
            value={driver.cidadeNas || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
          <TextField
            label="UF Nascimento"
            value={driver.estadoNas || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        {/* Endereço */}
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="Endereço" value={driver.endMot || ""} fullWidth size="small" disabled />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 2" } }}>
          <TextField label="Número" value={driver.numResMo || ""} fullWidth size="small" disabled />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
          <TextField
            label="Bairro"
            value={driver.bairroMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        {/* Cidade / UF / CEP */}
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
          <TextField label="Cidade" value={driver.cidAtual || ""} fullWidth size="small" disabled />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 2" } }}>
          <TextField label="UF" value={driver.ufAtual || ""} fullWidth size="small" disabled />
        </Box>
        <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
          <TextField label="CEP" value={driver.cepMot || ""} fullWidth size="small" disabled />
        </Box>
      </Box>
    </Paper>
  );
}
