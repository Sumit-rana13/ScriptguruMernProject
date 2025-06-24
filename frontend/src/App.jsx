import { useState, useEffect } from 'react';
// import Sidebar from './components/Sidebar';
import Sidebar from './components/SideBar';
import Board from './components/Board';
import CreateBoard from './components/CreateBoard';

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const loadBoards = () => {
    fetch('http://localhost:5000/api/boards')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        setBoards(data);
        if (!selectedBoard && data.length > 0) setSelectedBoard(data[0]);
      });
  };

  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <div className="flex h-screen bg-gray-400">
      
      <Sidebar boards={boards} onSelect={setSelectedBoard} />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <CreateBoard onBoardCreated={loadBoards} />
        </div>
        {selectedBoard ? (
          <Board board={selectedBoard} />
        ) : (
          <p className="p-4 text-gray-600">No board selected</p>
        )}
      </div>

      
    </div>
  );
}

export default App;