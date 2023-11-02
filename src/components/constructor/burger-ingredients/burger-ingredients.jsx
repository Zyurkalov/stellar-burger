import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { switchTab } from "../../../service/actions/burger-ingredients";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCart from "./burger-cart/burger-cart";
import style from "./burger-ingredients.module.css";

// import PropTypes from "prop-types";
// import { ingredientPropType } from "../../../utils/prop-types";
// import { store } from "../../../service/reducers";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { data, dataFailed, dataRequest, error } = useSelector(
    (state) => state.dataList
  );
  const ingrList = useSelector((state) => state.ingrList.ingrList);
  const currentTab = useSelector((state) => state.tab.current);

  const tabRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const handleScroll = () => {
    const tabBottom = tabRef.current?.getBoundingClientRect().bottom;
    const bunTop = bunRef.current?.getBoundingClientRect().top;
    const sauceTop = sauceRef.current?.getBoundingClientRect().top;
    const mainTop = mainRef.current?.getBoundingClientRect().top;
    
    if (!tabBottom || !bunTop || !tabBottom || !sauceTop || !mainTop) {
      return;
    }
    const bunDelta = Math.abs(bunTop - tabBottom);
    const sauceDelta = Math.abs(sauceTop - tabBottom);
    const mainDelta = Math.abs(mainTop - tabBottom);

    const min = Math.min(bunDelta, sauceDelta, mainDelta);
    const newTab =
      min === bunDelta ? "bun" : min === sauceDelta ? "sauce" : "main";

    if (newTab !== currentTab) {
      dispatch(switchTab(newTab));
    }
  };

  const decompositionArr = useCallback(
    (category) => {
      const filteredData = data.filter((item) => item.type === category);
      if (filteredData) {
        return filteredData.map((item) => (
          <BurgerCart key={item._id} item={item} />
        ));
      }
    },
    [data]
  );

  const setCategories = ["bun", "sauce", "main"];
  const setTab = (tab) => {
    dispatch(switchTab(tab));
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <nav style={{ display: "flex" }} className="mt-5" ref={tabRef}>
        <Tab
          id="bun"
          value="bun"
          active={currentTab === "bun"}
          onClick={() => setTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          id="sauce"
          value="sauce"
          active={currentTab === "sauce"}
          onClick={() => setTab("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          id="main"
          value="main"
          active={currentTab === "main"}
          onClick={() => setTab("main")}
        >
          Начинки
        </Tab>
      </nav>
      <section
        className={`${style.cardSection} ${style.scrollBar}`}
        onScroll={handleScroll}
      >
        {dataRequest ? (
          <div className={`mb-6 text text_type_main-medium`}>
            Загрузка...
          </div>
        ) : dataFailed ? (
          <div className={`mb-6 text text_type_main-medium`}>
            Произошла ошибка: {error}
          </div>
        ) : (
          setCategories.map((category, index) => (
            <div
              id={category}
              key={index}
              className={`mt-10 ${style.categories} ${
                ingrList.length === 0 && category !== "bun"
                  ? `${style.disabled}`
                  : null
              }`}
              // disabled={ingrList.length === 0 && category !== "bun"}
              ref={
                category === "bun"
                  ? bunRef
                  : category === "sauce"
                  ? sauceRef
                  : mainRef
              }
            >
              <h2
                className={`mb-6 text text_type_main-medium ${style.cardSection__header}`}
              >
                {category === "bun"
                  ? "Булки"
                  : category === "sauce"
                  ? "Соусы"
                  : "Начинки"}
              </h2>
              <div className={style.cardContainer}>
                {decompositionArr(category)}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
// BurgerIngredients.propTypes = {
//   data: ingredientPropType,
// };

export default BurgerIngredients;
