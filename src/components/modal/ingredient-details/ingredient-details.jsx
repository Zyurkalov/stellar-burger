import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getApiData } from '../../../service/actions/app';
import {oneIngrPropType} from "../../../utils/prop-types";
import styles from "./ingredient-details.module.css";

function IngredientDetails(ingr) {
  
  const dispatch = useDispatch()
  const { ingredientId } = useParams();
  const { item } = ingr
  const [ingredient, setIngredient] = useState(item)
  const { data } = useSelector(
    (store) => store.dataList
  );
  
  useEffect(() => {
    const fetchData = () => {
      if (ingredient === undefined) {
        console.log(ingredient)
       dispatch(getApiData());
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    if (ingredient === undefined) {
      const findedIngredient = data.find(({ _id }) => _id === ingredientId);
      setIngredient(findedIngredient)
    }
  }, [data]);

  const valueIngr = (teg) => ingredient?.[teg] || null;

  const maket = [
    { label: "Калории, ккал", value: valueIngr('calories') },
    { label: "Белки, г", value: valueIngr('proteins') },
    { label: "Жиры, г", value: valueIngr('fat') },
    { label: "Углеводы, г", value: valueIngr('carbohydrates') },
  ];

  return (
    <section className={styles.section}>
    {ingredient === undefined ? (
      <h3 className={`mb-8 text text_type_main-medium ${styles.name}`}>
        Загрузка...
      </h3>
    ) : 
    <>
      <img
        src={valueIngr('image_large')}
        className={styles.img}
        alt={valueIngr('name')}
      />
      <div>
        <h3 className={`mb-8 text text_type_main-medium ${styles.name}`}>
          {valueIngr('name')}
        </h3>
        <ul className={styles.ingrList}>
          {maket.map((point, index) => (
            <li className={`mb-5 ${styles.ingrInfo}`} key={index}>
              <p className="text text_type_main-default text_color_inactive">
                {point.label}
              </p>
              <span
                className={`text text_type_digits-default text_color_inactive ${styles.span}`}
              >
                {point.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
      </>}
    </section>
  );
}
IngredientDetails.propTypes = {
  item: oneIngrPropType,
};
export default IngredientDetails;
