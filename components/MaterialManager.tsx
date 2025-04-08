import { useEffect, useState } from "react";
import { getMaterials, updateMaterialStatus, MaterialItem } from "@/lib/msLists";
import { sendMaterialEmailReport } from "@/lib/api";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";

const MaterialManager = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    getMaterials().then(setMaterials);
  }, []);

  const markOrdered = async (id: string) => {
    await updateMaterialStatus(id, "Ordered");
    setMaterials(await getMaterials());
  };

  const confirmDelivery = async (id: string) => {
    await updateMaterialStatus(id, "Delivered", notes[id] || "");
    setMaterials(await getMaterials());
  };

  const updateNote = (id: string, value: string) => {
    setNotes((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Stack spacing={4}>
      <Box textAlign="right">
        <Button variant="contained" onClick={() => sendMaterialEmailReport(materials)}>
          Email Order Summary
        </Button>
      </Box>

      {materials.map((mat) => (
        <Paper key={mat.id} sx={{ p: 3 }} elevation={3}>
          <Typography fontWeight="bold">{mat.name}</Typography>
          <Typography variant="body2" gutterBottom>
            Needed: {mat.dateNeeded} | Lead Time: {mat.leadTimeDays} days
          </Typography>
          <Typography>Status: {mat.status}</Typography>

          {mat.status === "To Order" && (
            <Button sx={{ mt: 2 }} variant="contained" onClick={() => markOrdered(mat.id)}>
              Mark as Ordered
            </Button>
          )}

          {mat.status === "Ordered" && (
            <Stack spacing={2} mt={2}>
              <TextField
                label="Delivery Notes"
                value={notes[mat.id] || ""}
                onChange={(e) => updateNote(mat.id, e.target.value)}
              />
              <Button variant="contained" color="success" onClick={() => confirmDelivery(mat.id)}>
                Confirm Delivery
              </Button>
            </Stack>
          )}
        </Paper>
      ))}
    </Stack>
  );
};

export default MaterialManager;
