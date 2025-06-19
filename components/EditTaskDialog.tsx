import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Material = { name: string; dateNeeded: string; leadTimeDays: number };
type Task = {
  id: string;
  taskName: string;
  durationDays: number;
  materials: Material[];
};

type Props = {
  open: boolean;
  task: Task;
  onClose: () => void;
  onSave: (updated: Task) => void;
};

const EditTaskDialog = ({ open, task, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState<Task>(task);

  const updateMaterial = <K extends keyof Material>(
    index: number,
    field: K,
    value: Material[K]
  ) => {
    const updated = [...formData.materials];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, materials: updated });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label="Task Name"
            fullWidth
            value={formData.taskName}
            onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
          />
          <TextField
            label="Estimated Duration (Days)"
            type="number"
            fullWidth
            value={formData.durationDays}
            onChange={(e) =>
              setFormData({
                ...formData,
                durationDays: Number(e.target.value),
              })
            }
          />
          <Typography variant="h6">Materials</Typography>
          {formData.materials.map((mat, i) => (
            <Stack direction="row" spacing={2} key={i}>
              <TextField
                label="Material Name"
                value={mat.name}
                onChange={(e) => updateMaterial(i, "name", e.target.value)}
                fullWidth
              />
              <TextField
                label="Date Needed"
                type="date"
                value={mat.dateNeeded}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => updateMaterial(i, "dateNeeded", e.target.value)}
                fullWidth
              />
              <TextField
                label="Lead Time (days)"
                type="number"
                value={mat.leadTimeDays}
                onChange={(e) => updateMaterial(i, "leadTimeDays", Number(e.target.value))}
                fullWidth
              />
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
