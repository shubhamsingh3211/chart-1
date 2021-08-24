import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

const ProtectedRoute = ({
  path,
  component,
  ...props
}: {
  path?: string;
  component?:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, any, unknown>>
    | undefined;
}) => {
  if (!localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }
  return <Route path={path} exact component={component} {...props} />;
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <ProtectedRoute path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
