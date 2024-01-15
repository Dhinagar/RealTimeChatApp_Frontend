import LetterThumbnaill from "../layouts/LetterThumbnaill";

import { useAuth } from "../../contexts/AuthContext";

export default function Contact({ chatRoom =[], allusers=[] }) {
  const { token, currentUser, setError } = useAuth();
  const onlineUser =
    chatRoom.user1 === currentUser.userName ? chatRoom.user2 : chatRoom.user1;

  function findUserStatus(usersArray, targetUserName) {
    const user = usersArray.find((user) => user.userName === targetUserName);

    if (user) {
      return user.status;
    } else {
      return "User not found";
    }
  }

  const userStatus = findUserStatus(allusers, onlineUser);
  const navigateToChatRoom = () => {};

  return (
    <div
      className="relative flex items-center w-full"
      onClick={() => {
        navigateToChatRoom();
      }}
    >
      <LetterThumbnaill
        text={
          chatRoom.user1 === currentUser.userName
            ? chatRoom.user2
            : chatRoom.user1
        }
        backgroundColor="#3498db"
      />
      <span className="block ml-2 text-gray-500 dark:text-gray-400">
        {chatRoom.user1 === currentUser.userName
          ? chatRoom.user2
          : chatRoom.user1}
      </span>
      {userStatus !== "offline" ? (
        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-500 dark:bg-green-400 border-2 border-white rounded-full"></span>
      ) : (
        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
      )}
    </div>
  );
}
