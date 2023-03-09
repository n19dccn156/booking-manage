// import { useEffect } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizationComponent = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  // phai luu trang thai login trong
  useEffect(() => {
    console.log('Authentication', new Date())
  })
  console.log(localStorage.getItem('authorization'))


  return loggedIn ? <Outlet/> : <Navigate to='/login'/>
}

export default AuthorizationComponent;