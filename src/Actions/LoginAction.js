import Constants from "../Constants/Constants"

export const LoginAcction = () => {
  return {
    type: Constants.LOGIN,
  };
};

export const LogoutAcction = () => {
  return {
    type: Constants.LOGOUT,
  };
};