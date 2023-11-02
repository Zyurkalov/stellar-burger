import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header/header";
import Constructor from "../constructor/constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";
import { getApiData } from "../../service/actions/app";
import appStyles from "./app.module.css";
import { Routes, Route } from 'react-router-dom';
import { NotFound404, Home, Profile, Feed, Login, Register, ResetPassword, ForgotPassword} from "../../page";


function App() {
  const { modalOrderStatus, modalIngrStatus } = useSelector(
    (state) => state.modal
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApiData());
  }, []);

  const stateModal = () => {
    if (modalIngrStatus || modalOrderStatus) return true;
  };
  const homeState = {
    stateModal: stateModal(),
    modalOrderStatus,
    modalIngrStatus,
  };
  return (
    <>
      <Routes>
      {/* <Header className={appStyles.header} /> */}
        <Route path="/" element={<Header className={appStyles.header} />}>
          <Route index element={<Home state={homeState}/>} />
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
