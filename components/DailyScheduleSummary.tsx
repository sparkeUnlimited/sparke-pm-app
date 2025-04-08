import { useEffect, useState } from "react";
import { getTasks } from "../lib/msLists";
import { Typography, Box, Paper, Stack } from "@mui/material";

const DailyScheduleSummary = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    getTasks().then((all) => {
      const today = new Date().toISOString().split("T")[0];
      const filtered = all.filter((t: any) => t.startDate === today);
      setTasks(filtered);
    });
  }, []);

  return (
    <Paper sx={{ p: 4, mb: 4 }} elevation={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Today’s Schedule
      </Typography>
      {tasks.length === 0 ? (
        <Typography>No tasks scheduled for today.</Typography>
      ) : (
        <Stack spacing={2}>
          {tasks.map((task) => (
            <Box key={task.id} p={2} border="1px solid #444" borderRadius={2}>
              <Typography fontWeight="bold">{task.taskName}</Typography>
              <Typography variant="body2">Duration: {task.durationDays} day(s)</Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default DailyScheduleSummary;
