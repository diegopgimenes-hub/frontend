import { DriverDTO } from "@/types/driver";
import { Box, Paper, TextField } from "@mui/material";

interface Props {
  driver: DriverDTO | null;
}

export default function DriverDocumentosTab({ driver }: Props) {
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
          <TextField
            label="Nº Registro CNH"
            value={driver.regCnh || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Cod. Seg. CNH"
            value={driver.cnhSeg || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Nº Espelho CNH"
            value={driver.cnhMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Categoria CNH"
            value={driver.catCnh || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="1ª Habilitação"
            value={driver.data1Habi || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Vencimento CNH"
            value={driver.vencCnh || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Dt. Emissão CNH"
            value={driver.dtEmiCnh || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Estado CNH"
            value={driver.estadoMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="RG" value={driver.rgMot || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" }, gridColumn: "span 6" }} />

        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField
            label="Nome da Mãe"
            value={driver.maeMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField
            label="Nome do Pai"
            value={driver.paiMot || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Data Emissão RG"
            value={driver.dataEmiss || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="UF Emissor RG"
            value={driver.ufEmissor || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Org. Emissor RG"
            value={driver.rgOrgEmi || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Data Nascimento"
            value={driver.dataNasc || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Cid. Nascimento"
            value={driver.cidadeNas || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField
            label="Est. Nascimento"
            value={driver.estadoNas || ""}
            fullWidth
            size="small"
            disabled
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="Nº PIS" value={driver.pisMot || ""} fullWidth size="small" disabled />
        </Box>

        <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          <TextField label="Nº INSS" value={driver.motInss || ""} fullWidth size="small" disabled />
        </Box>
      </Box>
    </Paper>
  );
}
