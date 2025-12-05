import { getUserById, type User } from "@/api/userApi";
import PageContainer from "@/components/common/PageContainer";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "./UserForm";

export default function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getUserById(Number(id));
        setUser(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <PageContainer
      title="Editar Usuário"
      icon={<EditIcon />}
      breadcrumbs={[{ title: "Usuários", path: "/users" }, { title: "Editar" }]}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 2 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : user ? (
          <UserForm
            key={user.id}
            initialData={{
              username: user.username,
              email: user.email,
              enabled: user.enabled,
              roles: user.roles,
              password: "", // senha sempre vazia para edição
            }}
          />
        ) : (
          <Alert severity="warning">Usuário não encontrado.</Alert>
        )}
      </Box>
    </PageContainer>
  );
}
