import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  RouteProps,
} from "react-router-dom"

import { Auth } from "aws-amplify"
import LoginPage from "./pages/loginPage"
import IndexPage from "./pages/index"


const App: React.FC = () => {
  return <Router>
    <Switch>
      <Route path={`/login`}>
        <LoginPage />
      </Route>
      <PrivateRoute path={`/`} isLoggedIn={false/*todo: adicionar aqui estado de login*/}>
        <IndexPage />
      </PrivateRoute>
    </Switch>
  </Router>
}

interface PrivateRouteProps extends RouteProps {
  isLoggedIn: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}


export default App
