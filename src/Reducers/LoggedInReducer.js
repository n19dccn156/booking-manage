import Constants from "../Constants/Constants";

const LoggedInReducer = (state = '', action) => {
  switch (action.type) {
    case Constants.HOTEL:
      return Constants.HOTEL;
    case Constants.EMPLOYEE:
      return Constants.EMPLOYEE;
    case Constants.ADMIN:
      return Constants.ADMIN;
    case Constants.LOGOUT:
      return '';
    default:
      return state;
  }
}

export default LoggedInReducer;