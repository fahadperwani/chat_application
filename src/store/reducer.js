import { SET_USER } from "./action";

const globalState = {
  user: null,
};

export const reducer = (state = globalState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
  }
};
