import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  productsList: [],
  filteredList: [],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoadingState(state) {
      state.loading = !state.loading
    },
    initialiseProductList(state, action) {
      state.productsList = action.payload
    },
    decreaseInProductList(state, action) {
      const newItem = action.payload
      const productListIndex = state.productsList.findIndex(
        (item) => item.id === newItem.id
      )
      const product = state.productsList[productListIndex]
      const updatedProduct = {
        ...product,
        quantity: product.quantity - newItem.quantity,
      }
      let updatedList = [...state.productsList]
      updatedList[productListIndex] = updatedProduct
      state.productsList = updatedList
    },
    increaseInProductList(state, action) {
      const newItem = action.payload
      const productListIndex = state.productsList.findIndex(
        (item) => item.id === newItem.id
      )
      const product = state.productsList[productListIndex]
      const updatedProduct = {
        ...product,
        quantity: product.quantity + newItem.quantity,
      }
      let updatedList = [...state.productsList]
      updatedList[productListIndex] = updatedProduct
      state.productsList = updatedList
    },
    setFilteredList(state, action) {
      state.filteredList = action.payload
    },
  },
})

export const productActions = productSlice.actions
export default productSlice
