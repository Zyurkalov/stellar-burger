import { useEffect, useState, FC } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from '../../../utils/hooks/useAppStore';

import { NotFound404 } from '../../../page';
import { TIngredient } from '../../../types/types';

import appStyles from "../../app/app.module.css"
import styles from "./ingredient-details.module.css";

type TTeg = 'image_large' | "name" | 'calories' | 'proteins' | 'fat' | 'carbohydrates'

const IngredientDetails: FC<{item?: TIngredient}> = ({item}) => {
  const { ingredientId } = useParams();
  const { data } = useAppSelector((store) => store.dataList);
  const [ingredient, setIngredient] = useState<TIngredient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ingredient === null) {
      const foundIngredient = data.find(({ _id }) => _id === ingredientId);
      setIngredient(foundIngredient || null)
      setLoading(false)
    }
  }, [data, ingredient, ingredientId]);

  const valueIngr = (teg: TTeg) => (ingredient?.[teg] || '') as string;
  const maket = [
    { label: "Калории, ккал", value: valueIngr('calories') },
    { label: "Белки, г", value: valueIngr('proteins') },
    { label: "Жиры, г", value: valueIngr('fat') },
    { label: "Углеводы, г", value: valueIngr('carbohydrates') },
  ];
  return (
    <div className={item === undefined ? appStyles.cover : undefined }>
    <section className={styles.section}>
      {ingredient === null && loading ? (
        <h3 className={`mb-8 text text_type_main-medium ${styles.name}`}>
          Загрузка...
        </h3>
      ) : ingredient ? (
        <>
        {item ? null : (<h2 className=" text text_type_main-large">Детали ингредиента</h2>)}
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
        </>
      ) : (
        <NotFound404 />
      )
      }
    </section>
    </div>
  );
}

export default IngredientDetails;
