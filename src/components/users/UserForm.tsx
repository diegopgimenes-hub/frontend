import { createUser } from "@/api/userApi";
import { useNotifications } from "@/hooks/useNotifications/NotificationsContext";
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface UserFormData {
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  roles: string[];
}

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmitSuccess?: () => void;
}

export default function UserForm({ initialData, onSubmitSuccess }: UserFormProps) {
  const navigate = useNavigate();
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

  // ✅ Preenche apenas se houver initialData (modo edição)
  useEffect(() => {
    if (initialData) {
      setForm({
        username: initialData.username ?? "",
        email: initialData.email ?? "",
        password: "",
        enabled: initialData.enabled ?? true,
        roles: initialData.roles ?? [],
      });
    }
  }, [initialData]);

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
      await createUser({ ...form });
      notifications.show("Usuário criado com sucesso!", { severity: "success" });
      if (onSubmitSuccess) onSubmitSuccess();
      else navigate("/users");
    } catch (error: any) {
      if (error.response?.status === 409 && error.response?.data) {
        const { field, message } = error.response.data;
        if (field && message) setErrors({ [field]: message });
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
      id="create-user-form"
      autoComplete="off" // 🚫 bloqueia autofill global
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
        autoComplete="new-username"
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
        autoComplete="new-email"
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
        autoComplete="new-password"
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
