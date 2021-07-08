import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectOrderById, decreaseOrderTime, orderStatus } from './ordersSlice';

const OrderListItem = ({ id }) => {
    const order = useSelector((state) => selectOrderById(state, id));
    const { product, remainingPreparationTime, status } = order;
    const { name, thumbnail } = product;

    const dispatch = useDispatch();
    
    useEffect(() => { 
        if (remainingPreparationTime > 0 && status === orderStatus.inProgress) {
            dispatch(decreaseOrderTime(id));
        }
        // eslint-disable-next-line
    },[remainingPreparationTime,status])

    const renderPreparationTime = () => {
        if (status === orderStatus.completed) {
            return <i className="check green icon" />;
        } else if (status === orderStatus.inProgress) {
            return (
                <div className="ui green circular label">
                    {remainingPreparationTime}
                </div>
            );
        } else {
            return (
                <div className="ui red circular label">
                    {remainingPreparationTime}
                </div>
            );
        }
    };

    return (
        <div className="item">
            <div className="right floated content">
                {renderPreparationTime()}
            </div>
            <img className="ui avatar image" src={thumbnail} alt={name} />
            <div className="middle aligned content">
                {name}
            </div>
        </div>
    );
};

export default OrderListItem;