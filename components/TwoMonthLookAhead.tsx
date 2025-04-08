import { useEffect, useState } from "react";

type Task = {
  id: string;
  taskName: string;
  startDate: string;
  durationDays: number;
};

const TwoMonthLookAhead = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Replace with Microsoft Lists integration
    const mockTasks: Task[] = [
      { id: "1", taskName: "Install main panel", startDate: "2025-04-01", durationDays: 4 },
      { id: "2", taskName: "Conduit rough-in", startDate: "2025-04-08", durationDays: 5 },
    ];
    setTasks(mockTasks);
  }, []);

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">{task.taskName}</h3>
          <p>Start Date: {task.startDate} | Duration: {task.durationDays} day(s)</p>
        </div>
      ))}
    </div>
  );
};

export default TwoMonthLookAhead;
