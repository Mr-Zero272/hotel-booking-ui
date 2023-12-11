import { createSlice } from '@reduxjs/toolkit';

const addToDistinctArray = (array, value) => {
    let temp = [];
    if (array.some((item) => item.id === value.id)) {
        temp = array.filter((it) => it.id !== value.id);
    } else {
        temp = [...array, value];
    }
    return temp;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        listCartItemChecked: [],
        totalPrice: 0,
    },
    reducers: {
        addCartItem(state, action) {
            const newList = addToDistinctArray(state.listCartItemChecked, action.payload);
            let totalP = 0;
            newList.forEach((element) => {
                totalP += element.totalPrice;
            });
            return {
                ...state,
                listCartItemChecked: newList,
                totalPrice: totalP,
            };
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
