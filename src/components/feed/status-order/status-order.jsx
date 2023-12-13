import PropTypes from 'prop-types';
import style from './status-order.module.css'
export const StatusOrder = ({value}) => {

    let statusText = '';
    let statusColor = '';
    switch (value) {
      case 'done':
        statusText = 'Завершен';
        statusColor = style.status_done
        break;
      case 'pending':
        statusText = 'В процессе';
        statusColor = style.status
        break;
      default:
        statusText = 'Отменен';
        statusColor = style.status_cancel
    }

    return <p className={`mt-2 text text_type_main-small ${statusColor}`}>{statusText}</p>;
}
StatusOrder.propsTypes = {
    status: PropTypes.string.isRequired
}

