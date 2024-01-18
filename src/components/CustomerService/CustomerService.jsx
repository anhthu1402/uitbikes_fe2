import { CloseRounded, SendRounded, TaskAltRounded } from "@mui/icons-material";
import { Fab, Paper, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./CustomerService.css";
import { useSelector } from "react-redux";
import axios from "axios";

function CustomerService({ setChatBox }) {
  const [chatData, setChatData] = useState([]);
  const [chatId, setChatId] = useState(null);
  const { isAuthed, user } = useSelector((state) => state.auth);
  const chatRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const ref = useRef();
  useEffect(() => {
    if (isAuthed && user) {
      axios
        .get("http://localhost:9090/api/conversations/" + user.username)
        .then((res) => {
          if (res.data.id !== undefined) {
            setChatData(res.data.messages);
            setChatId(res.data.id);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [chatData, user.username, chatId, isAuthed, user]);
  const sendMessage = () => {
    const text = chatRef.current.value;
    const message = {
      chatId: chatId,
      senderId: user.username,
      text: text,
    };
    axios
      .post("http://localhost:9090/api/messages", message)
      .then((res) => {
        chatRef.current.value = "";
        setDisabled(true);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (chatData.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatData.length]);
  return (
    <Paper className="chatDiv">
      <div className="chatHeader">
        <span>Hỗ trợ khách hàng</span>
        <div className="closeBtn" onClick={() => setChatBox(false)}>
          <CloseRounded />
        </div>
      </div>
      <div className="chatBody">
        <div className="chatContent">
          {chatData &&
            chatData.map((message, index) => (
              <div>
                {message.senderId === user.username ? (
                  <div className="userChat" key={index}>
                    <div className="userChatContent">
                      <span>{message.text}</span>
                    </div>
                    <div className="sendingIcon">
                      {/* <PanoramaFishEyeRounded /> */}
                      <TaskAltRounded />
                    </div>
                  </div>
                ) : (
                  <div className="adminChat" key={index}>
                    <div className="adminChatContent">
                      <span>{message.text}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          <div ref={ref}></div>
        </div>
        <div className="chatBox">
          <TextField
            size="small"
            inputRef={chatRef}
            onChange={(e) => {
              if (e.target.value !== "") {
                setDisabled(false);
              } else {
                setDisabled(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          ></TextField>
          <div className="sendBtn">
            <Fab
              size="medium"
              onClick={() => sendMessage()}
              disabled={disabled}
            >
              <SendRounded sx={{ color: "#77c9c9" }} fontSize="medium" />
            </Fab>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default CustomerService;
