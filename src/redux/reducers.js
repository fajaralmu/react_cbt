import * as examReducer from "./examReducer"
import * as userReducer from "./userReducer"
import { combineReducers } from "redux";

export const rootReducer = combineReducers(
    {
        userState : userReducer.reducer,
        examsState : examReducer.reducer
    }
);

export const initialState = {
    userState : userReducer.initState,
    examsState : examReducer.initState
}

export default rootReducer;