import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import io from "socket.io-client";
import queryString from "query-string";
import Messages from "./Messages";
import "./RealChat.css";

let socket;

function RealChat({ location }) {
  const [writeMessage, setWriteMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const apiEndPoint = "https://chitchat-react.herokuapp.com/";

  let user = {
    name: name,
    message: writeMessage,
  };

  //Backend Connection
  useEffect(() => {
    // Take Connection from Server.
    socket = io(apiEndPoint);
  }, [apiEndPoint]);

  // For Joining and get name from url
  useEffect(() => {
    const { name } = queryString.parse(location.search);
    setName(name);
    // send joiner name to server
    socket.emit("joinedUsers", name);
    //Receive joiner name from server back to client.
    socket.on("joinedUsers", (userName) => {
      if (users.length > 1) {
        const newUsers = users.filter((user) => user !== userName);
        setUsers([...newUsers, userName]);
      } else {
        users.push(userName);
      }
      // users.push();
    });

    return () => {
      socket.emit("disconnectUser");

      socket.off();
    };
  }, [apiEndPoint, location.search]);

  useEffect(() => {
    //Receive user object back from server.
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages, writeMessage]);

  const handleChange = (event) => {
    setWriteMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.message.length === 0) return;

    user.message = writeMessage;

    // Send user object to Server
    socket.emit("message", user);
    setMessages([...messages, user]);

    setWriteMessage("");
  };

  return (
    <div className="app">
      <div className="active__users">
        <h3>Chat Members</h3>
        {users.map((user) => (
          <div key={Math.random()}>
            {user.length > 0 ? <h5>{user} has joined.</h5> : ""}
          </div>
        ))}
      </div>
      <div className="main__page">
        <div className="logo">
          <img height="50" src={logo} alt="" />
          <h3>ChitChat</h3>
        </div>

        <Messages messages={messages} user={user} />

        <div className="input__message">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              autoFocus={true}
              onChange={handleChange}
              value={writeMessage}
              placeholder="Send a message..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RealChat;
