import axios from "axios";
import Constants from "../Constants/Constants";
import { useNavigate } from "react-router-dom";

const Authenticate = (token) => {
	const navigate = useNavigate();

	axios({
		url: Constants.host+'/api/v1/authentication/manager', 
		method: 'POST', 
		headers: { 'Authorization': token }
	})
	.then((res) => {

	})
	.catch((err) => {
		navigate('/login')
	})
}

export default Authenticate;