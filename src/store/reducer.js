import {
  ADD_CHAT,
  SET_CHATS,
  SET_NOTIFICATION,
  SET_SOCKET,
  SET_USER,
  UPDATE_REQUESTS_SENT,
} from "./action";

const globalState = {
  user: null,
  socket: null,
  notification: false,
  chats: [],
};

export const reducer = (state = globalState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log("Called");
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_REQUESTS_SENT:
      return {
        ...state,
        user: { ...state.user, requestsSent: action.payload },
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case SET_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case ADD_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    default:
      return state;
  }
};
