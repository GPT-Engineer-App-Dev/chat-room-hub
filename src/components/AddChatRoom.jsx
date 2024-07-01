import { useState } from "react";

function AddChatRoom() {
  const [roomName, setRoomName] = useState("");

  const handleAddRoom = () => {
    if (roomName.trim()) {
      // Add room to the list (mock implementation)
      console.log("New room added:", roomName);
      setRoomName("");
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="New room name"
        className="border rounded px-2 py-1 mr-2"
      />
      <button onClick={handleAddRoom} className="bg-blue-500 text-white px-2 py-1 rounded">
        Add Room
      </button>
    </div>
  );
}

export default AddChatRoom;