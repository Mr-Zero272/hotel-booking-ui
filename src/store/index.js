import { configureStore } from '@reduxjs/toolkit';
import formBookingTicketSlice from './form-boking-ticket-slice';
import listTodayScheduleSlice from './list-today-schedule-slice';
import paginationSlice from './pagination-slice';
import userSlice from './user-slice';
import addToCartSlice from './add-to-cart-slice';
import cartQuantity from './cart-quantity';
import cartSlice from './cart-slice';
import checkoutSlice from './checkout-slice';

const store = configureStore({
    reducer: {
        formBookingTicket: formBookingTicketSlice.reducer,
        listTodaySchedule: listTodayScheduleSlice.reducer,
        pagination: paginationSlice.reducer,
        user: userSlice.reducer,
        cart: cartSlice.reducer,
        checkout: checkoutSlice.reducer,
        addToCart: addToCartSlice.reducer,
        cartQuantity: cartQuantity.reducer,
    },
});

export default store;
