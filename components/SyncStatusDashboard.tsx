import { useEffect, useState } from "react";
import { getQueuedSubmissions } from "../lib/db";
import { Typography, Paper, Stack, Chip } from "@mui/material";

const SyncStatusDashboard = () => {
  const [queueCount, setQueueCount] = useState(0);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [online, setOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : false
  );

  useEffect(() => {
    const update = async () => {
      const queue = await getQueuedSubmissions();
      setQueueCount(queue.length);
      setLastSync(localStorage.getItem("lastSync") || "Never");
    };

    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));

    update();
    const interval = setInterval(update, 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper sx={{ p: 4 }} elevation={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Sync Status
      </Typography>
      <Stack spacing={1}>
        <Chip label={online ? "Online" : "Offline"} color={online ? "success" : "error"} />
        <Typography>Queued entries: {queueCount}</Typography>
        <Typography>Last sync: {lastSync}</Typography>
        {queueCount > 0 && !online && (
          <Typography color="warning.main">Will sync when online.</Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default SyncStatusDashboard;
