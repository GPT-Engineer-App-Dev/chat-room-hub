import { useState } from "react";
import { Link } from "react-router-dom";

const mockChatRooms = [
  { id: 1, name: "General" },
  { id: 2, name: "Tech Talk" },
  { id: 3, name: "Random" },
];

function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState(mockChatRooms);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chat Rooms</h2>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id} className="mb-2">
            <Link to={`/chat/${room.id}`} className="text-blue-500 hover:underline">
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRoomList;