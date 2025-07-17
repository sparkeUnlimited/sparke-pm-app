import { useState } from "react";
import SignaturePad from "@/components/SignaturePad";
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Stack,
  MenuItem,
  Button,
} from "@mui/material";

const equipmentList = ["Scissor lift", "Ladder", "Cordless drill", "Power saw"];
const safetyChecks = [
  "Visual inspection",
  "Operational test",
  "No frayed cords",
  "Working safety features",
];

const EquipmentSafetyCheck = () => {
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [checks, setChecks] = useState<boolean[]>(safetyChecks.map(() => false));
  const [signature, setSignature] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];

  const toggleCheck = (i: number) => {
    const updated = [...checks];
    updated[i] = !updated[i];
    setChecks(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const report = {
      equipment: selectedEquipment,
      checks: safetyChecks.map((c, i) => ({ check: c, passed: checks[i] })),
    };
    console.log("Equipment Safety Submitted", report);
  };

  return (
    <Paper sx={{ p: 4 }} elevation={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Equipment Safety Check
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Select Equipment"
            select
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
            fullWidth
          >
            {equipmentList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          {safetyChecks.map((item, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox checked={checks[i]} onChange={() => toggleCheck(i)} />}
              label={item}
            />
          ))}

          <SignaturePad onChange={setSignature} />
          <TextField type="date" value={currentDate} disabled fullWidth sx={{ mb: 1 }} />

          <Button variant="contained" type="submit">
            Submit Equipment Check
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default EquipmentSafetyCheck;
