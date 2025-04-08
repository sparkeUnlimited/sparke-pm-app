import { useState } from "react";
import {
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Button,
  Box,
} from "@mui/material";

const checklistItems = [
  "Site clean and organized",
  "First aid kit available",
  "All workers wearing PPE",
  "No tripping hazards",
  "Fall protection in place where needed",
];

const DailySafetyReview = () => {
  const [checks, setChecks] = useState<boolean[]>(checklistItems.map(() => false));
  const [supervisor, setSupervisor] = useState("");

  const toggle = (i: number) => {
    const updated = [...checks];
    updated[i] = !updated[i];
    setChecks(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const report = {
      supervisor,
      results: checklistItems.map((item, i) => ({ item, passed: checks[i] })),
    };
    console.log("Safety Review Submitted", report);
    // TODO: Send to Microsoft Lists
  };

  return (
    <Paper sx={{ p: 4 }} elevation={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Daily Safety Review
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {checklistItems.map((item, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox checked={checks[i]} onChange={() => toggle(i)} />}
              label={item}
            />
          ))}

          <TextField
            label="Supervisor Name"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            fullWidth
          />

          <Button variant="contained" type="submit">
            Submit Safety Review
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default DailySafetyReview;
