import { useState } from "react";

function MessageInput({ roomId }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send message to the room (mock implementation)
      console.log("Message sent to room", roomId, ":", message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="border rounded px-2 py-1 mr-2 w-full"
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white px-2 py-1 rounded">
        Send
      </button>
    </div>
  );
}

export default MessageInput;