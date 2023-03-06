import { Navigate } from 'react-router-dom';

const RedirectNotFound = () => {

	return (<Navigate to='/404'/>);
}
export default RedirectNotFound;