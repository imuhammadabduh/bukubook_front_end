import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../context/appContext";
import {
  useLoginUserMutation,
  useSignupUserMutation,
} from "../services/appApi";
import logoBB from "../assets/bb.svg";

export const Container = styled.div`
  background-color: #101010;
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  min-height: 400px;
  @media (max-width: 700px) {
  }
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
  @media (max-width: 700px) {
    left: -100%;

    width: 100%;
  }
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const Form = styled.div`
  background-color: #101010;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  color: white;
  padding-bottom: 10px;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #000;
  border-radius: 10px;
  color: white;
  border: 1px solid #aaa;
  outline: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 10px;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #fff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  color: #fff;
  margin: 15px 0;
`;
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
  @media (max-width: 700px) {
    display: none;
  }
`;

export const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
export const ContainerLogoBBMobile = styled.img`
  margin-bottom: 20px;
  display: none;
  @media (max-width: 700px) {
    display: unset;
  }
`;
export const ContainerLogoBB = styled.img`
  margin-bottom: 20px;
`;

function Auth() {
  const [signIn, toggle] = React.useState(true);

  const [email, setLoginEmail] = React.useState("");
  const [password, setloginPassword] = React.useState("");

  const [signupNama, setSignupNama] = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");

  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  async function buttonSignIn() {
    loginUser({ email, password }).then(({ data }) => {
      console.log("data", data);
      if (data) {
        socket.emit("new-user");
        navigate("/");
      }
    });
  }

  //signup
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [signupUser, infoData] = useSignupUserMutation();
  console.log(infoData.error);
  async function buttonSignUp() {
    const dataLogin = {
      name: signupNama,
      email: signupEmail,
      password: signupPassword,
    };
    signupUser(dataLogin).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate("/");
      }
    });
  }
  return (
    <Container>
      <SignUpContainer signinIn={signIn}>
        <Form>
          <ContainerLogoBBMobile alt="bb" src={logoBB} />
          <Title>Daftar</Title>
          {infoData.error && (
            <pre>
              <b>
                {infoData.error.data
                  .split("User validation failed:")[1]
                  .split(",")
                  .join("\n")}
              </b>
            </pre>
          )}
          <Input
            onChange={(e) => setSignupNama(e.target.value)}
            type="text"
            placeholder="Nama"
          />
          <Input
            onChange={(e) => setSignupEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setSignupPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button onClick={buttonSignUp} style={{ marginTop: "10px" }}>
            {infoData.isLoading ? "Loading" : "Sign Up"}
          </Button>
          <GhostButton
            style={{ marginTop: "10px" }}
            onClick={() => toggle(true)}
          >
            Sign In
          </GhostButton>
        </Form>
      </SignUpContainer>

      <SignInContainer signinIn={signIn}>
        <Form>
          <ContainerLogoBBMobile alt="bb" src={logoBB} />
          <Title>Masuk</Title>
          {error && (
            <pre>
              <b>{error.data}</b>
            </pre>
          )}
          <Input
            onChange={(e) => setLoginEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setloginPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button onClick={buttonSignIn}>
            {isLoading ? "Loading" : "Sign In"}
          </Button>
          <GhostButton
            style={{ marginTop: "10px" }}
            onClick={() => toggle(false)}
          >
            Sign Up
          </GhostButton>
          <br />
          <br />
          <br />
          <span>MERN Stack Production</span>
        </Form>
      </SignInContainer>
      <OverlayContainer signinIn={signIn}>
        <Overlay signinIn={signIn}>
          <LeftOverlayPanel signinIn={signIn}>
            <ContainerLogoBB alt="bb" src={logoBB} />
            <Title>Selamat datang kembali!</Title>
            <Paragraph>
              Untuk tetap terhubung dengan kami, silakan login dengan info
              pribadi Anda
            </Paragraph>
            <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
          </LeftOverlayPanel>
          <RightOverlayPanel signinIn={signIn}>
            <ContainerLogoBB alt="bb" src={logoBB} />
            <Title>Hai, BukuBooker's!</Title>
            <Paragraph>
              Masukkan detail pribadi Anda dan mulailah perjalanan bersama kami.
            </Paragraph>
            <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
}

export default Auth;
