"use client";
import { useEffect, useState } from "react";
import { getTasks } from "@/lib/msLists";
import { Box, Paper, Stack, Typography, LinearProgress, Button } from "@mui/material";
import EditTaskDialog from "@/components/EditTaskDialog";

const TaskTimeline = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleSave = (updated: any) => {
    const updatedList = tasks.map((t) => (t.id === updated.id ? updated : t));
    setTasks(updatedList);
  };

  return (
    <Paper sx={{ p: 4 }} elevation={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Task Timeline
      </Typography>
      <Stack spacing={2}>
        {tasks.map((task) => (
          <Box key={task.id} sx={{ p: 2, border: "1px solid #444", borderRadius: 2 }}>
            <Typography fontWeight="medium">{task.taskName}</Typography>
            <LinearProgress
              variant="determinate"
              value={task.progress || 0}
              sx={{ height: 8, borderRadius: 4, mt: 1 }}
            />
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {task.progress || 0}% Complete · Duration: {task.durationDays} day(s)
            </Typography>
            <Button size="small" sx={{ mt: 1 }} onClick={() => handleEdit(task)} variant="outlined">
              Edit Task
            </Button>
          </Box>
        ))}
      </Stack>

      {selectedTask && (
        <EditTaskDialog
          open={editOpen}
          task={selectedTask}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}
    </Paper>
  );
};

export default TaskTimeline;
