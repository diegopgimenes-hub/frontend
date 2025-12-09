import { createRole, getRole, Role, updateRole } from "@/api/roleApi";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface RoleFormProps {
  roleId?: number;
  onSuccess?: () => void;
}

export default function RoleForm({ roleId, onSuccess }: RoleFormProps) {
  const [role, setRole] = useState<Partial<Role>>({ name: "" });
  const [loading, setLoading] = useState(false);

  // Carrega a role ao editar
  useEffect(() => {
    if (roleId) {
      getRole(roleId)
        .then((data) => setRole(data))
        .catch(console.error);
    }
  }, [roleId]);

  const handleSubmit = async () => {
    if (!role.name?.trim()) return;
    setLoading(true);
    try {
      if (roleId) {
        await updateRole(roleId, { name: role.name.trim() });
      } else {
        await createRole({ name: role.name.trim() });
      }

      // ✅ Chama callback de sucesso (fecha modal e atualiza lista)
      onSuccess?.();
    } catch (err) {
      console.error("Erro ao salvar role:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
    >
      <TextField
        label="Nome da Role"
        name="name"
        value={role.name ?? ""}
        onChange={(e) => setRole({ ...role, name: e.target.value })}
        fullWidth
      />

      <Stack direction="row" justifyContent="flex-end">
        <Button type="submit" variant="contained" disabled={loading}>
          Salvar
        </Button>
      </Stack>
    </Box>
  );
}
