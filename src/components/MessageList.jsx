import { useState, useEffect } from "react";

const mockMessages = [
  { id: 1, text: "Hello everyone!", user: "Alice" },
  { id: 2, text: "Hi Alice!", user: "Bob" },
];

function MessageList({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages for the room (mock implementation)
    setMessages(mockMessages);
  }, [roomId]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => (
        <div key={msg.id} className="mb-2">
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}

export default MessageList;