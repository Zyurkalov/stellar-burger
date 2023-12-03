import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header/header";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getIngredients } from "../../service/actions/app";
import appStyles from "./app.module.css";
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { NotFound404, Home, Profile, Feed, Login, Register, ResetPassword, ForgotPassword } from "../../page";
import { checkUserAuth, getUser } from "../../service/actions/user-auth";
import OrderDetails from "../modal/order-details/order-details";

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const {
    modal: {
      modalOrderStatus,
      modalIngrStatus,
      modalErrorStatus,
      errorMessage,
      modalLoadingStatus,
      loadingMessage,
    },
    dataList: { data },
    user: {
      userData,
      loading,
      isLoggedIn,
    }
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
    // let name = "my name";
    // let value = "John Smith"

    // // кодирует в my%20name=John%20Smith
    // document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    // console.log( document.cookie );
  }, []);

  return (
    <>
    {/* {console.log(data)} */}
      <Routes location={background || location}>
        <Route path="/" element={<Header state={loadingState} className={appStyles.header} />}>
          <Route index element={<Home state={homeState}/>} anonymous={true} />
          <Route path="feed" element={<ProtectedRoute element={<Feed />}/>}/>
          <Route path="profile" element={<ProtectedRoute element={<Profile />}/>} />
          {/* <Route path='ingredients/:ingredientId' element={<ProtectedRoute element={<IngredientDetails />}/>}/> */}
          <Route path='ingredients/:ingredientId' element={<IngredientDetails />}/>
          {/* <Route path='orders' element={<ProtectedRoute element={<OrderDetails />}/>}/> */}

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
