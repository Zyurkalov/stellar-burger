
import { FC } from "react"
import style from './status-order.module.css'
import { TOrderStatus } from '../../../types/types';
export const StatusOrder: FC<{value: TOrderStatus}> = ({value}) => {

    let statusText = '';
    let statusColor = '';
    switch (value) {
      case 'done':
        statusText = 'Выполнен';
        statusColor = style.status_done
        break;
      case 'canceled':
        statusText = 'Отменен';
        statusColor = style.status_cancel
        break;
      case 'pending':
        statusText = 'Готовится';
        statusColor = style.status_default
        break;
      default:
        statusText = 'Создан';
        statusColor = style.status_default
    }

    return <p className={`mt-2 text text_type_main-small ${statusColor}`}>{statusText}</p>;
}


