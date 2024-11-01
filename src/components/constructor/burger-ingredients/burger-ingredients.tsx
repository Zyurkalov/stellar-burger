import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/useAppStore";

import { switchTab } from "../../../service/actions/burger-ingredients";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { TType } from "../../../types/types";
import BurgerCart from "./burger-cart/burger-cart";
import style from "./burger-ingredients.module.css";
import { ScrollBar } from "../../ui-kit/ScrollBar";

function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const { data, dataFailed, dataRequest, error } = useAppSelector(
    (state) => state.dataList
  );
  // const ingrList = useSelector((state) => state.ingrList.other);
  const currentTab = useAppSelector((state) => state.tab.current);

  const tabRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

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

  const setCategories: TType[] = ["bun", "sauce", "main"];
  const setTab = (tab: TType)=> {
    dispatch(switchTab(tab));
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  const getTab = () => {
    const defaultName: {[key in TType]: string} = {
      "bun": "Булки",
      "sauce": "Соусы",
      "main": "Начинки",
    };
    return Object.keys(defaultName).map((key) => (
      <Tab
        key={key}
        value={key}
        active={currentTab === key}
        onClick={() => setTab(key as TType)}
      >
        {defaultName[key as TType]}
      </Tab>
    ));
  };

  return (
    <div>
      <nav style={{ display: "flex" }} className="mt-5" ref={tabRef}>
        {getTab()}
      </nav>
      <ScrollBar extraClass={style.height}>
      {/* <section
        className={`${style.cardSection} ${style.scrollBar}`}
        onScroll={handleScroll}
      > */}
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
              className={`mt-10 ${style.categories}`}
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
              <li className={style.cardContainer}>
                {decompositionArr(category)}
              </li>
            </div>
          ))
        )}
      {/* </section> */}
      </ScrollBar>
    </div>
  );
}

export default BurgerIngredients;
