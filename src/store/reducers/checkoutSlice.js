import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    checkout: false,
    delivery: 'delivery',
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckout: (state, action) => {
            state.checkout = action?.payload
        },
        editDeliveryCheckout: (state, action) => {
            state.delivery = action?.payload
        },
        resetCheckout: (state) => {
            state.checkout = false
        },
    },
})

export const {setCheckout, editDeliveryCheckout, resetCheckout} = checkoutSlice.actions

export default checkoutSlice.reducer
