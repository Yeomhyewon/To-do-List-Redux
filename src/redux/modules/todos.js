// import uuid from "react-uuid";
import shortid from "shortid";

const initialState = [
  {
    id: shortid.generate(),
    title: "test",
    body: "test",
    isDone: false,
  },
];

const ADD_TODO = "todos/ADD_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const SWITCH_TODO = "todos/SWITCH_TODO";

export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};
export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};
export const switchTodo = (payload) => {
  return {
    type: SWITCH_TODO,
    payload,
  };
};

// 리듀서
const todos = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];

    case DELETE_TODO:
      return action.payload;

    case SWITCH_TODO:
      return [...action.payload];

    default:
      return state;
  }
};

export default todos;
