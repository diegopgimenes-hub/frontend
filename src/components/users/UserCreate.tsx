import PageContainer from "@/components/common/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import UserForm from "./UserForm";

export default function UserCreate() {
  // 💡 A chave está no container mais alto (PageContainer)
  return (
    <PageContainer
      key={window.location.pathname} // força desmontagem completa ao trocar rota
      title="Novo Usuário"
      icon={<AddIcon />}
      breadcrumbs={[{ title: "Usuários", path: "/users" }, { title: "Novo" }]}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 2 }}>
        <UserForm /> {/* nenhum dado → formulário limpo */}
      </Box>
    </PageContainer>
  );
}
