import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Slider,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getTasks,
  submitJournalEntry,
} from "@/lib/msLists";
import {
  saveJournalDraft,
  loadJournalDraft,
  queueSubmission,
  getQueuedSubmissions,
} from "@/lib/db";
import { sendMaterialEmailReport } from "@/lib/api";

type Task = {
  id: string;
  taskName: string;
  subtasks: string[];
  progress: number;
};

const JobSiteJournalForm = () => {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(tasks.map((t) => ({ ...t, progress: 0 })));
    });

    const today = new Date().toISOString().split("T")[0];
    loadJournalDraft(today).then((draft) => {
      if (draft) {
        setEmail(draft.email || "");
        setNotes(draft.notes || "");
        setTasks(draft.tasks || []);
      }
    });

    window.addEventListener("online", trySync);
    return () => window.removeEventListener("online", trySync);
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    saveJournalDraft(today, { email, notes, tasks });
  }, [email, notes, tasks]);

  const trySync = async () => {
    if (navigator.onLine) {
      const queue = await getQueuedSubmissions();
      for (const entry of queue) {
        await submitJournalEntry(entry);
      }
      localStorage.setItem("lastSync", new Date().toLocaleString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, notes, tasks: tasks.map((t) => ({ id: t.id, progress: t.progress })) };

    if (navigator.onLine) {
      await submitJournalEntry(payload);
      await sendMaterialEmailReport();
      localStorage.setItem("lastSync", new Date().toLocaleString());
    } else {
      await queueSubmission(payload);
      alert("You're offline — journal saved and will sync when you're online.");
    }
  };

  const updateProgress = (id: string, value: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, progress: value } : t)));
  };

  return (
    <Paper sx={{ p: 4, mt: 4 }} elevation={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Daily Journal
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Notes"
            multiline
            minRows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Box>
            <Typography fontWeight="medium" gutterBottom>Task Completion</Typography>
            <Stack spacing={3}>
              {tasks.map((task) => (
                <Box key={task.id}>
                  <Typography variant="subtitle1">{task.taskName}</Typography>
                  <Slider
                    value={task.progress}
                    onChange={(e, val) => updateProgress(task.id, val as number)}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                  />
                </Box>
              ))}
            </Stack>
          </Box>
          <Button type="submit" variant="contained">Submit</Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default JobSiteJournalForm;
