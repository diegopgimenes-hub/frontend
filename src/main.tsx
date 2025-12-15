import { ColorModeProvider } from "@/context/ColorModeContext";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { DialogsProvider } from "@/hooks/useDialogs/DialogsProvider";
import { NotificationsProvider } from "@/hooks/useNotifications/NotificationsProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ColorModeProvider>
      <DialogsProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </DialogsProvider>
    </ColorModeProvider>
  </BrowserRouter>,
);
