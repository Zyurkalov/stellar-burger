import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header/header";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getApiData } from "../../service/actions/app";
import appStyles from "./app.module.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { NotFound404, Home, Profile, Feed, Login, Register, ResetPassword, ForgotPassword} from "../../page";


function App() {
  const { modalOrderStatus, modalIngrStatus } = useSelector(
    (state) => state.modal
  );
  const { userAuthStatus } = useSelector(
    (state) => state.userStatus
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiData());
  }, []);

  useEffect(() => {
    !userAuthStatus ? navigate('login') : navigate('/')
  }, [])

  const stateModal = () => {
    if (modalIngrStatus || modalOrderStatus) return true;
  };
  const homeState = {
    stateModal: stateModal(),
    modalOrderStatus,
    modalIngrStatus,
    userAuthStatus, 
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Header state={userAuthStatus} className={appStyles.header} />}>
          <Route index element={<ProtectedRoute element={<Home state={homeState}/>}/>} />
          <Route path="feed" element={<ProtectedRoute element={<Feed />}/>} />
          <Route path="profile" element={<ProtectedRoute element={<Profile />}/>} />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login state={userAuthStatus}/>} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
