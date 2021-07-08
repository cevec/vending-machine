import { createSlice, createSelector } from '@reduxjs/toolkit';

//import productsApi from '../../apis/productsApi';
import tempProductsApi from '../../apis/tempProductsApi';

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
        //const response = await productsApi.get('/products');
        /*const response = await fetch('https://vending-machine-test.vercel.app/api/products', {
            mode: 'no-cors',
            headers: {
                //'Content-Type': 'application/json'
                 'Content-Type': 'application/x-www-form-urlencoded',
              }
        });*/
        //console.log(response);
        //const json =  await response.json();
        //console.log(json);
        //dispatch(productsLoaded(response.data.data));
        //dispatch(productsLoaded(json.data));
        dispatch(productsLoaded(tempProductsApi.data));
        
    } catch (error) {
        console.log(error);
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