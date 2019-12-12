import { combineReducers } from "redux"
import currentUserReducer from "./current-user"

const rootReducer = combineReducers({
  currentUser: currentUserReducer, // todo: Add store and root reducer with reducer HMR https://github.com/reduxjs/rtk-github-issues-example/commit/262fbe422c517388de26e6a53c1586b171c5b061
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer