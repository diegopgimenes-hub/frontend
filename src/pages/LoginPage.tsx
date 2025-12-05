import { useAuth } from "@/context/AuthContext";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password, rememberMe);
      navigate("/");
    } catch (err) {
      alert("Falha no login");
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
          }
          label="Lembrar de mim"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Entrar
        </Button>
      </form>
    </Box>
  );
}
