import { useState, useEffect } from "react";

import ListOrder from "./list-order/list-order";
import BoardOrder from "./board-order/board-order";
import mainStyles from "../constructor/constructor.module.css"

function FeedComponent()  {
    const [mainClass, setMainClass] = useState(mainStyles.main);

    // переписать под отдельный хук:
    useEffect(() => {
      const timer = setTimeout(() => {
        setMainClass(`${mainStyles.main} ${mainStyles.main_visible}`);
      }, 0);
      return () => clearTimeout(timer);
    }, []); 

    return (
        <main className={mainClass}>
          <h1 className={`text text_type_main-large`}>Лента заказов</h1>
          <div className={mainStyles.container}>
              <ListOrder></ListOrder>
              <BoardOrder></BoardOrder>
          </div>
        </main>
      );
}

export default FeedComponent