import { createSlice } from '@reduxjs/toolkit';

// const addToDistinctArray = (array, value) => {
//     let temp = [];
//     if (array.some((item) => item.id === value.id)) {
//         temp = array.filter((it) => it.id !== value.id);
//     } else {
//         temp = [...array, value];
//     }
//     return temp;
// };

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        contactDetail: {},
    },
    reducers: {
        setContactDetail(state, action) {
            return {
                ...state,
                contactDetail: action.payload,
            };
        },
    },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice;
