import { useState, useEffect } from "react";

import { createChatRoom } from "../../services/ChatService";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
  users,
  chatRooms = [],
  setChatRooms,
  onlineUsersId,
  currentUser,
  changeChat,
  fetchData,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const { token, setError } = useAuth();
  const navigate = useNavigate();

  const changeCurrentChat = (chat) => {
    //setSelectedChat(index);
    changeChat(chat);
  };

  const handleNewChatRoom = async (user) => {
    const res = await createChatRoom(token, currentUser.userName,user);
    if (!res.success) {
      setError("try again later.");
      return;
    }
    console.log("res.....",res)
    changeChat(res?.chatRoom);
  };

  return (
    <>
      <ul className="overflow-auto h-[30rem]">
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">Chats</h2>
        <li>
          {users?.chatrooms?.map((chatRoom, index) => (
            <div
              key={index}
              className={classNames(
                index === selectedChat
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700",
                "flex items-center px-3 py-2 text-sm "
              )}
              onClick={() => changeCurrentChat(chatRoom)}
            >
              <Contact chatRoom={chatRoom} allusers={users.allusers} />
            </div>
          ))}
        </li>

        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">
          Friend Requests
        </h2>
        <li>
          {users?.friendRequested?.map((request, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNewChatRoom(request?.friendUser)}
            >
              <UserLayout
                user={request}
                //onlineUsersId={onlineUsersId}
                type="friendRequested"
                fetchData={fetchData}
              />
            </div>
          ))}
        </li>
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">
          Friends
        </h2>
        <li>
          {users?.friendList?.map((Contact, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNewChatRoom(Contact?.userName)}
            >
              <UserLayout
                user={Contact}
                //onlineUsersId={onlineUsersId}
                type="friendList"
                fetchData={fetchData}
              />
            </div>
          ))}
        </li>
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">
          Other Users
        </h2>
        <li>
          {users?.others?.map((nonContact, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNewChatRoom(nonContact?.userName)}
            >
              <UserLayout
                user={nonContact}
                //onlineUsersId={onlineUsersId}
                type={"others"}
                fetchData={fetchData}
              />
            </div>
          ))}
        </li>
      </ul>
    </>
  );
}
