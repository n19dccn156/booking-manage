
import '../index.css';
import { useDispatch } from 'react-redux';
import { LogoutAction } from "../Actions/LoginAction";
import { Navigate } from 'react-router-dom';
// import { Navigate } from "react-router-dom";

const LogoutPage = () => {
	const dispatch = useDispatch();

  localStorage.removeItem('userId')
  localStorage.removeItem('authorization')
  localStorage.removeItem('roleId')
  dispatch(LogoutAction())
	
	return <Navigate to='/login'/>
}

export default LogoutPage;