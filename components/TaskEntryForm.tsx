import { useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";

type Subtask = { name: string };
type Material = { name: string; dateNeeded: string; leadTimeDays: number };

const TaskEntryForm = () => {
  const [taskName, setTaskName] = useState("");
  const [durationDays, setDurationDays] = useState<number>(1);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const addSubtask = () => setSubtasks([...subtasks, { name: "" }]);
  const updateSubtask = (index: number, value: string) => {
    const updated = [...subtasks];
    updated[index] = { name: value };
    setSubtasks(updated);
  };

  const addMaterial = () =>
    setMaterials([...materials, { name: "", dateNeeded: "", leadTimeDays: 0 }]);

  const updateMaterial = <K extends keyof Material>(
    index: number,
    field: K,
    value: Material[K]
  ) => {
    const updated = [...materials];
    updated[index] = { ...updated[index], [field]: value };
    setMaterials(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = { taskName, durationDays, subtasks, materials };
    console.log("Task Submitted:", taskData);
    // TODO: Submit to Microsoft Lists
  };

  return (
    <Paper sx={{ p: 4 }} elevation={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Create Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Estimated Duration (days)"
            type="number"
            value={durationDays}
            onChange={(e) => setDurationDays(Number(e.target.value))}
            fullWidth
            required
          />

          <Box>
            <Typography fontWeight="medium">Subtasks</Typography>
            <Stack spacing={1} mt={1}>
              {subtasks.map((s, i) => (
                <TextField
                  key={i}
                  value={s.name}
                  onChange={(e) => updateSubtask(i, e.target.value)}
                  placeholder={`Subtask ${i + 1}`}
                />
              ))}
            </Stack>
            <Button onClick={addSubtask} sx={{ mt: 1 }}>
              + Add Subtask
            </Button>
          </Box>

          <Box>
            <Typography fontWeight="medium">Required Materials</Typography>
            <Stack spacing={2} mt={1}>
              {materials.map((mat, i) => (
                <Stack key={i} direction="row" spacing={2}>
                  <TextField
                    value={mat.name}
                    onChange={(e) => updateMaterial(i, "name", e.target.value)}
                    label="Material Name"
                    fullWidth
                  />
                  <TextField
                    type="date"
                    value={mat.dateNeeded}
                    onChange={(e) => updateMaterial(i, "dateNeeded", e.target.value)}
                    label="Date Needed"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    type="number"
                    value={mat.leadTimeDays}
                    onChange={(e) => updateMaterial(i, "leadTimeDays", Number(e.target.value))}
                    label="Lead Time (days)"
                    fullWidth
                  />
                </Stack>
              ))}
            </Stack>
            <Button onClick={addMaterial} sx={{ mt: 1 }}>
              + Add Material
            </Button>
          </Box>

          <Button type="submit" variant="contained">
            Save Task
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default TaskEntryForm;
