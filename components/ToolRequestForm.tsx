import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SignaturePad from "@/components/SignaturePad";

const ToolRequestForm = () => {
  const [toolName, setToolName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [priority, setPriority] = useState("Normal");
  const [notes, setNotes] = useState("");
  const [signature, setSignature] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      toolName,
      quantity,
      priority,
      notes,
    });
    // TODO: send to MS Lists or Power Automate
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        maxWidth: 600,
        width: "100%",
        borderRadius: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Tool Request
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <Stack spacing={3}>
          <TextField
            label="Tool Name"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            fullWidth
            required
          />
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            fullWidth
          >
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
            <MenuItem value="ASAP">ASAP</MenuItem>
          </TextField>
          <TextField
            label="Additional Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            multiline
            minRows={3}
          />
          <SignaturePad onChange={setSignature} />
          <TextField type="date" value={currentDate} disabled fullWidth sx={{ mb: 1 }} />
          <Box textAlign="right">
            <Button type="submit" variant="contained" size="large">
              Submit Request
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ToolRequestForm;
