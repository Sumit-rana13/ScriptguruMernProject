import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import CreateTaskModal from './CreateTask';

export default function Board({ board }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // const loadTasks = () => {
  //   fetch(`http://localhost:5000/api/boards/${board._id}/tasks`)
  //     .then(res => res.json())
  //     .then(data => setTasks(data));
  // };
  const loadTasks = () => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/boards/${board._id}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    loadTasks();
  }, [board]);

  const handleStatusChange = (taskId, newStatus) => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    }).then(loadTasks);
  };

  const handleDelete = (taskId) => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/tasks/${taskId}`, { method: 'DELETE' })
      .then(loadTasks);
  };

  const grouped = { 'To Do': [], 'In Progress': [], 'Done': [] };
  tasks.forEach(task => grouped[task.status]?.push(task));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{board.name}</h2>
        <button className="btn bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>
          + Add Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(grouped).map(([status, tasks]) => (
          <div key={status}>
            <h3 className="text-lg font-semibold mb-2">{status}</h3>
            <div className="space-y-2">
              {tasks.map(task => (
                <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <CreateTaskModal boardId={board._id} onTaskCreated={loadTasks} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}