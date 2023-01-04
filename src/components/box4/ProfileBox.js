import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import api from "../../apis/Api";
import { AppContext } from "../../context/appContext";
import { useLogoutUserMutation } from "../../services/appApi";

const ContainerOptionChat = styled.div`
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
  /* padding: 0 20px; */
  position: relative;
`;

const TitleOptionChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  font-weight: bold;
  top: 0;
  left: 0;
  padding: 10px 20px;
  position: absolute;
  width: 100%;
  /* @media (max-width: 1000px) {
    padding: 10px 0;
    text-align: center;
  } */
`;

const ProfileBoxContainer = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  padding-top: 50px;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  /* position: absolute; */
`;

const ProfileBoxRow = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  padding: 0 20px;
  /* height: 100%;
  width: 100%; */
`;
const ProfilePhoto = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  border: 3px solid #707070;
  &:hover {
    border-color: white;
  }
`;
const ProfileTitle = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* ${() => `width:  calc(100% - 100px);`} */
  /* word-wrap:break-word; */
  word-break: break-all;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  &:hover {
    color: white;
  }
`;

//

const ListItemContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* padding: 0 20px; */
  /* padding-top: 50px; */
  /* width: 100%; */
  /* height: 100%; */
  /* position: absolute;
  top: 0; */
  width: 100%;
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
  /* gap: 10px; */
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
  position: relative;
  width: 100%;
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
  width: 100%;
  word-wrap: break-word;

  padding: 10px 0;
  &:hover {
    color: white;
  }
`;

const ContainerTitleUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0;
`;

const ContainerDeleteIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
const RowContainerIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const RowIcon = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: unset;
  }
`;

const ProfileBox = () => {
  const { userId, setTargetBox3, setUserId,feeds,userFeeds, setUserFeeds } = useContext(AppContext);
  const user = useSelector((state) => state.user);
  const [userProfile, setUserProfie] = useState({});
  useEffect(() => {
    getFeeds();
    getDetileUser(userId);
  }, [userId,]);
  async function getFeeds() {
    await axios
      .get(`${api}/feeds/${userId === "" ? user._id : userId}`)
      .then((result) => setUserFeeds(result.data));
  }
  async function getDetileUser(id) {
    await axios
      .get(api + "/users/" + id)
      .then((result) => setUserProfie(result.data));
  }
  async function deleteFeed(id) {
    await axios.delete(api + "/feeds/" + id).then(() => {
      alert("Cerita telah terhapus");
      getFeeds();
    });
  }
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e) {
    // e.preventDefault();
    if (window.confirm("Apakah anda ingin keluar?")) {
      await logoutUser(user);
    }
    window.location.replace("/");
  }

  return (
    <ContainerOptionChat>
      {/* <Sidebar/> */}
      <RowContainer>
        <TitleOptionChat>
          Profile
          <RowContainerIcon>
            <i
              onClick={handleLogout}
              className="fa-solid fa-right-from-bracket"
            ></i>
            <RowIcon>
              <i
                onClick={() => {
                  setTargetBox3(0);
                  setUserId("");
                }}
                className="fa-solid fa-circle-chevron-left"
              ></i>
            </RowIcon>
          </RowContainerIcon>
        </TitleOptionChat>
        <ProfileBoxContainer>
          <ProfileBoxRow>
            <ProfilePhoto
              src={`https://robohash.org/${userId === "" ? user._id : userId}`}
            />
            <ContainerTitleUser>
              <ProfileTitle style={{ fontWeight: "bold" }}>
                {userId === "" ? user.name : userProfile.name}
              </ProfileTitle>
              <ProfileTitle>
                {userId === "" ? user.email : userProfile.email}
              </ProfileTitle>
            </ContainerTitleUser>
            <ListItemContainer>
              {userFeeds.map((data, i) => (
                <ItemData key={i}>
                  <ContainerItemData>
                    <ContainerTitleItemData>
                      <TitleTopItemData>
                        {data.user_nama}
                        {user._id === data.user_id ? (
                          <ContainerDeleteIcon>
                            <i
                              onClick={() =>
                                window.confirm("Apakah anda ingin menghapus?")
                                  ? deleteFeed(data._id)
                                  : null
                              }
                              className="fa-solid fa-trash"
                            ></i>
                          </ContainerDeleteIcon>
                        ) : null}
                      </TitleTopItemData>
                      <TitleDownItemData>
                        {data.updatedAt.split("T").join(" ").split(".")[0]}
                      </TitleDownItemData>
                    </ContainerTitleItemData>
                  </ContainerItemData>
                  <DescItemData>{data.user_content}</DescItemData>
                </ItemData>
              ))}
            </ListItemContainer>
          </ProfileBoxRow>
        </ProfileBoxContainer>
      </RowContainer>
    </ContainerOptionChat>
  );
};

export default ProfileBox;
