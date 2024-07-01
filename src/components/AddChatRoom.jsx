import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddChatRoom() {
  const [roomName, setRoomName] = useState("");
  const queryClient = useQueryClient();

  const createRoomMutation = useMutation({
    mutationFn: async (newRoom) => {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      });
      if (!response.ok) {
        throw new Error("Failed to create room");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries("chatRooms");
    },
  });

  const handleAddRoom = () => {
    if (roomName.trim()) {
      createRoomMutation.mutate({ name: roomName });
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
      <button
        onClick={handleAddRoom}
        className="bg-blue-500 text-white px-2 py-1 rounded"
        disabled={createRoomMutation.isLoading}
      >
        {createRoomMutation.isLoading ? "Creating..." : "Add Room"}
      </button>
      {createRoomMutation.isError && (
        <p className="text-red-500 mt-2">Error: {createRoomMutation.error.message}</p>
      )}
    </div>
  );
}

export default AddChatRoom;