import { useSelector } from 'react-redux';

import { selectOrderIds } from './ordersSlice';
import OrderListItem from './OrderListItem';

const OrderList = () => {
    const orderIds = useSelector((state) => selectOrderIds(state));

    const renderOrders = orderIds.map((id) => {
        return <OrderListItem id={id} key={id} />
    })

    return (
        <div>
            <h3 className="ui top attached header">
                Order list
            </h3>
            <div className="ui attached segment">
                <div className="ui divided list">
                    {renderOrders}
                </div>
            </div>
        </div>
        
    );
};

export default OrderList;