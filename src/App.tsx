import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Amplify, { Auth } from "aws-amplify"
import LoginPage from "./pages/loginPage"
import IndexPage from "./pages/index"
import CadastroPage from "./pages/cadastroPage"
import AwsConfig from "./aws-exports"
import { connect } from "react-redux"
import { RootState } from "./store/rootReducer"
import PrivateRoute from "./components/PrivateRoute"
import store from "./store"
import { loginUser } from "./store/current-user"

// INITIALIZATION
Amplify.configure(AwsConfig)

Auth.currentUserInfo().then(info => {
  store.dispatch(loginUser(info))
})

const App: React.FC = () => {
  return <Router>
    <Switch>
      <Route path={`/login`}>
        <LoginPage />
      </Route>
      <Route path={`/cadastro`}>
        <CadastroPage />
      </Route>
      <PrivateRoute path={`/`}>
        <IndexPage />
      </PrivateRoute>
    </Switch>
  </Router>
}

export default App