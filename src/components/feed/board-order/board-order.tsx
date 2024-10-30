import { FC } from 'react';
import { TBoardOrder } from '../../../types/types';
import style from "./board-order.module.css"

export const BoardOrder: FC<TBoardOrder> = ({doneList, workingList, total, totalToday}) => {
    // const location = useLocation()
    const listStatusOrders =[
        {header:"Готовы:", list: doneList}, 
        {header:"В работе:", list: workingList}
    ]
    function getCount(num: number | null ): {multiple: number | null, remainder: string | number | null} {
        if(num === null) {
            return {multiple: null, remainder: null}
        }
        const multiple = Math.floor(num / 1000)
        const remainder = (num % 1000)

        // if(multiple < 1) {
        //     return { multiple: null, remainder};
        // }
        // return {multiple, remainder: remainder.toString().padStart(3, '0')}
        return multiple < 1 ? { multiple: null, remainder} : {multiple, remainder: remainder.toString().padStart(3, '0')}
    }
    function getColumnCount(list: number[]){
        const numColumns = Math.ceil(list.length / 10);
        return Math.min(numColumns, 3);
      }

    return (
        <div className={style.mainContainer}>
            <ul className={style.orderStatus}>
                {listStatusOrders.map((value, index) => {
                    return (
                    <li className={style.orderStatus__container} key={index}>
                    <h2 className={`text text_type_main-medium ${style.orderStatus__header}`}>{value.header}</h2>
                    <ul className={`${style.orderStatus__list}`} id={"orderStatusList"} style={{ columnCount: getColumnCount(value.list) }}>
                        {value.list.length === 0 
                        ? <span className={`text text_type_main-default text_color_inactive`}>все готовы</span> 
                        : value.list.map((number: number, index: number) => {
                            if(index < 30){
                            return (
                                <li key={index} className={`text text_type_digits-default ${value.header === "Готовы:" 
                                ? style.orderStatus_done 
                                : style.orderStatus_working}`}>{number}
                            </li>)
                            }}
                        )}
                    </ul>
                </li>)
                })}
            </ul>
            <div className={style.completedOrder}>
                <h2 className={`text text_type_main-medium ${style.orderStatus__header}`}> Выполнено за все время:</h2>
                <span className={`text text_type_digits-large ${style.orderStatus__count}`}>
                    {`${getCount(total).multiple !== null ? `${getCount(total).multiple}`:''} ${getCount(total).remainder}`}
                </span>
            </div>
            <div className={style.completedOrder}>
                <h2 className={`text text_type_main-medium ${style.orderStatus__header}`}>Выполнено за сегодня:</h2>
                <span className={`text text_type_digits-large ${style.orderStatus__count}`}>
                    {`${getCount(totalToday).multiple !== null ? `${getCount(totalToday).multiple}`:''} ${getCount(totalToday).remainder}`}
                </span>
            </div>
        </div>
      );
}