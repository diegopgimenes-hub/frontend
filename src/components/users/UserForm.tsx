import { createUser } from "@/api/userApi";
import { useNotifications } from "@/hooks/useNotifications/NotificationsContext";
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserFormData {
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  roles: string[];
}

export default function UserForm() {
  const [form, setForm] = useState<UserFormData>({
    username: "",
    email: "",
    password: "",
    enabled: true,
    roles: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notifications = useNotifications();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" })); // limpa erro ao editar
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, enabled: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await createUser(form);
      notifications.show("Usuário criado com sucesso!", { severity: "success" });
      navigate("/users");
    } catch (error: any) {
      // ✅ Detecta resposta de conflito do backend (409)
      if (error.response?.status === 409 && error.response?.data) {
        const { field, message } = error.response.data;

        if (field && message) {
          // mostra erro no campo correto
          setErrors({ [field]: message });
        } else if (typeof error.response.data === "string") {
          notifications.show(error.response.data, { severity: "error" });
        } else {
          notifications.show("Erro de conflito ao criar usuário.", {
            severity: "error",
          });
        }
      } else if (error.response?.status === 400) {
        notifications.show("Preencha todos os campos obrigatórios.", {
          severity: "warning",
        });
      } else {
        notifications.show("Erro ao criar usuário.", { severity: "error" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "grid",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <TextField
        name="username"
        label="Usuário"
        value={form.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        fullWidth
      />

      <TextField
        name="email"
        label="E-mail"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <TextField
        name="password"
        label="Senha"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
      />

      <FormControlLabel
        control={<Switch checked={form.enabled} onChange={handleSwitchChange} name="enabled" />}
        label="Ativo"
      />

      <Button variant="contained" type="submit" disabled={isSubmitting} sx={{ mt: 2 }}>
        {isSubmitting ? "Salvando..." : "Salvar"}
      </Button>
    </Box>
  );
}
