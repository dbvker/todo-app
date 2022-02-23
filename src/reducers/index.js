import { combineReducers } from "redux";
import headerReducer from './header/headerReducer';
import todoListReducer from './todoList/todoListReducer';
import newListReducer from "./newList/newListReducer";

export default combineReducers({
    header: headerReducer,
    todoList: todoListReducer,
    newList: newListReducer,
});