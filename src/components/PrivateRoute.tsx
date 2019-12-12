import { Redirect, Route, RouteProps } from "react-router"
import React from "react"
import { connect } from "react-redux"
import { RootState } from "../store/rootReducer"

interface PrivateRouteProps extends RouteProps {
  currentUser: { status: string }
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, currentUser, ...rest }) => {
  console.log(currentUser)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser.status === "logged-in" ? (
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

export default connect((state: RootState) => {
    return ({
      currentUser: state.currentUser,
    })
  })(PrivateRoute)
