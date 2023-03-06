import Constants from "../Constants/Constants"

export const LoginAcction = () => {
  return {
    type: Constants.LOGIN,
  };
};

export const LogoutnAcction = () => {
  return {
    type: Constants.LOGOUT,
  };
};