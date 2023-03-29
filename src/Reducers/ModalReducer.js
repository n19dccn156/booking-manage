import Constants from "../Constants/Constants";

const OpenModalReducer = (state = false, action) => {
  switch (action.type) {
    case Constants.OPEN_MODAL:
      return true;
    case Constants.CLOSE_MODAL:
      return false;
    default:
      return state;
  }
}

export default OpenModalReducer;