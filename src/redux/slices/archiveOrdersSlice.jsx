import {createSlice} from '@reduxjs/toolkit';

const loadArchiveOrdersFromLocalStorage = () => {
    const savedArchiveOrders = localStorage.getItem('archiveOrders');
    return savedArchiveOrders ? JSON.parse(savedArchiveOrders) : [];
    }
const saveArchiveOrdersToLocalStorage = (items) => {
    localStorage.setItem('archiveOrders', JSON.stringify(items));
}

const archiveOrdersSlice = createSlice({
    name: 'archiveOrders',
    initialState: {
        items: loadArchiveOrdersFromLocalStorage()
    },
    reducers: {
        addToArchiveOrders: (state, action) => {
            state.items.push({ ...action.payload });
            saveArchiveOrdersToLocalStorage(state.items);
        },
        removeFromArchiveOrders: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            saveArchiveOrdersToLocalStorage(state.items);
        },
        updateArchiveOrderItemQuantity: (state, action) => {
            const { _id, quantity } = action.payload;
            const item = state.items.find(item => item._id === _id);
        
            if (item) {
                item.quantity = quantity;
                saveArchiveOrdersToLocalStorage(state.items);
            } else {
                console.error(`Item with id ${_id} not found`);
            }
        }
        ,
        setArchiveOrders: (state, action) => {
            state.items = action.payload;
        }
    },
});

export const { addToArchiveOrders, removeFromArchiveOrders, setArchiveOrders } = archiveOrdersSlice.actions;

export default archiveOrdersSlice.reducer;

