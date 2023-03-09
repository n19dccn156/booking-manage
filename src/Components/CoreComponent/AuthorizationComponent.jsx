// import { useEffect } from "react";
// import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizationComponent = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  const token = localStorage.getItem("authorization")
  // const allowAccess = useState(false);
  // phai luu trang thai login trong
  useEffect(() => {
    if(token !== "" || token !== undefined) {
      // axios({
      //   method: "POST",
      //   url: "",
      //   headers: {'Authorization': token}
      // })
      // .then((res) => {

      // })
      // .catch((err) => {

      // })
    }
    console.log("Chua login")
  }, [loggedIn])
  console.log(localStorage.getItem('authorization'))


  return loggedIn ? <Outlet/> : <Navigate to='/login'/>
}

export default AuthorizationComponent;