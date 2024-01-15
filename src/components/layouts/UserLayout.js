import LetterThumbnaill from "./LetterThumbnaill";
import {
  acceptFreindReq,
  raiseFreindReq,
  declineFreindReq,
} from "../../services/ChatService";
import { useAuth } from "../../contexts/AuthContext";

export default function UserLayout({ user, type, fetchData }) {
  const { token, currentUser, setError } = useAuth();

  const acceptFreindRequsest = async (e) => {
    e.preventDefault();
    const acceptReq = await acceptFreindReq(
      token,
      currentUser.userName,
      user?.friendUser
    );
    if (!acceptReq.success) {
      setError("Not accepted. try again later.");
      return;
    }
    fetchData;
  };
  const declineFreindRequsest = async (e) => {
    const acceptReq = await declineFreindReq(
      token,
      currentUser.userName,
      user?.friendUser
    );
    if (!acceptReq.success) {
      setError("Request not declined try again.");
      return;
    }
    fetchData();
  };
  const raiseFreindRequsest = async (e) => {
    const acceptReq = await raiseFreindReq(
      token,
      currentUser?.userName,
      user?.userName
    );
    if (!acceptReq.success) {
      setError("Request not sent try again.");
      return;
    }
    fetchData();
  };
  return (
    <div className="relative flex items-center w-full">
      <LetterThumbnaill text={type === "friendRequested" ? user?.friendUser : user?.userName} backgroundColor="#3498db" />
      <span className="block ml-2 text-gray-500 dark:text-gray-400">
        {type === "friendRequested" ? user?.friendUser : user?.userName}
      </span>
      {user?.status !== "offline" ? (
        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-500 dark:bg-green-400 border-2 border-white rounded-full"></span>
      ) : (
        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
      )}

      {type === "friendRequested" && (
        <div className="flex ml-auto space-x-2">
          <button
            className="px-4 py-2 rounded-full bg-green-500 text-white"
            onClick={(e)=> {acceptFreindRequsest(e)}}
          >
            Accept
          </button>
          <button
            className="px-4 py-2 rounded-full bg-red-500 text-white"
            onClick={(e)=>{declineFreindRequsest(e)}}
          >
            Reject
          </button>
        </div>
      )}
      {type === "others" && (
        <div className="flex ml-auto space-x-4">
          <button
            className="px-4 py-2 rounded-full bg-blue-500 text-white"
            onClick={(e)=>{raiseFreindRequsest(e)}}
          >
            Request
          </button>
        </div>
      )}
    </div>
  );
}
