import { RomaneioDTO } from "@/types/romaneio";
import { Box, Card, Paper, TextField, Typography } from "@mui/material";
import React from "react";

interface Props {
  romaneioDetails: RomaneioDTO | null;
}

const DriverRomaneiosItensTab: React.FC<Props> = ({ romaneioDetails }) => {
  if (!romaneioDetails) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Selecione um romaneio para visualizar seus itens.
      </Typography>
    );
  }

  const itens = romaneioDetails.itens ?? [];

  if (itens.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Nenhum item encontrado para este romaneio.
      </Typography>
    );
  }

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>
        Itens do Romaneio
      </Typography>

      {itens.map((item, index) => (
        <Paper key={item.codigoId ?? index} elevation={3} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
              gap: 2,
            }}
          >
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 2" } }}>
              <TextField
                label="Código"
                value={item.codigoId ?? ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 2" } }}>
              <TextField
                label="Número da NFe"
                value={item.nf ?? ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
              <TextField
                label="Chave da NFe"
                value={item.chaveNfe ?? ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
              <TextField
                label="Nome do CD"
                value={item.nomeCd ?? ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
              <TextField
                label="Valor da NFe"
                value={item.valorNf ? `R$ ${item.valorNf.toFixed(2)}` : ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
              <TextField
                label="Peso Total"
                value={item.peso ?? ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Observação"
                value={item.obs ?? ""}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            {/* 🔹 Remetente */}
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Remetente"
                value={`${item.remRazao ?? ""} (${item.remCnpj ?? ""})`}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            {/* 🔹 Destinatário */}
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Destinatário"
                value={`${item.nomeDest ?? ""} (${item.cnpj ?? ""})`}
                fullWidth
                size="small"
                disabled
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <TextField
                label="Município / Bairro"
                value={`${item.destMun ?? ""} - ${item.destBairr ?? ""}`}
                fullWidth
                size="small"
                disabled
              />
            </Box>
          </Box>
        </Paper>
      ))}
    </Card>
  );
};

export default DriverRomaneiosItensTab;
