import { deleteUser, getUser, type User } from "@/api/userApi";
import PageContainer from "@/components/common/PageContainer";
import { useDialogs } from "@/hooks/useDialogs/DialogsContext";
import { useNotifications } from "@/hooks/useNotifications/NotificationsContext";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserShow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const dialogs = useDialogs();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        if (id) {
          const data = await getUser(Number(id));
          setUser({
            ...data,
            roles: Array.isArray(data.roles) ? data.roles : [],
          });
        }
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        notifications.show("Erro ao carregar o usuário.", { severity: "error" });
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [id, notifications]);

  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = await dialogs.confirm({
      title: "Excluir Usuário",
      description: "Deseja realmente excluir este usuário?",
      severity: "error",
      confirmText: "Excluir",
      cancelText: "Cancelar",
    });

    if (confirmed && id) {
      try {
        await deleteUser(Number(id));
        notifications.show("Usuário excluído com sucesso.", {
          severity: "success",
        });
        navigate("/users");
      } catch (err: any) {
        notifications.show(`Erro ao excluir: ${err.response?.data?.message || err.message}`, {
          severity: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <PageContainer title="Usuário não encontrado">
        <Typography variant="body1">O usuário não existe ou foi removido.</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/users")}>
          Voltar
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Detalhes do Usuário"
      breadcrumbs={[{ title: "Usuários", path: "/users" }, { title: user.username }]}
      actions={
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button variant="outlined" onClick={() => navigate("/users")} fullWidth>
            Voltar
          </Button>
          <Button variant="contained" color="primary" onClick={handleEdit} fullWidth>
            Editar
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete} fullWidth>
            Excluir
          </Button>
        </Stack>
      }
    >
      <Paper
        sx={{
          p: 3,
          maxWidth: 600,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">{user.username}</Typography>
        <Divider />

        <Typography>
          <strong>ID:</strong> {user.id}
        </Typography>
        <Typography>
          <strong>E-mail:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Ativo:</strong> {user.enabled ? "Sim" : "Não"}
        </Typography>
        <Typography>
          <strong>Criado em:</strong>{" "}
          {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
        </Typography>

        <Typography>
          <strong>Perfis:</strong>
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {Array.isArray(user.roles) && user.roles.length > 0 ? (
            user.roles.map(role => <Chip key={role} label={role} />)
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhum perfil atribuído.
            </Typography>
          )}
        </Stack>
      </Paper>
    </PageContainer>
  );
}
