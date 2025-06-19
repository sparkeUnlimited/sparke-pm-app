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
