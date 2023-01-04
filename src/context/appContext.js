import { io } from "socket.io-client";
import React from "react";
import api from "../apis/Api";
// const SOCKET_URL = "http://localhost:5001";
export const socket = io(api);
// app context
export const AppContext = React.createContext();
