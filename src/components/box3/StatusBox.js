import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../../apis/Api";
import { AppContext } from "../../context/appContext";
// import { useLogoutUserMutation } from "../../services/appApi";
import sfxNotif from "../../assets/sfxnotif.wav";

const ContainerStatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const InputStatusBox = styled.div`
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  position: absolute;
  z-index: 1;
  /* top: 0; */
  /* border-bottom: 1px solid #505050; */
`;
const InputField = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  color: #eee;
  padding: 0 20px;
  &:hover {
    color: #fff;
  }
`;
const ButtonInputField = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  color: #eee;
  padding: 0 20px;
`;

const MiddleBox = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 100%;
  height: 100%;
  position: absolute;
  /* padding: 10px 20px; */
`;
//
const ContainerFeed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const RowContainerFeed = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 100%;
  height: 100%;
  /* padding: 0 20px; */
  position: relative;
`;

const TitleFeed = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  padding: 10px 20px;
  color: white;
  z-index: 1;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  width: 100%;
  font-weight: bold;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainerFeed = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  /* padding: 0 20px; */
`;
const FontList = styled.i`
  cursor: pointer;
  display: none;
  @media (max-width: 600px) {
    display: unset;
  }
`;
const FontOnline = styled.i`
  display: none;
  @media (max-width: 900px) {
    display: unset;
  }
`;

const ListItemContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  padding: 50px 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 0;
`;

const ItemData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 1px solid #505050;
`;
const ContainerItemData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const PhotoItemData = styled.img`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid #505050;
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
`;
const TitleDownItemData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const DescItemData = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: flex-start; */
  width: 100%;
  word-wrap: break-word;
  /* background-color: aliceblue; */
  /* color: #909090; */
  padding: 10px;
  &:hover {
    color: white;
  }
`;
const NotifItemData = styled.span`
  background-color: #303030;
  font-size: 12px;
  padding: 0 10px;
  margin-right: 20px;
  border-radius: 10px;
  color: #eee;
`;

const StatusBox = () => {
  const { inputfeed, setInputFeed,setTargetBox3, notifCount,feeds, setFeeds,userFeeds } = useContext(AppContext);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    getFeeds();
  }, [userFeeds]);
  async function getFeeds() {
    await axios.get(api + "/feeds").then((result) => setFeeds(result.data));
  }

  async function handleSubmit() {
    if (inputfeed !== "") {
      await axios
        .post(api + "/feeds", {
          user_id: user._id,
          user_nama: user.name,
          user_content: inputfeed,
        })
        .then(() => {
          setInputFeed("");
          getFeeds();
        });
    }
  }

  return (
    <ContainerStatusBox>
      <MiddleBox>
        <ContainerFeed>
          <RowContainerFeed>
            <TitleFeed>
              <div>Cerita</div>
              <TitleContainerFeed>
                <FontOnline>
                  <i
                    onClick={() => setTargetBox3(1)}
                    className="fa-regular fa-user"
                  ></i>
                </FontOnline>
                <FontList onClick={() => setTargetBox3(2)}>
                  {notifCount > 0 ? (
                    <NotifItemData>Lihat pesan baru</NotifItemData>
                  ) : null}
                  <i className="fa-solid fa-list"></i>
                </FontList>
              </TitleContainerFeed>
            </TitleFeed>
            <ListItemContainer>
              {feeds.map((data, i) => (
                <ItemData key={i}>
                  <ContainerItemData>
                    <PhotoItemData
                      src={"https://robohash.org/" + data.user_id}
                    />
                    <ContainerTitleItemData>
                      <TitleTopItemData>{data.user_nama}</TitleTopItemData>
                      <TitleDownItemData>
                        {data.updatedAt.split("T").join(" ").split(".")[0]}
                      </TitleDownItemData>
                    </ContainerTitleItemData>
                  </ContainerItemData>
                  <DescItemData>{data.user_content}</DescItemData>
                </ItemData>
              ))}
            </ListItemContainer>
          </RowContainerFeed>
        </ContainerFeed>
      </MiddleBox>
      <InputStatusBox style={{ bottom: "0" }}>
        <InputField
          style={{ width: "100%" }}
          type={"text"}
          placeholder={`Apa yang anda pikirkan ?`}
          onChange={(e) => setInputFeed(e.target.value)}
          value={inputfeed}
        />
        <ButtonInputField
          onClick={handleSubmit}
          style={{ width: "60px" }}
          type={"button"}
        >
          <i className="fa-solid fa-paper-plane"></i>
        </ButtonInputField>
      </InputStatusBox>
    </ContainerStatusBox>
  );
};

export default StatusBox;
