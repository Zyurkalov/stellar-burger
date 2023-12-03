import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation} from 'react-router-dom';

import Header from "../header/header";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getIngredients } from "../../service/actions/app";
import { NotFound404, Home, Profile, Feed, Login, Register, ResetPassword, ForgotPassword } from "../../page";
import { checkUserAuth } from "../../service/actions/user-auth";

import appStyles from "./app.module.css";

function App() {
  const dispatch = useDispatch();

  const {
    modal: {
      modalOrderStatus,
      modalIngrStatus,
      modalErrorStatus,
      errorMessage,
      modalLoadingStatus,
      loadingMessage,
    },
    // dataList: { data },

  } = useSelector((state) => state);

  const homeState = {
    modalOrderStatus,
    modalIngrStatus,
    modalErrorStatus,
  };
  const loadingState = {
    modalErrorStatus,
    modalLoadingStatus,
    errorMessage,
    loadingMessage,
  };

  const location = useLocation();
  const { ingredient } = location.state || {};
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth())
  }, []);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Header state={loadingState} className={appStyles.header} />}>
          <Route index element={<Home state={homeState}/>} anonymous={true} />
          <Route path="feed" element={<ProtectedRoute element={<Feed />}/>}/>
          <Route path="profile" element={<ProtectedRoute element={<Profile />}/>} />
          <Route path='ingredients/:ingredientId' element={<IngredientDetails />}/>

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword/>}/>
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
	        <Route
	          path='ingredients/:ingredientId'
	          element={
	            <Modal title={'Детали ингредиента'} from={"/"}>
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
