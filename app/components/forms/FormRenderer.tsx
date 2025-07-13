"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { submitEHSForm } from "@/lib/api";

export type FormField = {
  label: string;
  type: string;
  options?: string[];
};
export type FormSection = {
  title: string;
  fields: FormField[];
};
export type FormDefinition = {
  title: string;
  description: string;
  sections: FormSection[];
};

const FormRenderer = ({ definition }: { definition: FormDefinition }) => {
  const [data, setData] = useState<Record<string, any>>({});

  const handleChange = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitEHSForm(definition.title, data);
  };

  const renderField = (field: FormField, key: string) => {
    const value = data[key] ?? (field.type === "checkbox" && field.options ? [] : field.type === "checkbox" ? false : "");
    switch (field.type) {
      case "text":
        return (
          <TextField label={field.label} fullWidth value={value} onChange={(e) => handleChange(key, e.target.value)} />
        );
      case "textarea":
        return (
          <TextField
            label={field.label}
            fullWidth
            multiline
            rows={4}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        );
      case "date":
        return (
          <TextField
            label={field.label}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        );
      case "dropdown":
        return (
          <TextField
            select
            label={field.label}
            fullWidth
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
          >
            {field.options?.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        );
      case "checkbox":
        if (field.options) {
          const arr: string[] = Array.isArray(value) ? value : [];
          return (
            <FormGroup>
              <Typography>{field.label}</Typography>
              {field.options.map((opt) => (
                <FormControlLabel
                  key={opt}
                  control={
                    <Checkbox
                      checked={arr.includes(opt)}
                      onChange={(e) => {
                        const newArr = e.target.checked
                          ? [...arr, opt]
                          : arr.filter((o) => o !== opt);
                        handleChange(key, newArr);
                      }}
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
          );
        }
        return (
          <FormControlLabel
            control={<Checkbox checked={!!value} onChange={(e) => handleChange(key, e.target.checked)} />}
            label={field.label}
          />
        );
      case "signature":
        return (
          <TextField
            label={field.label}
            fullWidth
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder="Signature"
          />
        );
      default:
        return (
          <TextField label={field.label} fullWidth value={value} onChange={(e) => handleChange(key, e.target.value)} />
        );
    }
  };

  return (
    <Paper sx={{ p: 4 }} elevation={4}>
      <Box component="form" onSubmit={handleSubmit}>
        {definition.sections.map((section, si) => (
          <Box key={si} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {section.title}
            </Typography>
            <Stack spacing={2}>
              {section.fields.map((field, fi) => (
                <Box key={fi}>{renderField(field, `${si}-${fi}`)}</Box>
              ))}
            </Stack>
          </Box>
        ))}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default FormRenderer;
