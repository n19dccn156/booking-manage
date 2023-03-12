
import '../index.css';
import { useDispatch } from 'react-redux';
import { LogoutAcction } from "../Actions/LoginAction";
import { Navigate } from 'react-router-dom';
// import { Navigate } from "react-router-dom";

const LogoutPage = () => {
	const dispatch = useDispatch();

  localStorage.removeItem('userId')
  localStorage.removeItem('authorization')
  localStorage.removeItem('roleId')
  dispatch(LogoutAcction())
	
	return <Navigate to='/login'/>
}

export default LogoutPage;