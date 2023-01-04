import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import api from "../../apis/Api";
import { AppContext } from "../../context/appContext";
import { addNotifications, resetNotifications } from "../../features/userSlice";

const ContainerNotifStream = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const RowContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 100%;
  height: 100%;
  position: relative;
`;
const ListItemContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  padding: 0 20px;
  padding-top: 50px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 0;
  @media (max-width: 800px) {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    padding: 0;
    padding-top: 50px;
  }
`;
const TitleNotifStream = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  font-weight: bold;
  top: 0;
  left: 0;
  padding: 10px 20px;
  position: absolute;
  width: 100%;
  z-index: 1;

  @media (max-width: 800px) {
    padding: 10px 0;
    text-align: center;
  }
`;
//
const ItemData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  position: relative;
  &:hover {
    background-color: #202020;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
  }
  @media (max-width: 800px) {
    gap: 0;
  }
`;
const OnlineInfo = styled.div`
  padding: 5px;
  background-color: aliceblue;
  border-radius: 10px;
  position: absolute;
  top: 3px;
  left: 0;
`;

const PhotoItemData = styled.img`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  border: 1px solid #505050;
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;
const ContainerTitleItemData = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
const TitleTopItemData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (max-width: 800px) {
    display: none;
  }
`;
const TitleDownItemData = styled.div`
  max-width: 18vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (max-width: 800px) {
    display: none;
  }
`;

const NotifStream = () => {
  // start

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    setPrivateMemberMsg,
    currentRoom,
    setOpenChat,
  } = useContext(AppContext);

  function joinRoom(room, isPublic = true) {
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notifications
    dispatch(resetNotifications(room));
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }

  if (!user) {
    return <></>;
  }

  // end

  return (
    <ContainerNotifStream>
      {/* <Sidebar/> */}
      <RowContainer>
        <TitleNotifStream>Online</TitleNotifStream>
        <ListItemContainer>
          {members.map((member) => (
            <ItemData
              key={member.id}
              style={{ cursor: "pointer" }}
              active={privateMemberMsg?._id === member?._id}
              onClick={() => {
                handlePrivateMemberMsg(member);
                setOpenChat(true);
              }}
              // disabled={member._id === user._id}
            >
              <OnlineInfo
                style={{
                  backgroundColor:
                    member.status === "online" ? "green" : "gray",
                }}
              ></OnlineInfo>

              <PhotoItemData src={"https://robohash.org/" + member._id} />
              {/* <img src={member.picture} className="member-status-img" /> */}
              <ContainerTitleItemData>
                <TitleTopItemData>
                  {member.name}
                  {member._id === user?._id && " (Saya)"}
                  <span className="badge rounded-pill bg-primary">
                    {user.newMessages[orderIds(member._id, user._id)]}
                  </span>
                </TitleTopItemData>

                <TitleDownItemData>{member.email}</TitleDownItemData>
              </ContainerTitleItemData>
            </ItemData>
          ))}
        </ListItemContainer>
      </RowContainer>
    </ContainerNotifStream>
  );
};

export default NotifStream;
