import { SET_SOCKET, SET_USER, UPDATE_REQUESTS_SENT } from "./action";

const globalState = {
  user: null,
  socket: null,
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
  }
  return state;
};
