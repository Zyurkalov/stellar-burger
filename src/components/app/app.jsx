import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header/header";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getApiData } from "../../service/actions/app";
import appStyles from "./app.module.css";
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { NotFound404, Home, Profile, Feed, Login, Register, ResetPassword, ForgotPassword } from "../../page";


function App() {
  const { modalOrderStatus, modalIngrStatus, modalErrorStatus, errorMessage, modalLoadingStatus, loadingMessage } = useSelector(
    (state) => state.modal
  );
  const { userAuthStatus, userData, loading } = useSelector(
    (state) => state.userStatus
  );
  const {data} = useSelector((state) => state.dataList)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { ingredient } = location.state || {}
  const background = location.state && location.state.background;

  const handleModalClose = ()  => {navigate(-1)}

  useEffect(() => {
    dispatch(getApiData());
    if(!localStorage.accessToken) {navigate('login')}
  }, []);


  const stateModal = () => {
    if (modalIngrStatus || modalOrderStatus) return true;
  };
  const homeState = {
    stateModal: stateModal(),
    modalOrderStatus,
    modalIngrStatus,
    userAuthStatus, 
    modalErrorStatus,
  };
  const loadingState = {
    modalErrorStatus,
    modalLoadingStatus,
    errorMessage,
    loadingMessage,
  }
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Header state={loadingState} className={appStyles.header} />}>
          <Route index element={<ProtectedRoute element={<Home state={homeState}/>}/>} />
          <Route path="feed" element={<ProtectedRoute element={<Feed />}/>} />
          <Route path="profile" element={<ProtectedRoute element={<Profile />}/>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login state={userAuthStatus}/>} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path='/ingredients/:ingredientId' element={<IngredientDetails />}/>
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
	        <Route
	          path='/ingredients/:ingredientId'
	          element={
	            <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
	              <IngredientDetails item={ingredient}/>
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </>
  );
}

export default App;
