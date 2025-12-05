import { deleteUser, getUsers, type User } from "@/api/userApi";
import PageContainer from "@/components/common/PageContainer";
import { useDialogs } from "@/hooks/useDialogs/DialogsContext";
import { useNotifications } from "@/hooks/useNotifications/NotificationsContext";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, GridColDef, gridClasses } from "@mui/x-data-grid";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_PAGE_SIZE = 10;

export default function UserList() {
  const navigate = useNavigate();
  const dialogs = useDialogs();
  const notifications = useNotifications();

  const [rows, setRows] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const loadUsers = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await getUsers();
      setRows(data);
    } catch (err) {
      setError(err as Error);
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleRefresh = React.useCallback(() => {
    if (!isLoading) loadUsers();
  }, [isLoading, loadUsers]);

  const handleCreateClick = React.useCallback(() => {
    navigate("/users/new");
  }, [navigate]);

  const handleRowEdit = React.useCallback(
    (user: User) => () => {
      navigate(`/users/${user.id}/edit`);
    },
    [navigate],
  );

  const handleRowDelete = React.useCallback(
    (user: User) => async () => {
      const confirmed = await dialogs.confirm({
        title: "Excluir Usuário?",
        description: `Deseja realmente excluir ${user.username}?`,
        severity: "error",
      });
      if (confirmed) {
        setIsLoading(true);
        try {
          await deleteUser(Number(user.id));
          notifications.show("Usuário excluído com sucesso!", {
            severity: "success",
            autoHideDuration: 3000,
          });
          loadUsers();
        } catch (deleteError) {
          notifications.show(
            `Erro ao excluir usuário: ${(deleteError as Error).message}`,
            {
              severity: "error",
              autoHideDuration: 3000,
            },
          );
        }
        setIsLoading(false);
      }
    },
    [dialogs, notifications, loadUsers],
  );

  const columns = React.useMemo<GridColDef<User>[]>(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "username", headerName: "Usuário", flex: 1 },
      { field: "email", headerName: "Email", flex: 1.5 },
      {
        field: "roles",
        headerName: "Perfis",
        flex: 1,
        valueGetter: (_value, row) =>
          Array.isArray(row.roles) ? row.roles.join(", ") : "",
      },
      {
        field: "enabled",
        headerName: "Ativo",
        width: 120,
        renderCell: (params) => (params.row.enabled ? "Sim" : "Não"),
      },
      {
        field: "actions",
        type: "actions",
        flex: 1,
        align: "right",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key="edit-item"
            icon={<EditIcon />}
            label="Editar"
            onClick={handleRowEdit(row)}
          />,
          <GridActionsCellItem
            key="delete-item"
            icon={<DeleteIcon />}
            label="Excluir"
            onClick={handleRowDelete(row)}
          />,
        ],
      },
    ],
    [handleRowEdit, handleRowDelete],
  );

  return (
    <PageContainer
      title="Usuários"
      breadcrumbs={[{ title: "Usuários" }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Recarregar dados" placement="right" enterDelay={1000}>
            <div>
              <IconButton size="small" aria-label="refresh" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Button variant="contained" onClick={handleCreateClick} startIcon={<AddIcon />}>
            Novo
          </Button>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        {error ? (
          <Box sx={{ flexGrow: 1 }}>
            <Alert severity="error">{error.message}</Alert>
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            loading={isLoading}
            initialState={{
              pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
            }}
            showToolbar
            pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
            sx={{
              [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                outline: "transparent",
              },
              [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                { outline: "none" },
              [`& .${gridClasses.row}:hover`]: {
                cursor: "pointer",
              },
            }}
          />
        )}
      </Box>
    </PageContainer>
  );
}
