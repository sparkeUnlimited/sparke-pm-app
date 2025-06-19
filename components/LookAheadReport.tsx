import { useEffect, useState } from "react";
import { getTasks } from "@/lib/msLists";
import { Box, Typography, Paper, Divider, Stack } from "@mui/material";

const LookAheadReport = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const today = new Date();
  const plusDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);

  const twoWeeksOut = plusDays(today, 14).toISOString().split("T")[0];
  const twoMonthsOut = plusDays(today, 60).toISOString().split("T")[0];

  const inRange = (date: string, range: "2w" | "2m") => {
    const target = new Date(date);
    if (range === "2w") return target <= new Date(twoWeeksOut);
    return target <= new Date(twoMonthsOut);
  };

  return (
    <Stack spacing={4}>
      <Paper sx={{ p: 4 }} elevation={4}>
        <Typography variant="h5" fontWeight="bold">
          2-Week Look Ahead
        </Typography>
        <Divider sx={{ my: 2 }} />
        {tasks
          .filter((t) => inRange(t.startDate, "2w"))
          .map((task) => (
            <Box key={task.id}>
              <Typography fontWeight="medium">{task.taskName}</Typography>
              <Typography variant="body2">
                Start: {task.startDate} | Duration: {task.durationDays} days
              </Typography>
            </Box>
          ))}
      </Paper>

      <Paper sx={{ p: 4 }} elevation={4}>
        <Typography variant="h5" fontWeight="bold">
          2-Month Look Ahead
        </Typography>
        <Divider sx={{ my: 2 }} />
        {tasks
          .filter((t) => inRange(t.startDate, "2m") && !inRange(t.startDate, "2w"))
          .map((task) => (
            <Box key={task.id}>
              <Typography fontWeight="medium">{task.taskName}</Typography>
              <Typography variant="body2">
                Start: {task.startDate} | Duration: {task.durationDays} days
              </Typography>
            </Box>
          ))}
      </Paper>
    </Stack>
  );
};

export default LookAheadReport;
