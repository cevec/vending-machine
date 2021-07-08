import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { dispatchModeStatus, setDispatchMode, selectIsPendingOrder } from './ordersSlice';

const OrderDispatchMode = () => {
    const [ displayMessage, setDisplayMessage ] = useState(false);
    
    const dispatchMode = useSelector((state) => state.orders.dispatchMode);
    const isPendingOrder = useSelector((state) => selectIsPendingOrder(state));

    const dispatch = useDispatch();

    const setDispathMode = (newDispatchMode) => {
        if (!isPendingOrder) {
            setDisplayMessage(false);
            dispatch(setDispatchMode(newDispatchMode));
        } else {
            setDisplayMessage(true);
        }
    }

    const renderMessage = () => {
        if (displayMessage) {
            return (
                <div className="ui info message">
                    Please wait until all orders are processed to change dispatch mode.
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div className="ui attached segment">
            Dispatch mode&nbsp; 
            <div className="ui buttons">
                <button 
                onClick={() => setDispathMode(dispatchModeStatus.simultaneous)}
                className={"ui" + (dispatchMode === dispatchModeStatus.simultaneous ? " blue active " : " ") + "button"}>
                    Simultaneous
                </button>
                <div className="or" />
                <button 
                onClick={() => setDispathMode(dispatchModeStatus.sequential)}
                className={"ui" + (dispatchMode === dispatchModeStatus.sequential ? " blue active " : " ") + "button"}>
                    Sequential
                </button>
            </div>
            {renderMessage()}
        </div>
        
    );
};

export default OrderDispatchMode;