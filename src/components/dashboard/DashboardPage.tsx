import { DialogsProvider } from "@/hooks/useDialogs/DialogsProvider";
import { NotificationsProvider } from "@/hooks/useNotifications/NotificationsProvider";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function DashboardPage() {
  return (
    <Box sx={{ p: 2 }}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          {/* Conteúdo da dashboard aqui */}
          Dashboard carregado com sucesso!
        </DialogsProvider>
      </NotificationsProvider>
    </Box>
  );
}
