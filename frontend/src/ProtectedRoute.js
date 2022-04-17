import {useNavigate} from "react-router-dom";
import {useAuth} from "./auth";
import React, {useEffect} from "react";

const ProtectedRoute = ({element}) => {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    navigate("/login");
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        Unauthorized!
      </>
    );
  }
  return (
    <>
      {element}
    </>
  );
}

export default ProtectedRoute;