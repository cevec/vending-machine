import { useSelector } from 'react-redux';

import { selectProductIds } from './productsSlice';
import ProductListItem from './ProductListItem';

const ProductList = () => {
    const productIds = useSelector((state) => selectProductIds(state));

    const renderProducts = productIds.map((id) => {
        return <ProductListItem id={id} key={id} />;
    })
    return (
        <div>
            <h3 className="ui top attached header">
                Product List
            </h3>
            <div className="ui attached segment">
                <div className="ui two cards">
                    {renderProducts}
                </div>
            </div>
        </div>
    );
};

export default ProductList;