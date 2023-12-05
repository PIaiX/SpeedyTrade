import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    promo: false,
    deliveryPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartAll: (state, action) => {
            if (action?.payload) {
                state.items = action?.payload
            }
        },
        updateCartSync: (state, action) => {
            let isCart = state.items.findIndex((e) => {
                if (e.id === action?.payload?.id) {
                    if (e?.cart?.data?.modifiers && action?.payload?.cart?.data?.modifiers) {
                        return (
                            JSON.stringify(e.cart.data.modifiers) ===
                            JSON.stringify(action.payload.cart.data.modifiers)
                        )
                    }
                    return true
                }
            })

            if (isCart != -1 && action?.payload?.cart?.count === 0) {
                state.items.splice(isCart, 1)
            } else if (isCart != -1) {
                state.items[isCart] = {
                    ...action.payload,
                    count: action.payload.cart.count,
                }
            } else {
                state.items.push(action?.payload)
            }
        },
        cartEditOptions: (state, action) => {
            let isCart = state.items[action.payload.index]
            if (isCart != -1 && isCart) {
                state.items[action.payload.index] = action.payload
            } else {
                state.items.push(action.payload)
            }
        },
        cartPromo: (state, action) => {
            if (action?.payload) {
                state.promo = action.payload
            }
        },
        cartZone: (state, action) => {
            if (action?.payload) {
                state.zone = action.payload
            }
        },
        cartDeletePromo: (state) => {
            state.promo = false
        },
        resetCart: (state) => {
            state.promo = false
            state.zone = false
            state.items = []
        },
    },
})

export const {
    updateCartSync,
    cartEditOptions,
    cartZone,
    cartDeliveryPrice,
    cartDeletePromo,
    resetCart,
    updateCartAll,
} = cartSlice.actions

export default cartSlice.reducer
