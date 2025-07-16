import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
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

import SignaturePad from "@/components/SignaturePad";

export type FormField = {
  label: string;
  type: string;
  options?: string[];
};

export type FormSection = {
  title: string;
  fields: FormField[];
};

export type FormJson = {
  title: string;
  sections: FormSection[];
};

// Row data for each section table
type RowData = {
  fieldKey: string;
  value?: any;
  notes?: string;
};

const renderFieldControl = (
  field: FormField,
  row: RowData,
  update: (val: Partial<RowData>) => void
) => {
  switch (field.type) {
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
    /* case "signature":
      return (
        <Box>
          <SignaturePad
            onChange={(sig) => {
              setClientSig(sig);
            }}
          />
          <TextField
            type="date"
            value={new Date().toISOString().split("T")[0]}
            disabled
            fullWidth
            sx={{ mb: 1 }}
          />
        </Box>
      ); */
    case "text":
    default:
      return (
        <TextField
          value={row.value || ""}
          onChange={(e) => update({ value: e.target.value })}
          fullWidth
        />
      );
  }
};

const FormRenderer = ({ formJson }: { formJson: FormJson }) => {
  const [sectionRows, setSectionRows] = useState<Record<string, RowData[]>>({});
  const [clientSig, setClientSig] = useState("");
  useEffect(() => {
    const init: Record<string, RowData[]> = {};
    formJson.sections.forEach((s) => {
      init[s.title] = [{ fieldKey: "" }];
    });
    setSectionRows(init);
  }, [formJson]);

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
      const field = formJson.sections
        .find((s) => s.title === section)
        ?.fields.find((f) => f.label === fieldKey);
      const rowData: RowData = { fieldKey };
      /* if (field?.type === "signature") {
        rowData.value = {
          date: new Date().toISOString().split("T")[0],
          signature: setClientSig(""),
        };
      } */
      rows[idx] = rowData;
      // append new row if last and not empty
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

  

  return (
    <>
      {formJson.sections.map((section) => (
        <Box key={section.title} mb={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {section.title}
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
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
                        {field &&
                          renderFieldControl(field, row, (val) =>
                            updateRow(section.title, idx, val)
                          )}
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
                            onChange={(e) =>
                              updateRow(section.title, idx, {
                                notes: e.target.value,
                              })
                            }
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

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Auditor Signature
      </Typography>
      <SignaturePad
        onChange={(sig) => {
          setClientSig(sig);
        }}
      />
      <TextField
        type="date"
        value={new Date().toISOString().split("T")[0]}
        disabled
        sx={{ mb: 1 }}
      />

      
    </>
  );
};

export default FormRenderer;
