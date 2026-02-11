import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";

type PixManualPayload = {
  valor: number;
  data_pagamento: string; // yyyy-MM-dd
  chave: string;

  pagador_tipo_conta: string; // CC/CP/PP...
  pagador_agencia: string;
  pagador_conta: string; // conta+dv

  pagador_tipo_pessoa: string; // F/J
  pagador_documento: string; // CPF/CNPJ
  pagador_modulo_sispag: string;
};

type ApiResult = {
  status: number;
  statusText: string;
  contentType: string;
  bodyText: string;
  bodyPretty?: string;
};

function todayYYYYMMDD(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function tryPrettyJson(text: string): string | undefined {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return undefined;
  }
}

export default function PixManualPage() {
  const [endpointUrl, setEndpointUrl] = useState(
    "http://localhost:8080/api/test/itau/sispag/pix-chave",
  );

  const [form, setForm] = useState<PixManualPayload>({
    valor: 1.39,
    data_pagamento: todayYYYYMMDD(),
    chave: "32406779890",
    pagador_tipo_conta: "CC",
    pagador_agencia: "8884",
    pagador_conta: "00297758",
    pagador_tipo_pessoa: "J",
    pagador_documento: "04998632000147",
    pagador_modulo_sispag: "Fornecedores",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestJson = useMemo(() => JSON.stringify(form, null, 2), [form]);

  const handleChange =
    (key: keyof PixManualPayload) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setForm((prev) => {
        if (key === "valor") {
          const num = Number(value);
          return { ...prev, valor: Number.isFinite(num) ? num : 0 };
        }
        return { ...prev, [key]: value } as PixManualPayload;
      });
    };

  const executePost = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(endpointUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const contentType = resp.headers.get("content-type") || "";
      const bodyText = await resp.text();
      const bodyPretty = contentType.includes("application/json")
        ? tryPrettyJson(bodyText)
        : undefined;

      setResult({
        status: resp.status,
        statusText: resp.statusText,
        contentType,
        bodyText,
        bodyPretty,
      });
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Pix Manual
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Teste Pix SISPAG (POST /api/test/itau/sispag/pix-chave). Se der CORS, libere a origem do
            frontend no backend.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Form */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">Parâmetros</Typography>

                  <TextField
                    label="URL do endpoint"
                    value={endpointUrl}
                    onChange={(e) => setEndpointUrl(e.target.value)}
                    fullWidth
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Valor"
                        value={String(form.valor)}
                        onChange={handleChange("valor")}
                        fullWidth
                        inputMode="decimal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        label="Data (yyyy-MM-dd)"
                        value={form.data_pagamento}
                        onChange={handleChange("data_pagamento")}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Chave Pix"
                    value={form.chave}
                    onChange={handleChange("chave")}
                    fullWidth
                  />

                  <Divider />

                  <Typography variant="subtitle1" fontWeight={600}>
                    Pagador
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="tipo_conta (CC/CP/PP)"
                        value={form.pagador_tipo_conta}
                        onChange={handleChange("pagador_tipo_conta")}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Agência"
                        value={form.pagador_agencia}
                        onChange={handleChange("pagador_agencia")}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Conta (conta+dv)"
                        value={form.pagador_conta}
                        onChange={handleChange("pagador_conta")}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="tipo_pessoa (F/J)"
                        value={form.pagador_tipo_pessoa}
                        onChange={handleChange("pagador_tipo_pessoa")}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        label="Documento (CPF/CNPJ)"
                        value={form.pagador_documento}
                        onChange={handleChange("pagador_documento")}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Módulo SISPAG"
                    value={form.pagador_modulo_sispag}
                    onChange={handleChange("pagador_modulo_sispag")}
                    fullWidth
                  />

                  <Button
                    variant="contained"
                    onClick={executePost}
                    disabled={loading}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    {loading ? "Chamando..." : "Executar POST"}
                  </Button>

                  {error && (
                    <Typography color="error" variant="body2">
                      Erro: {error}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Preview + resposta */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Request JSON</Typography>
                  <TextField
                    value={requestJson}
                    fullWidth
                    multiline
                    minRows={12}
                    InputProps={{ readOnly: true }}
                    sx={{ mt: 1, fontFamily: "monospace" }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6">Resposta</Typography>

                  {!result && !error && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      (sem chamada ainda)
                    </Typography>
                  )}

                  {result && (
                    <Box
                      component="pre"
                      sx={{
                        mt: 1,
                        p: 2,
                        borderRadius: 2,
                        overflow: "auto",
                        bgcolor: "grey.900",
                        color: "grey.100",
                        fontSize: 13,
                        lineHeight: 1.4,
                      }}
                    >
                      {`HTTP ${result.status} ${result.statusText}\n\nContent-Type: ${result.contentType}\n\n${
                        result.bodyPretty ?? result.bodyText
                      }`}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
