import { createSlice, createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    data: {}
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        orderAdded(state, action) {
            const order = {
                id: uuidv4(),
                product: action.payload,
                remainingPreparationTime: action.payload.preparation_time
            };
            state.data[order.id] = order;
        },
        orderTimeDecreased(state, action) {
            const order = state.data[action.payload];
            order.remainingPreparationTime--;
        }
    }
});

export const {
    orderAdded,
    orderTimeDecreased
} = ordersSlice.actions;

export default ordersSlice.reducer;

export const decreaseOrderTime = (orderId) => dispatch => {
    setTimeout(() => {
        dispatch(orderTimeDecreased(orderId));
    }, 1000);
};

const selectOrdersData = (state) => state.orders.data;

export const selectOrders = createSelector(
    selectOrdersData,
    (orders) => Object.values(orders)
);

export const selectOrderIds = createSelector(
    selectOrders,
    (orders) => orders.map((order) => order.id)
);

export const selectOrderById = (state, orderId) => {
    return selectOrdersData(state)[orderId];
};