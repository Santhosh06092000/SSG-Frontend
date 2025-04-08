import { FunctionComponent, ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = (props) => {
  const { children } = props;

  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/welcome" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
