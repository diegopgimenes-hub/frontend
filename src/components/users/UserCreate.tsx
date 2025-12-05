import PageContainer from "@/components/common/PageContainer";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserForm from "./UserForm";

export default function UserCreate() {
  return (
    <PageContainer
      title="Novo Usuário"
      icon={<PersonAddIcon />}
      breadcrumbs={[{ title: "Usuários", path: "/users" }, { title: "Novo" }]}
    >
      <UserForm />
    </PageContainer>
  );
}
