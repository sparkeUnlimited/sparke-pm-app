import { useEffect, useState } from "react";

type Task = {
  id: string;
  taskName: string;
  startDate: string;
  durationDays: number;
};

const TwoWeekLookAhead = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Replace with Microsoft Lists integration
    const mockTasks: Task[] = [
      { id: "1", taskName: "Trench feeder conduit", startDate: "2025-04-01", durationDays: 2 },
      { id: "2", taskName: "Pull feeder cable", startDate: "2025-04-03", durationDays: 1 },
    ];
    setTasks(mockTasks);
  }, []);

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">{task.taskName}</h3>
          <p>Starts: {task.startDate} | Duration: {task.durationDays} day(s)</p>
        </div>
      ))}
    </div>
  );
};

export default TwoWeekLookAhead;
