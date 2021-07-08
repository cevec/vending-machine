import { createSlice, createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const orderStatus = {
    pending: '2.Pending',
    inProgress: '1.In Progress',
    completed: '3.Completed',
};

export const dispatchModeStatus = {
    sequential: 'sequential',
    simultaneous: 'simultaneous'
};

const initialState = {
    data: {},
    dispatchMode: dispatchModeStatus.sequential
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        orderAdded(state, action) {
            const order = {
                id: uuidv4(),
                product: action.payload,
                remainingPreparationTime: action.payload.preparation_time,
                status: orderStatus.pending
            };
            
            if (state.dispatchMode === dispatchModeStatus.simultaneous){
                order.status = orderStatus.inProgress;
            } else {
                const tmpOrders = Object.values(state.data);
                const newOrders = tmpOrders.filter((order) => order.status === orderStatus.inProgress);
                if (newOrders.length === 0 ) {
                    order.status = orderStatus.inProgress;
                }
            }
            state.data[order.id] = order;
        },
        orderTimeDecreased(state, action) {
            const order = state.data[action.payload];
            order.remainingPreparationTime--;
            if (order.remainingPreparationTime <= 0) {
                order.status = orderStatus.completed;

                if (state.dispatchMode === dispatchModeStatus.sequential){
                    const tmpOrders = Object.values(state.data);
                    const newOrders = tmpOrders.filter((order) => order.status === orderStatus.pending);
                    if (newOrders.length > 0 ) {
                        const nextOrder = state.data[newOrders[0].id];
                        nextOrder.status = orderStatus.inProgress;
                    }
                }
            }
        },
        setDispatchMode(state, action) {
            state.dispatchMode = action.payload;
        }
    }
});

export const {
    orderAdded,
    orderTimeDecreased,
    setDispatchMode
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
    (orders) => {
        orders.sort((orderA,orderB) => {

            if (orderA.status > orderB.status){
                return 1;
            }
            if (orderA.status < orderB.status){
                return -1;
            }
            return 0;
        })
        return orders.map((order) => order.id)
    }
);

export const selectOrderById = (state, orderId) => {
    return selectOrdersData(state)[orderId];
};

export const selectIsPendingOrder = createSelector(
    selectOrders,
    (orders) => {
        const pendingOrders = orders
            .filter((order) => order.status === orderStatus.inProgress 
                || order.status === orderStatus.pending);
        return (pendingOrders.length === 0 ? false : true);
    }
)