import api from "@/api/axiosInstance";
import { DriverSelectDTO } from "@/types/driver";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectDriver: (driver: DriverSelectDTO) => void;
}

const DriverSelectionDialog: React.FC<Props> = ({ open, onClose, onSelectDriver }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [driverList, setDriverList] = useState<DriverSelectDTO[]>([]);

  const handleSearch = async () => {
    const res = await api.get<DriverSelectDTO[]>(`/api/drivers/selection?q=${searchQuery}`);
    setDriverList(res.data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Selecionar Motorista</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <input
            type="text"
            placeholder="Buscar motorista..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <Button onClick={handleSearch} variant="contained">
            Buscar
          </Button>
        </Box>

        {driverList.length === 0 ? (
          <Typography color="text.secondary">Nenhum motorista encontrado.</Typography>
        ) : (
          driverList.map((d) => (
            <Card
              key={d.id}
              sx={{
                mb: 1,
                p: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              onClick={() => onSelectDriver(d)}
            >
              <Typography fontWeight="bold">{d.nome}</Typography>
              <Typography variant="body2">CPF: {d.cpf}</Typography>
              <Typography variant="body2">Celular: {d.celular}</Typography>
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
