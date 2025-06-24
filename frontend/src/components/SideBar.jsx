import React from 'react';

export default function Sidebar({ boards, onSelect }) {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-semibold mb-4">Boards</h2>
      <ul className="space-y-2">
        {boards.map((board) => (
          <li
            key={board._id}
            onClick={() => onSelect(board)}
            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          >
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  );
}