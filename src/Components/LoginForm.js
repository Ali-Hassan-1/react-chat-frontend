import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [name, setName] = useState("");
  return (
    <div className="main__body">
      <div className="form__body">
        <h2>Join</h2>
        <hr className="line" />

        <div className="login__form">
          <input
            type="text"
            autoFocus
            placeholder="Enter your nickname..."
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <Link to={`/chat?name=${name}`}>
          <button
            disabled={name.length === 0 ? "disabled" : null}
            className="submit__btn"
            type="submit"
          >
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
