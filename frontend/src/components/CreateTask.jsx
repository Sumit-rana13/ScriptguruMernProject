import { useState } from "react";

export default function CreateTaskModal({ boardId, onTaskCreated, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (e) => {
  //     if (!formData.title.trim()) {
  //   alert("Title is required");
  //   return;
  // }
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async () => {
    await fetch(`http://localhost:5000/api/boards/${boardId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    onTaskCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded w-96">
        <h2 className="text-lg font-semibold mb-4">Create Task</h2>
        <input name="title" placeholder="Title" className="input" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="input mt-2" onChange={handleChange} />
        <input name="assignedTo" placeholder="Assigned To" className="input mt-2" onChange={handleChange} />
        <select name="priority" className="input mt-2" onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input name="dueDate" type="date" className="input mt-2" onChange={handleChange} />
        <div className="flex justify-end mt-4 space-x-2">
          <button className="btn bg-gray-300" onClick={onClose}>Cancel</button>
          <button className="btn bg-blue-500 text-white" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}