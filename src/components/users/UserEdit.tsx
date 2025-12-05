import PageContainer from "@/components/common/PageContainer";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import UserForm from "./UserForm";

export default function UserEdit() {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContainer
      title="Editar Usuário"
      icon={<EditIcon />}
      breadcrumbs={[{ title: "Usuários", path: "/users" }, { title: "Editar" }]}
    >
      <UserForm key={id} />
    </PageContainer>
  );
}
