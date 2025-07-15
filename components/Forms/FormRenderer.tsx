"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Radio,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "@/layout/Layout";
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

type RowData = {
  fieldKey: string;
  value?: any;
  notes?: string;
};

const renderFieldControl = (
  field: FormField,
  row: RowData,
  update: (val: Partial<RowData>) => void,
) => {
  switch (field.type) {
    case "radio":
      return (
        <FormGroup>
          {field.options?.map((opt) => (
            <FormControlLabel
              key={opt}
              control={
                <Radio
                  checked={row.value === opt}
                  onChange={() => update({ value: opt })}
                  value={opt}
                  name={`radio-${row.fieldKey}`} // ensures radios are grouped
                />
              }
              label={opt}
            />
          ))}
        </FormGroup>
      );
    case "checkbox":
      return (
        <FormGroup>
          {field.options?.map((opt) => (
            <FormControlLabel
              key={opt}
              control={
                <Checkbox
                  checked={Array.isArray(row.value) ? row.value.includes(opt) : false}
                  onChange={(e) => {
                    const arr = Array.isArray(row.value) ? [...row.value] : [];
                    if (e.target.checked) arr.push(opt);
                    else update({ value: arr.filter((v) => v !== opt) });
                    update({ value: arr });
                  }}
                />
              }
              label={opt}
            />
          ))}
        </FormGroup>
      );
    case "dropdown":
      return (
        <FormControl fullWidth size="small">
          <Select value={row.value || ""} onChange={(e) => update({ value: e.target.value })}>
            {field.options?.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case "textarea":
      return (
        <TextField
          multiline
          minRows={3}
          value={row.value || ""}
          onChange={(e) => update({ value: e.target.value })}
          fullWidth
        />
      );
    case "date":
      return (
        <TextField
          type="date"
          value={row.value || ""}
          onChange={(e) => update({ value: e.target.value })}
          fullWidth
        />
      );
    case "text":
    default:
      return (
        <TextField value={row.value || ""} onChange={(e) => update({ value: e.target.value })} fullWidth />
      );
  }
};

const FormRenderer = ({ definition }: { definition: FormDefinition }) => {
  const [sectionRows, setSectionRows] = useState<Record<string, RowData[]>>({});

  useEffect(() => {
    const init: Record<string, RowData[]> = {};
    definition.sections.forEach((s) => {
      init[s.title] = [{ fieldKey: "" }];
    });
    setSectionRows(init);
  }, [definition]);

  const updateRow = (section: string, idx: number, row: Partial<RowData>) => {
    setSectionRows((prev) => {
      const rows = prev[section] ? [...prev[section]] : [];
      rows[idx] = { ...rows[idx], ...row };
      return { ...prev, [section]: rows };
    });
  };

  const handleSelectField = (section: string, idx: number, fieldKey: string) => {
    setSectionRows((prev) => {
      const rows = prev[section] ? [...prev[section]] : [];
      rows[idx] = { fieldKey };
      if (idx === rows.length - 1 && fieldKey) {
        rows.push({ fieldKey: "" });
      }
      return { ...prev, [section]: rows };
    });
  };

  const removeRow = (section: string, idx: number) => {
    setSectionRows((prev) => {
      const rows = prev[section] ? [...prev[section]] : [];
      rows.splice(idx, 1);
      if (rows.length === 0) rows.push({ fieldKey: "" });
      return { ...prev, [section]: rows };
    });
  };

  const handleSubmit = async () => {
    try {
      await submitEHSForm({
        formTitle: definition.title,
        submissionDate: new Date().toISOString(),
        sections: sectionRows,
      });
      alert("Form submitted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit form.");
    }
  };

  return (
   /*  <Layout title={definition.title}>*/
      <Paper sx={{ p: 4 }} elevation={2}> 
      
        {definition.sections.map((section) => (
          <Box key={section.title} mb={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {section.title}
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Inpection Item</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {sectionRows[section.title]?.map((row, idx) => {
                  const field = section.fields.find((f) => f.label === row.fieldKey);
                  return (
                    <>
                      <TableRow key={`${section.title}-${idx}`}>
                        <TableCell sx={{ width: "30%" }}>
                          <Select
                            size="small"
                            fullWidth
                            value={row.fieldKey}
                            onChange={(e) =>
                              handleSelectField(section.title, idx, e.target.value as string)
                            }
                          >
                            <MenuItem value="">Select field</MenuItem>
                            {section.fields.map((f) => (
                              <MenuItem key={f.label} value={f.label}>
                                {f.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          {field && renderFieldControl(field, row, (val) => updateRow(section.title, idx, val))}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => removeRow(section.title, idx)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      {field && (field.type === "checkbox" || field.type === "dropdown") && (
                        <TableRow key={`${section.title}-${idx}-notes`}>
                          <TableCell colSpan={3}>
                            <TextField
                              fullWidth
                              label="Notes"
                              value={row.notes || ""}
                              onChange={(e) => updateRow(section.title, idx, { notes: e.target.value })}
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        ))}
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Form
        </Button>
      </Paper>
    /* </Layout>*/
  ); 
};

export default FormRenderer;
