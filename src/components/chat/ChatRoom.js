import { useState, useEffect, useRef } from "react";

import { getMessagesOfChatRoom, sendMessage } from "../../services/ChatService";

import Message from "./Message";
import Contact from "./Contact";
import ChatForm from "./ChatForm";
import { useAuth } from "../../contexts/AuthContext";

export default function ChatRoom({ chatRoom, socket }) {
  const { token, currentUser, setError } = useAuth();
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesOfChatRoom(token, chatRoom.chatroomId);
      if (!res.success) {
        setError("oops, can't get chat messages.");
        setMessages([]);
        return;
      }
      setMessages(res?.messages);
    };
    fetchData();
  }, [chatRoom.chatroomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  
  useEffect(() => {
    //register the socket
    socket.current.emit('setUserId', currentUser.userName);

    socket.current?.on("getMessage", (data) => {
      setIncomingMessage(data);
    });

  }, []);

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  const handleFormSubmit = async (message) => {
    const receiverId =
      chatRoom.user1 === currentUser.userName ? chatRoom.user2 : chatRoom.user1;
    socket.current.emit("sendMessage", {
      senderId: currentUser.userName,
      receiverId: receiverId,
      message: message,
    });

    const messageBody = {
      chatroomId: chatRoom.chatroomId,
      message: message,
      sourceUserName: currentUser.userName,
      destinationUserName: receiverId,
    };
    const res = await sendMessage(token,messageBody);
    if(!res.success){
      setError("message not sent.")
      return
    }
    setMessages([...messages, res.mge]);
  };

  return (
    <div className="lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <Contact chatRoom={chatRoom} currentUser={currentUser} />
        </div>

        <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <div key={currentUser.userName} ref={scrollRef}>
                <Message message={message} self={currentUser.userName} />
              </div>
            ))}
          </ul>
        </div>

        <ChatForm handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
