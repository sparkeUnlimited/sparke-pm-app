"use client";
import { useEffect, useState } from "react";
import { getTasks, getMaterials } from "@/lib/msLists";
import Grid from "@mui/material/Grid";
import { Box, Paper, Typography, LinearProgress, IconButton, Tooltip, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
//import ConstructionIcon from "@mui/icons-material/Construction";
import EditTaskDialog from "@/components/EditTaskDialog";

const GCSharedDashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    getTasks().then(setTasks);
    getMaterials().then(setMaterials);
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
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        GC Shared Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Task Cards */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }} elevation={4}>
            <Typography variant="h6" gutterBottom>
              Task Progress
            </Typography>
            <Grid container spacing={2}>
              {tasks.map((task) => (
                <Grid size={{ xs: 12 }} key={task.id}>
                  <Paper sx={{ p: 2, position: "relative" }} elevation={2}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight="medium">{task.taskName}</Typography>
                      <Tooltip title="Edit Task">
                        <IconButton onClick={() => handleEdit(task)} size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={task.progress || 0}
                      sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {task.progress || 0}% Complete · {task.durationDays} Day(s)
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Material Cards */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }} elevation={4}>
            <Typography variant="h6" gutterBottom>
              Material Orders
            </Typography>
            <Grid container spacing={2}>
              {materials.map((mat) => (
                <Grid size={{ xs: 12 }} key={mat.id}>
                  <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                    <Box>
                      <Typography fontWeight="medium">{mat.name}</Typography>
                      <Typography variant="body2">
                        Needed: {mat.dateNeeded} · Lead Time: {mat.leadTimeDays} days
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Chip
                        label={mat.status}
                        icon={<LocalShippingIcon />}
                        color={
                          mat.status === "Delivered"
                            ? "success"
                            : mat.status === "Ordered"
                              ? "info"
                              : "warning"
                        }
                        variant="outlined"
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {selectedTask && (
        <EditTaskDialog
          open={editOpen}
          task={selectedTask}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default GCSharedDashboard;
