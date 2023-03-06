import Constants from "../Constants/Constants";

const LoggedInReducer = (state=false, action) => {
  switch (action.type) {
    case Constants.LOGIN:
      return true;
    case Constants.LOGOUT:
      return false;
    default:
      return state;
  }
}

export default LoggedInReducer;