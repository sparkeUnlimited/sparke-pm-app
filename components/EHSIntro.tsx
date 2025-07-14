"use client";

import { Paper, Typography } from "@mui/material";

const EHSIntro = () => (
  <Paper sx={{ p: 4, mb: 3 }} elevation={4}>
    <Typography variant="h5" gutterBottom>
      Employee Health and Safety (EHS)
    </Typography>
    <Typography variant="body1">
      This section provides resources and forms related to our Employee Health and
      Safety program. Select a form from the navigation to get started.
    </Typography>
  </Paper>
);

export default EHSIntro;
