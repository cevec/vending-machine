import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectOrderById, decreaseOrderTime } from './ordersSlice';

const OrderListItem = ({ id }) => {
    const order = useSelector((state) => selectOrderById(state, id));
    const { product, remainingPreparationTime } = order;
    const { name, thumbnail } = product;

    const dispatch = useDispatch();

    useEffect(() => { 
        if (remainingPreparationTime > 0) {
            dispatch(decreaseOrderTime(id));
        }
        // eslint-disable-next-line
    },[remainingPreparationTime])

    const renderPreparationTime = () => {
        if (remainingPreparationTime <= 0) {
            return <i className="check green icon" />;
        } else {
            return (
                <div className="ui green circular label">
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