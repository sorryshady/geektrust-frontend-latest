import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart-slice'
import productSlice from './product-slice'
import filterSlice from './filter-slice'

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    filters: filterSlice.reducer,
  },
})

export default store
