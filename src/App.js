import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import RealChat from "./Components/RealChat";
import LoginForm from "./Components/LoginForm";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/chat" component={RealChat} />
        <Route path="/notfound" component={NotFound} />
        <Redirect to="NotFound" />
      </Switch>
    </div>
  );
}

export default App;
