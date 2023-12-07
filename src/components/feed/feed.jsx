import { useState, useEffect } from "react";

import { hardData } from "../../constatnts/hard-data";
import ListOrder from "./list-order/list-order";
import BoardOrder from "./board-order/board-order";
import mainStyles from "../constructor/constructor.module.css"

function FeedComponent()  {
    const [mainClass, setMainClass] = useState(mainStyles.main);

    const {orders} = hardData

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
          <div className={`${mainStyles.container} ${mainStyles.container_feedPage}`}>
              <ListOrder data={orders}></ListOrder>
              <BoardOrder></BoardOrder>
          </div>
        </main>
      );
}

export default FeedComponent