import { useState } from "react";

type CrewEntry = {
  taskName: string;
  crew: string;
  headcount: number;
  hours: number;
};

const CrewAssignment = () => {
  const [entries, setEntries] = useState<CrewEntry[]>([]);

  const addEntry = () => {
    setEntries([...entries, { taskName: "", crew: "", headcount: 1, hours: 0 }]);
  };

  const update = <K extends keyof CrewEntry>(
    index: number,
    field: K,
    value: CrewEntry[K]
  ) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    setEntries(updated);
  };
  

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Crew Assignments</h2>
      {entries.map((entry, i) => (
        <div key={i} className="bg-white p-4 rounded shadow space-y-2">
          <input
            value={entry.taskName}
            onChange={(e) => update(i, "taskName", e.target.value)}
            placeholder="Task Name"
            className="input"
          />
          <input
            value={entry.crew}
            onChange={(e) => update(i, "crew", e.target.value)}
            placeholder="Crew Name"
            className="input"
          />
          <input
            type="number"
            value={entry.headcount}
            onChange={(e) => update(i, "headcount", Number(e.target.value))}
            placeholder="Headcount"
            className="input"
          />
          <input
            type="number"
            value={entry.hours}
            onChange={(e) => update(i, "hours", Number(e.target.value))}
            placeholder="Hours Worked"
            className="input"
          />
        </div>
      ))}
      <button type="button" onClick={addEntry} className="btn-secondary">+ Add Crew Assignment</button>
    </div>
  );
};

export default CrewAssignment;
