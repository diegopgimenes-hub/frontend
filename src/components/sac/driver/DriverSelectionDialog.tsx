import api from "@/api/axiosInstance";
import { ClearIcon, SearchIcon } from "@/icons";
import { DriverSelectDTO } from "@/types/driver";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectDriver: (driver: DriverSelectDTO) => void;
}

const DriverSelectionDialog: React.FC<Props> = ({ open, onClose, onSelectDriver }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [driverList, setDriverList] = useState<DriverSelectDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 🔍 Foca o campo quando o modal é aberto
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      setSearchQuery("");
      setDriverList([]);
    }
  }, [open]);

  // 🔎 Busca motoristas
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setDriverList([]);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/api/drivers/selection?q=${encodeURIComponent(searchQuery)}`);
      setDriverList(res.data);
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
    } finally {
      setLoading(false);
    }
  };

  // ⌨️ Busca ao pressionar Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // ❌ Limpar campo
  const handleClear = () => {
    setSearchQuery("");
    setDriverList([]);
    inputRef.current?.focus();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Selecionar Motorista</DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Digite o nome ou CPF do motorista..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} size="small">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button onClick={handleSearch} variant="contained" sx={{ ml: 2 }} disabled={loading}>
            Buscar
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        ) : driverList.length === 0 ? (
          <Typography color="text.secondary" textAlign="center">
            Nenhum motorista encontrado.
          </Typography>
        ) : (
          driverList.map((d) => (
            <Card
              key={d.id}
              sx={{
                mb: 1.5,
                p: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              onClick={() => {
                onSelectDriver(d);
                onClose();
              }}
            >
              <Typography fontWeight="bold">{d.nome}</Typography>
              <Typography variant="body2">CPF: {d.cpf}</Typography>
              {d.celular && <Typography variant="body2">Celular: {d.celular}</Typography>}
            </Card>
          ))
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DriverSelectionDialog;
