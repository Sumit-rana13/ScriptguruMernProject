export default function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <div className="bg-white rounded p-3 shadow mb-2 border border-gray-200 text-black">
      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs">Due: {task.dueDate?.slice(0, 10)}</p>
      <p className="text-xs">Assigned to: {task.assignedTo || 'Unassigned'}</p>
      {/* <p className="text-xs text-gray-500">Priority: {task.priority}</p> */}

      <span className={`text-xs px-2 py-1 rounded-full text-white ${
        task.priority === "High" ? "bg-red-500" :
        task.priority === "Medium" ? "bg-yellow-500" :
        "bg-green-500"}`}>{task.priority}</span>

      <select
        value={task.status}
        onChange={e => onStatusChange(task._id, e.target.value)}
        className="mt-2 w-full p-1 border rounded text-sm"
      >
        {['To Do', 'In Progress', 'Done'].map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

       <div className="flex justify-end space-x-2 mt-2">
        <button className="text-red-500 text-xs" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}
