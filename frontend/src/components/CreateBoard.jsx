import React, { useState } from 'react';

export default function CreateBoard({ onBoardCreated }) {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Board name is required");
      return;
    }
    await fetch(`${import.meta.env.VITE_API_BASE}/api/boards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName('');
    onBoardCreated();
  };

   return (
    <div className="mb-6 flex items-center space-x-4">
      <input 
        className="input bg-amber-300 text-black text-2xl"
        placeholder="Board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="btn bg-green-500  text-black text-2xl"
        onClick={handleCreate}
      >
        Create Board
      </button>
    </div>
  );
}