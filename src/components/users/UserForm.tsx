import { createUser } from "@/api/userApi";
import { useNotifications } from "@/hooks/useNotifications/NotificationsContext";
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Interface de dados específicos para o formulário
export interface UserFormData {
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  roles: string[];
}

// ✅ Props aceitas pelo formulário
interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmitSuccess?: () => void;
}

export default function UserForm({ initialData, onSubmitSuccess }: UserFormProps) {
  const [form, setForm] = useState<UserFormData>({
    username: initialData?.username ?? "",
    email: initialData?.email ?? "",
    password: initialData?.password ?? "",
    enabled: initialData?.enabled ?? true, // ✅ apenas este começa true
    roles: initialData?.roles ?? [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notifications = useNotifications();
  const navigate = useNavigate();

  // 🔹 Atualiza campos de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // 🔹 Atualiza o switch de “Ativo”
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, enabled: e.target.checked }));
  };

  // 🔹 Envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await createUser(form);
      notifications.show("Usuário criado com sucesso!", { severity: "success" });

      if (onSubmitSuccess) onSubmitSuccess();
      else navigate("/users");
    } catch (error: unknown) {
      if (axiosError(error)) {
        const status = error.response?.status;

        if (status === 409 && typeof error.response?.data === "object") {
          const { field, message } = error.response.data as { field?: string; message?: string };
          if (field && message) setErrors({ [field]: message });
        } else if (status === 400 && typeof error.response?.data === "string") {
          notifications.show(error.response.data, { severity: "error" });
        } else {
          notifications.show("Erro ao criar usuário.", { severity: "error" });
        }
      } else {
        notifications.show("Erro inesperado ao criar usuário.", { severity: "error" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔸 Helper: garante tipo AxiosError
  const axiosError = (error: unknown): error is import("axios").AxiosError =>
    typeof error === "object" && !!error && "isAxiosError" in error;

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
