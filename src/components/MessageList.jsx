import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import io from "socket.io-client";

const fetchMessages = async (roomId) => {
  const response = await fetch(`/api/rooms/${roomId}/messages`);
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
};

function MessageList({ roomId }) {
  const { data: messages, error, isLoading } = useQuery({
    queryKey: ["messages", roomId],
    queryFn: () => fetchMessages(roomId),
  });

  const [socketMessages, setSocketMessages] = useState([]);

  useEffect(() => {
    const socket = io();

    socket.emit("joinRoom", roomId);

    socket.on("newMessage", (message) => {
      setSocketMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const allMessages = [...messages, ...socketMessages];

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {allMessages.map((msg) => (
        <div key={msg.id} className="mb-2">
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}

export default MessageList;