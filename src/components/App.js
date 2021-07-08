import { useSelector } from 'react-redux';

import Loader from './Loader';
import ErrorLoading from './ErrorLoading';
import ProductList from './products/ProductList';
import OrderList from './orders/OrderList';

function App() {
  const loadingStatus = useSelector((state) => state.products.status);
  
  const renderLoadingStatus = () => {
    if (loadingStatus === 'loading') {
      return <Loader />;
    }
    if (loadingStatus === 'error') {
      return <ErrorLoading />;
    }
    return (
      <div className="ui two column grid">
        <div className="column">
          <ProductList />
        </div>
        <div className="column">
          <OrderList />
        </div>
      </div>
    )
  }
  return (
    <div className="ui container">      
      <div className="ui basic segment">
        <h2 className="ui header">Vending machine</h2>
      </div>
      {renderLoadingStatus()}
    </div>
  );
}

export default App;
