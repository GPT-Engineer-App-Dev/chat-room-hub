import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function MessageInput({ roomId }) {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: async (newMessage) => {
      const response = await fetch(`/api/rooms/${roomId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", roomId]);
    },
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageMutation.mutate({ text: message });
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
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-2 py-1 rounded"
        disabled={sendMessageMutation.isLoading}
      >
        {sendMessageMutation.isLoading ? "Sending..." : "Send"}
      </button>
      {sendMessageMutation.isError && (
        <p className="text-red-500 mt-2">Error: {sendMessageMutation.error.message}</p>
      )}
    </div>
  );
}

export default MessageInput;