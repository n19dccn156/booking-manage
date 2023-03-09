import Constants from "../Constants/Constants";

const RoleReducer = (state='', action) => {
  switch (action.type) {
    case Constants.SET_ROLE:
      return action.payload;
    case Constants.REMOVE_ROLE:
      return '';
    default:
      return state;
  }
}

export default RoleReducer;