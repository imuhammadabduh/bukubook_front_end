import React, { useContext } from "react";
import styled from "styled-components";
import StatusBox from "../components/box3/StatusBox";
import OptionChat from "../components/box4/OptionChat";
import ChatBox from "../components/box3/ChatBox";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import ProfileBox from "../components/box4/ProfileBox";

const ContainerChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #101010;
  height: 100vh;
  padding-left: 55px;
  position: relative;
  @media (max-width: 1200px) {
    padding-left: 0;
  }
`;

const Box1ContainerChat = styled.div`
  rotate: -180deg;
  font-size: 20px;
  letter-spacing: 10px;
  font-weight: bolder;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  background-color: #202020;
  writing-mode: vertical-rl;
  height: 100%;
  transition-duration: 500ms;
  &:hover {
    color: white;
  }
  @media (max-width: 1200px) {
    display: none;
  }
`;
const Box2ContainerChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 900px) {
    display: none;
  }
`;

const Box3ContainerChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150%;
  border-left: 1px solid #505050;
  border-right: 1px solid #505050;
  height: 100%;
  @media (max-width: 900px) {
    border-left:none;
  }
  @media (max-width: 600px) {
    border-right:none;
  }
`;
const Box4ContainerChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 600px) {
    display: none;
  }

`;

function Chat() {
  const user = useSelector((state) => state.user);
  const { openChat, targetBox3 } = useContext(AppContext);
  let box3;
  if (0 === targetBox3) {
    box3 = <StatusBox />;
  } else if (1 === targetBox3) {
    box3 = <ProfileBox />;
  } else if (2 === targetBox3) {
    box3 = <OptionChat />;
  } else {
    box3 = <StatusBox />;
  }
  return (
    <ContainerChat>
      <Box1ContainerChat>{user.name}</Box1ContainerChat>
      <Box2ContainerChat>
        <ProfileBox />
      </Box2ContainerChat>
      <Box3ContainerChat>{openChat ? <ChatBox /> : box3}</Box3ContainerChat>
      <Box4ContainerChat>
        <OptionChat />
      </Box4ContainerChat>
    </ContainerChat>
  );
}

export default Chat;
