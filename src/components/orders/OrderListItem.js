import { useSelector } from 'react-redux';

import { selectOrderById } from './ordersSlice';

const OrderListItem = ({ id }) => {
    const order = useSelector((state) => selectOrderById(state, id));
    const { product, remainingPreparationTime } = order;
    const { name, thumbnail } = product;

    return (
        <div className="item">
            <div className="right floated content">
                <div className="ui green circular label">
                    {remainingPreparationTime}
                </div>
            </div>
            
                <img className="ui avatar image" src={thumbnail} alt={name} />
            
            <div className="middle aligned content">
                {name}
            </div>
            
        </div>
    );
};

export default OrderListItem;