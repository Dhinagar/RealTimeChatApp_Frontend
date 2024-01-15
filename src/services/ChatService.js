import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";
const auth = {
  currentUser: {
    getIdToken: () => {
      // Placeholder for login logic
      return new Promise((resolve, reject) => {
        // Simulate success
        resolve({});
        // Simulate failure
        // reject("Login failed");
      });
    },
  },
};

const baseURL = "http://localhost:5000";
const baseURLSIO = "http://localhost:5000";

export const initiateSocketConnection = async (token) => {
  const socket = io(baseURLSIO, {
    auth: {
      token,
    },
  });
  return socket;
};

const createHeader = async (token) => {
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

export const getAllUsers = async (token, username) => {
  const header = await createHeader(token);
  try {
    const res = await axios.get(
      `${baseURL}/profile/getAllUsersByuserName/${username}`,
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const raiseFreindReq = async (token, srcUsername, destiUserName) => {
  const header = await createHeader(token);
  try {
    let bodyData = {
      sourceUserName: srcUsername,
      destinationUserName: destiUserName,
    };
    console.log("bodyData.....", bodyData);
    const res = await axios.post(
      `${baseURL}/friends/raiseFriendRequest`,
      bodyData,
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const declineFreindReq = async (token, srcUsername, destiUserName) => {
  const header = await createHeader(token);
  try {
    const res = await axios.post(
      `${baseURL}/friends/declineFriendRequest`,
      { sourceUserName: srcUsername, destinationUserName: destiUserName },
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const acceptFreindReq = async (token, srcUsername, destiUserName) => {
  const header = await createHeader(token);
  try {
    const res = await axios.post(
      `${baseURL}/friends/acceptFriendRequest`,
      { sourceUserName: srcUsername, destinationUserName: destiUserName },
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (userId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/user/${userId}`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getUsers = async (users) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/user/users`, users, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getChatRooms = async (userId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/room/${userId}`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getChatRoomOfUsers = async (firstUserId, secondUserId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(
      `${baseURL}/room/${firstUserId}/${secondUserId}`,
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const createChatRoom = async (token, sourceUserName, destinationUserName) => {
  const header = await createHeader(token);

  try {
    const res = await axios.post(`${baseURL}/chats/createchatroom`, {sourceUserName, destinationUserName}, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getMessagesOfChatRoom = async (token,chatRoomId) => {
  const header = await createHeader(token);

  try {
    const res = await axios.get(`${baseURL}/chats/getAllMessagesForChatroom/${chatRoomId}`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const sendMessage = async (token,messageBody) => {
  const header = await createHeader(token);

  try {
    const res = await axios.post(`${baseURL}/chats/sendmessage`, messageBody, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
