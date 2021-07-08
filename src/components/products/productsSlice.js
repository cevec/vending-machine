import { createSlice, createSelector } from '@reduxjs/toolkit';

import productsApi from '../../apis/productsApi';
//import tempProductsApi from '../../apis/tempProductsApi';

const initialState = {
    status: 'idle',
    data: {}
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsLoading(state) {
            state.status = 'loading';
        },
        productsLoaded(state, action) {
            const newProducts = {};
            action.payload.forEach((product) => {
                newProducts[product.id] = product;
            });
            state.data = newProducts;
            state.status = 'idle';
        },
        productsLoadError(state) {
            state.status = 'error';
        }
    }
});

export const {
    productsLoaded,
    productsLoading,
    productsLoadError
} = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
    dispatch(productsLoading());
    try {
        //todo: fix issue to download products from api
        const response = await productsApi.get('/products');
        dispatch(productsLoaded(response.data.data));        
    } catch (error) {
        dispatch(productsLoadError());
    }  
};

const selectProductsData = (state) => state.products.data;

export const selectProducts = createSelector(
    selectProductsData,
    (data) => Object.values(data)
);

export const selectProductIds = createSelector(
    selectProducts,
    (products) => products.map((product) => product.id) 
);

export const selectProductById = (state,productId) => {
    return selectProductsData(state)[productId];
};