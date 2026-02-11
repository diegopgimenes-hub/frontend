import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

type ApiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: unknown; rawText?: string }
  | { status: "error"; message: string };

export default function ConsultarPagamento() {
  const [id, setId] = useState("");
  const [state, setState] = useState<ApiState>({ status: "idle" });

  const canSubmit = useMemo(
    () => id.trim().length > 0 && state.status !== "loading",
    [id, state.status],
  );

  async function handleConsultar() {
    const cleanId = id.trim();
    if (!cleanId) return;

    try {
      setState({ status: "loading" });

      // Ajuste aqui se você usa baseURL via env/proxy.
      // Ex.: const url = `/api/test/itau/sispag/pagamentos/${encodeURIComponent(cleanId)}`
      const url = `http://localhost:8080/api/test/itau/sispag/pagamentos/${encodeURIComponent(cleanId)}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Erro ${res.status} ao consultar. ${text ? `Detalhe: ${text}` : ""}`.trim(),
        );
      }

      // Seu controller retorna String, mas produz JSON.
      // Pode vir como JSON válido ou texto.
      const text = await res.text();

      let parsed: unknown = text;
      try {
        parsed = JSON.parse(text);
      } catch {
        // mantém como string mesmo
      }

      setState({ status: "success", data: parsed, rawText: text });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Falha ao consultar pagamento.";
      setState({ status: "error", message });
    }
  }

  function handleLimpar() {
    setId("");
    setState({ status: "idle" });
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight={700}>
          Consultar pagamento (Sispag)
        </Typography>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                label="ID do pagamento"
                value={id}
                onChange={(e) => setId(e.target.value)}
                fullWidth
                placeholder="Ex.: 123456"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConsultar();
                }}
              />

              <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={handleConsultar} disabled={!canSubmit}>
                  Consultar
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleLimpar}
                  disabled={state.status === "loading"}
                >
                  Limpar
                </Button>

                {state.status === "loading" && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={18} />
                    <Typography variant="body2">Consultando...</Typography>
                  </Stack>
                )}
              </Stack>

              {state.status === "error" && <Alert severity="error">{state.message}</Alert>}

              {state.status === "success" && (
                <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Consulta realizada com sucesso.
                  </Alert>

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Retorno
                  </Typography>

                  <Box
                    component="pre"
                    sx={{
                      m: 0,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "background.default",
                      border: "1px solid",
                      borderColor: "divider",
                      overflow: "auto",
                      fontSize: 13,
                      lineHeight: 1.4,
                    }}
                  >
                    {typeof state.data === "string"
                      ? state.data
                      : JSON.stringify(state.data, null, 2)}
                  </Box>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
