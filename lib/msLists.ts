export type MaterialItem = {
  id: string;
  taskId: string;
  name: string;
  dateNeeded: string;
  leadTimeDays: number;
  status: "To Order" | "Ordered" | "Delivered";
  deliveryNotes?: string;
};

export const getTasks = async () => {
  return [
    {
      id: "1",
      taskName: "Install panels",
      startDate: "2025-04-01",
      durationDays: 3,
      subtasks: ["Mount panel", "Label breakers"],
      progress: 0,
    },
    {
      id: "2",
      taskName: "Run conduit",
      startDate: "2025-04-04",
      durationDays: 2,
      subtasks: ["Trench", "Bend", "Strap"],
      progress: 0,
    },
  ];
};

export const submitJournalEntry = async (entry: any) => {
  const item = {
    Title: "Journal Entry",
    Email: entry.email,
    Notes: entry.notes,
    WeatherSummary: `Temp: ${entry.weather?.temperature}°C, Wind: ${entry.weather?.windSpeed} km/h`,
    Tasks: JSON.stringify(entry.tasks),
  };

  console.log("Submit to MS List:", item);

  // TODO: Replace this with actual Microsoft Graph POST to your list
  return Promise.resolve(item);
};

export const getMaterials = async (): Promise<MaterialItem[]> => {
  return [
    {
      id: "mat-1",
      taskId: "1",
      name: "4x4 Electrical Box",
      dateNeeded: "2025-04-02",
      leadTimeDays: 2,
      status: "To Order",
    },
  ];
};

export const updateMaterialStatus = async (
  id: string,
  status: "Ordered" | "Delivered",
  notes?: string
) => {
  console.log(`Updating material ${id} to ${status}`, notes ? `Notes: ${notes}` : "");
};

export type ServiceItem = {
  id: string;
  name: string;
  labourRate: number;
};

export const getServices = async (): Promise<ServiceItem[]> => {
  return [
    { id: "svc-1", name: "Residential Service/Repair", labourRate: 125 },
    { id: "svc-2", name: "Residential Renovation", labourRate: 125 },
    { id: "svc-3", name: "Residential New Construction", labourRate: 125 },
    { id: "svc-4", name: "Commercial Service/Repair", labourRate: 145 },
    { id: "svc-5", name: "Commercial Tenant Fit-Up", labourRate: 145 },
    { id: "svc-6", name: "Commercial New Construction", labourRate: 145 },
    { id: "svc-7", name: "Commercial Change Order", labourRate: 194 },
    { id: "svc-8", name: "EV Charger Install (Residential)", labourRate: 125 },
    { id: "svc-9", name: "EV Charger Install (Commercial)", labourRate: 145 },
    { id: "svc-10", name: "Fire Alarm Install", labourRate: 145 },
    { id: "svc-11", name: "Fire Alarm Change Request", labourRate: 194 },
    { id: "svc-12", name: "Generator Install (Residential)", labourRate: 125 },
    { id: "svc-13", name: "Generator Install (Commercial)", labourRate: 145 },
    { id: "svc-14", name: "Low-Voltage / Smart Home", labourRate: 125 },
  ];
};
