import {
  SET_NOTIFICATION,
  SET_SOCKET,
  SET_USER,
  UPDATE_REQUESTS_SENT,
} from "./action";

const globalState = {
  user: null,
  socket: null,
  notification: false,
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
  }
  return state;
};
