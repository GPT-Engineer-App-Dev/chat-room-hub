import { useParams } from "react-router-dom";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

function ChatRoom() {
  const { roomId } = useParams();

  return (
    <div className="flex flex-col h-full">
      <MessageList roomId={roomId} />
      <MessageInput roomId={roomId} />
    </div>
  );
}

export default ChatRoom;