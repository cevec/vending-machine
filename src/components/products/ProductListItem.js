import { useSelector, useDispatch } from 'react-redux';

import { selectProductById } from './productsSlice';
import { orderAdded } from '../orders/ordersSlice';

const ProductListItem = ({ id }) => {
    const product = useSelector((state) => selectProductById(state, id));
    const { name, thumbnail } = product;

    const dispatch = useDispatch();

    const onAdd = () => {
        dispatch(orderAdded(product));
    };

    return (
        <div className="ui card">
            <div className="center aligned content">
                <button onClick={onAdd}className="ui mini right floated icon button">
                    <i className="add icon" />
                </button>
                <img className="ui huge avatar image" src={thumbnail} alt={name}/>
            </div>
            <div className="extra content">
                <div className="center aligned">
                    {name}
                </div>
            </div>
        </div>
    );
};

export default ProductListItem;