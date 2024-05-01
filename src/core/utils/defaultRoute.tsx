import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "core/hooks/reduxHooks";

const DefaultRoute = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);

  if (localStorage.getItem("userInfo") !== null && basicUserInfo?.group === "CLIENT") {
    return <Navigate replace to={"/aulas"} />;
  }
  else if (localStorage.getItem("userInfo") !== null) {
    return <Navigate replace to={"/dashboard"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default DefaultRoute;
