import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './products/productsSlice';
import ordersReducer from './orders/ordersSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        orders: ordersReducer
    }
});

export default store;