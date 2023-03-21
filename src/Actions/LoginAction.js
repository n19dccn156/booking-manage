import Constants from "../Constants/Constants"

export const HotelAction = () => {
  return {
    type: Constants.HOTEL,
  };
};

export const EmployeeAction = () => {
  return {
    type: Constants.EMPLOYEE,
  };
};

export const AdminAction = () => {
  return {
    type: Constants.ADMIN,
  };
};

export const LogoutAction = () => {
  return {
    type: Constants.LOGOUT,
  };
};