import Constants from "../../Constants/Constants";

const ReloadConfirmReducer = (state=false, action) => {
  switch (action.type) {
    case Constants.RELOAD:
      return action.payload;
    default:
      return state;
  }
}

export default ReloadConfirmReducer;