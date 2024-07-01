import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchChatRooms = async () => {
  const response = await fetch("/api/rooms");
  if (!response.ok) {
    throw new Error("Failed to fetch chat rooms");
  }
  return response.json();
};

function ChatRoomList() {
  const { data: chatRooms, error, isLoading } = useQuery({
    queryKey: ["chatRooms"],
    queryFn: fetchChatRooms,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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