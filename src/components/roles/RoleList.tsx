import { deleteRole, getRoles } from "@/api/roleApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import RoleCreate from "./RoleCreate";
import RoleEdit from "./RoleEdit";
import RoleShow from "./RoleShow";

export default function RoleList() {
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showId, setShowId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const loadRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deleteRole(confirmDelete);
      await loadRoles();
    } catch (err) {
      console.error(err);
    } finally {
      setConfirmDelete(null);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Nome", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 140,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" onClick={() => setShowId(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => setEditId(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setConfirmDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Roles</Typography>
          <Button variant="contained" onClick={() => setOpenCreate(true)}>
            Nova Role
          </Button>
        </Stack>

        <DataGrid
          rows={roles}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />

        <RoleCreate open={openCreate} onClose={() => setOpenCreate(false)} onSuccess={loadRoles} />

        {editId && (
          <RoleEdit
            open={!!editId}
            roleId={editId}
            onClose={() => setEditId(null)}
            onSuccess={loadRoles}
          />
        )}

        {showId && <RoleShow open={!!showId} roleId={showId} onClose={() => setShowId(null)} />}

        <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
          <DialogTitle>Deseja realmente excluir esta role?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(null)}>Cancelar</Button>
            <Button color="error" variant="contained" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}
