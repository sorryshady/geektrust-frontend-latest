import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload
      state.totalPrice += newItem.price * newItem.quantity
      const existingItem = state.items.find((item) => item.id === newItem.id)
      state.totalQuantity = state.totalQuantity + newItem.quantity
      if (!existingItem) {
        state.items.push(newItem)
      } else {
        existingItem.quantity++
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        existingItem.quantity--
      }
      state.totalQuantity--
      state.totalPrice -= existingItem.price
    },
    deleteItemFromCart(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      state.totalQuantity -= existingItem.quantity
      state.totalPrice -= existingItem.quantity * existingItem.price
      state.items = state.items.filter((item) => item.id !== id)
    },
    resetCart(state) {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice
