import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="text-center">
      <h1 className="text-3xl">Welcome to the Chat App</h1>
      <p className="mt-4">
        <Link to="/chat/1" className="text-blue-500 hover:underline">
          Go to General Chat Room
        </Link>
      </p>
    </div>
  );
}

export default Index;