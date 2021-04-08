import React from "react";
import "./Messages.css";

function Messages({ messages, user }) {
  return (
    <div>
      <div className="message__area">
        {messages.map((msg) =>
          user.name === msg.name ? (
            <div key={Math.random()} className="outgoing__message">
              <h4>{msg.name}</h4>
              <p>{msg.message}</p>
            </div>
          ) : (
            <div key={Math.random()} className="incoming__message">
              <h4>{msg.name}</h4>
              <p>{msg.message}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Messages;
