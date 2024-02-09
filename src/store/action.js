export const SET_USER = "SET_USER";
export const UPDATE_REQUESTS_SENT = "UPDATE_REQUESTS_SENT";
export const SET_SOCKET = "SET_SOCKET";
export const SET_NOTIFICATION = "SET_NOTIFICATION";

export const set_User = (user) => ({
  type: SET_USER,
  payload: user,
});

export const updateRequests = (requestsSent) => ({
  type: UPDATE_REQUESTS_SENT,
  payload: requestsSent,
});

export const setSocket = (socket) => ({
  type: SET_SOCKET,
  payload: socket,
});

export const setNotification = (notification) => ({
  type: SET_NOTIFICATION,
  payload: notification,
});