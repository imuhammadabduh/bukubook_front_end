import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";
import Auth from "./pages/Auth";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const [openChat, setOpenChat] = useState(false);
  const [userId, setUserId] = useState("");
  const [targetBox3, setTargetBox3] = useState(0);
  const [notifCount, setNotifCount] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [userFeeds, setUserFeeds] = useState([]);
  const [inputfeed, setInputFeed] = useState("");

  const user = useSelector((state) => state.user);
  return (
    <AppContext.Provider
      value={{
        inputfeed,
        setInputFeed,
        userFeeds,
        setUserFeeds,
        feeds,
        setFeeds,
        notifCount,
        setNotifCount,
        targetBox3,
        setTargetBox3,
        userId,
        setUserId,
        openChat,
        setOpenChat,
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        rooms,
        setRooms,
        newMessages,
        setNewMessages,
      }}
    >
      <BrowserRouter>
        <Routes>
          {!user && (
            <>
              <Route path="/" element={<Auth />} />
            </>
          )}
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
