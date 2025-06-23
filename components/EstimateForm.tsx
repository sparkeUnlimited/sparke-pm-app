import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getServices, ServiceItem } from "@/lib/msLists";
import { sendEstimateEmail, ensureCustomerFolder } from "@/lib/api";

const provinces = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
] as const;

const formatPostalCode = (value: string) => {
  const upper = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const first = upper.slice(0, 3);
  const last = upper.slice(3, 6);
  return last ? `${first} ${last}` : first;
};


export type EstimateRow = {
  serviceId?: string;
  labourUnits: number;
  unit: "Each" | "C" | "M";
};

export type MaterialRow = {
  name: string;
  units: number;
  unitCost: number;
  unit: "Each" | "C" | "M";
};

const unitDivisor = { Each: 1, C: 100, M: 1000 } as const;

const EstimateForm = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetNum, setStreetNum] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("ON");
  const [postalCode, setPostalCode] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [labourRows, setLabourRows] = useState<EstimateRow[]>([{ labourUnits: 0, unit: "Each" }]);
  const [materialRows, setMaterialRows] = useState<MaterialRow[]>([
    { name: "", units: 0, unitCost: 0, unit: "Each" },
  ]);

  const [labourMarkup, setLabourMarkup] = useState(0);
  const [materialMarkup, setMaterialMarkup] = useState(0);
  const [esaFee, setEsaFee] = useState(0);
  const [discountType, setDiscountType] = useState("None");
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const customerValid =
    firstName &&
    lastName &&
    streetNum &&
    streetName &&
    city &&
    province &&
    postalCode &&
    contactMethod &&
    phone &&
    email;

  const addLabourRow = () => {
    setLabourRows((r) => [...r, { labourUnits: 0, unit: "Each" }]);
  };

  const removeLabourRow = (idx: number) => {
    setLabourRows((r) => r.filter((_, i) => i !== idx));
  };

  const updateLabourRow = (idx: number, row: Partial<EstimateRow>) => {
    setLabourRows((r) => r.map((item, i) => (i === idx ? { ...item, ...row } : item)));
  };

  const addMaterialRow = () => {
    setMaterialRows((r) => [...r, { name: "", units: 0, unitCost: 0, unit: "Each" }]);
  };

  const removeMaterialRow = (idx: number) => {
    setMaterialRows((r) => r.filter((_, i) => i !== idx));
  };

  const updateMaterialRow = (idx: number, row: Partial<MaterialRow>) => {
    setMaterialRows((r) => r.map((item, i) => (i === idx ? { ...item, ...row } : item)));
  };

  const labourSum = labourRows.reduce((sum, r) => sum + r.labourUnits / unitDivisor[r.unit], 0);
  const labourMarkupAmt = labourSum * (labourMarkup / 100);
  const totalLabour = labourSum + labourMarkupAmt;

  const materialSum = materialRows.reduce(
    (sum, r) => sum + r.units * (r.unitCost / unitDivisor[r.unit]),
    0
  );
  const materialMarkupAmt = materialSum * (materialMarkup / 100);
  const totalMaterial = materialSum + materialMarkupAmt;

  const cost = totalLabour + totalMaterial;
  const warranty = cost * 0.03;
  const subtotal = cost + warranty + esaFee;

  const discountAmt =
    discountType === "Dollar"
      ? discountValue
      : discountType === "Percent"
        ? subtotal * (discountValue / 100)
        : 0;

  const grandTotal = subtotal - discountAmt;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      customer: {
        firstName,
        lastName,
        streetNum,
        streetName,
        city,
        province,
        postalCode,
        contactMethod,
        phone,
        email,
      },
      labourRows,
      materialRows,
      labourMarkup,
      materialMarkup,
      esaFee,
      discountType,
      discountValue,
      totals: {
        labourSum,
        materialSum,
        totalLabour,
        totalMaterial,
        cost,
        warranty,
        discountAmt,
        grandTotal,
      },
    };

    const pdfBlob = new Blob([], { type: "application/pdf" });
    await ensureCustomerFolder(`${firstName}_${lastName}/${streetName}`);
    await sendEstimateEmail(data, pdfBlob);
  };

  return (
    <Paper sx={{ p: 4 }} elevation={4}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold">
            Customer Information
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Street Number"
              value={streetNum}
              onChange={(e) => setStreetNum(e.target.value)}
              required
            />
            <TextField
              label="Street Name"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              required
            />
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <FormControl fullWidth required>
                <InputLabel id="prov">Province</InputLabel>
                <Select
                  labelId="prov"
                  label="Province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  {provinces.map((p) => (
                    <MenuItem key={p.code} value={p.code}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                label="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(formatPostalCode(e.target.value))}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Box>
            <Typography fontWeight="medium" gutterBottom>
              Preferred Contact
            </Typography>
            <RadioGroup
              row
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value)}
            >
              <FormControlLabel value="phone" control={<Radio required />} label="Phone/Mobile" />
              <FormControlLabel value="email" control={<Radio required />} label="Email" />
            </RadioGroup>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
              <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Stack>
          </Box>

          {customerValid && (
            <>
              <Typography variant="h6" fontWeight="bold">
                Labour
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Service</TableCell>
                    <TableCell>Labour Units</TableCell>
                    <TableCell>Unit Amount</TableCell>
                    <TableCell>Extension</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {labourRows.map((row, idx) => {
                    const service = services.find((s) => s.id === row.serviceId);
                    const units = service ? service.labourUnits : row.labourUnits;
                    const ext = units / unitDivisor[row.unit];
                    return (
                      <TableRow key={idx}>
                        <TableCell>
                          <FormControl fullWidth size="small">
                            <InputLabel>Service</InputLabel>
                            <Select
                              value={row.serviceId || ""}
                              label="Service"
                              onChange={(e) =>
                                updateLabourRow(idx, {
                                  serviceId: e.target.value,
                                  labourUnits:
                                    services.find((s) => s.id === e.target.value)?.labourUnits || 0,
                                })
                              }
                            >
                              {services.map((s) => (
                                <MenuItem key={s.id} value={s.id}>
                                  {s.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={units}
                            onChange={(e) =>
                              updateLabourRow(idx, { labourUnits: Number(e.target.value) })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={row.unit}
                            onChange={(e) => updateLabourRow(idx, { unit: e.target.value as any })}
                          >
                            <MenuItem value="Each">Each</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>{ext.toFixed(2)}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => removeLabourRow(idx)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Box textAlign="right" my={1}>
                <IconButton onClick={addLabourRow} size="small">
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography>Labour Sum: {labourSum.toFixed(2)}</Typography>
              <TextField
                label="Markup %"
                type="number"
                value={labourMarkup}
                onChange={(e) => setLabourMarkup(Number(e.target.value))}
              />
              <Typography>Markup Amount: {labourMarkupAmt.toFixed(2)}</Typography>
              <Typography>Total Labour: {totalLabour.toFixed(2)}</Typography>

              <Typography variant="h6" fontWeight="bold" mt={4}>
                Material
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Units</TableCell>
                    <TableCell>Unit Cost</TableCell>
                    <TableCell>Unit Multiplier</TableCell>
                    <TableCell>Extension</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materialRows.map((row, idx) => {
                    const ext = row.units * (row.unitCost / unitDivisor[row.unit]);
                    return (
                      <TableRow key={idx}>
                        <TableCell>
                          <TextField
                            size="small"
                            value={row.name}
                            onChange={(e) => updateMaterialRow(idx, { name: e.target.value })}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={row.units}
                            onChange={(e) =>
                              updateMaterialRow(idx, { units: Number(e.target.value) })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={row.unitCost}
                            onChange={(e) =>
                              updateMaterialRow(idx, { unitCost: Number(e.target.value) })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={row.unit}
                            onChange={(e) =>
                              updateMaterialRow(idx, { unit: e.target.value as any })
                            }
                          >
                            <MenuItem value="Each">Each</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>{ext.toFixed(2)}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => removeMaterialRow(idx)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Box textAlign="right" my={1}>
                <IconButton onClick={addMaterialRow} size="small">
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography>Material Sum: {materialSum.toFixed(2)}</Typography>
              <TextField
                label="Markup %"
                type="number"
                value={materialMarkup}
                onChange={(e) => setMaterialMarkup(Number(e.target.value))}
              />
              <Typography>Markup Amount: {materialMarkupAmt.toFixed(2)}</Typography>
              <Typography>Total Material: {totalMaterial.toFixed(2)}</Typography>

              <Typography variant="h6" fontWeight="bold" mt={4}>
                Totals
              </Typography>
              <Typography>Cost: {cost.toFixed(2)}</Typography>
              <Typography>Warranty (3%): {warranty.toFixed(2)}</Typography>
              <TextField
                label="ESA Inspection"
                type="number"
                value={esaFee}
                onChange={(e) => setEsaFee(Number(e.target.value))}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                <FormControl>
                  <InputLabel id="disc">Discount</InputLabel>
                  <Select
                    labelId="disc"
                    label="Discount"
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                  >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Dollar">Dollar Discount</MenuItem>
                    <MenuItem value="Percent">Percent Discount</MenuItem>
                  </Select>
                </FormControl>
                {(discountType === "Dollar" || discountType === "Percent") && (
                  <TextField
                    label="Discount Value"
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                  />
                )}
              </Stack>
              <Typography>Total Discount: {discountAmt.toFixed(2)}</Typography>
              <Typography variant="h6" fontWeight="bold">
                Grand Total: {grandTotal.toFixed(2)}
              </Typography>
              <Button type="submit" variant="contained">
                Submit Estimate
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Paper>
  );
};

export default EstimateForm;
