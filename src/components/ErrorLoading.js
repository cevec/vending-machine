import { useDispatch } from 'react-redux';
import { fetchProducts } from './products/productsSlice';
const ErrorLoading = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(fetchProducts());
    }
    return (
        <div className="ui placeholder segment">
            <div className="ui icon header">
                <i className="warning icon" />
                Error loading products. Please try again.
            </div>
            <button onClick={onClick} className="ui primary button">Load products</button>
        </div>
    );
};

export default ErrorLoading;