import { createUser, getUserById, updateUser } from "@/api/userApi";
import { useNotifications } from "@/hooks/useNotifications/NotificationsContext";
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface UserFormData {
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  roles: string[];
}

interface UserFormProps {
  userId?: number;
  onSuccess?: () => void;
}

export default function UserForm({ userId, onSuccess }: UserFormProps) {
  const notifications = useNotifications();

  const [form, setForm] = useState<UserFormData>({
    username: "",
    email: "",
    password: "",
    enabled: true,
    roles: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🟢 Se tiver userId, estamos editando → carrega dados
  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then(data => {
          setForm({
            username: data.username ?? "",
            email: data.email ?? "",
            password: "",
            enabled: data.enabled ?? true,
            roles: data.roles ?? [],
          });
        })
        .catch(() => {
          notifications.show("Erro ao carregar usuário.", { severity: "error" });
        });
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, enabled: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      if (userId) {
        await updateUser(userId, form);
        notifications.show("Usuário atualizado com sucesso!", { severity: "success" });
      } else {
        await createUser(form);
        notifications.show("Usuário criado com sucesso!", { severity: "success" });
      }
      onSuccess?.(); // 🟢 chama callback após sucesso
    } catch (error: any) {
      if (error.response?.status === 409 && error.response?.data) {
        const { field, message } = error.response.data;
        if (field && message) setErrors({ [field]: message });
      } else {
        notifications.show("Erro ao salvar usuário.", { severity: "error" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      id="user-form"
      onSubmit={handleSubmit}
      sx={{ display: "grid", gap: 2, maxWidth: 400, margin: "0 auto" }}
    >
      <TextField
        name="username"
        label="Usuário"
        value={form.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        fullWidth
        autoComplete="username"
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
        autoComplete="email"
      />

      {!userId && (
        <TextField
          name="password"
          label="Senha"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          autoComplete="new-password"
        />
      )}

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
