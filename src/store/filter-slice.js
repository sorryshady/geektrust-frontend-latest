import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  color: [],
  gender: [],
  type: [],
  price: [],
  clicked: false,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setClicked: (state) => {
      state.clicked = !state.clicked
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    toggleColor: (state, action) => {
      const { color } = action.payload
      const index = state.color.indexOf(color)
      if (index === -1) {
        state.color.push(color)
      } else {
        state.color.splice(index, 1)
      }
    },
    toggleGender: (state, action) => {
      const { gender } = action.payload
      const index = state.gender.indexOf(gender)
      if (index === -1) {
        state.gender.push(gender)
      } else {
        state.gender.splice(index, 1)
      }
    },
    toggleType: (state, action) => {
      const { type } = action.payload
      const index = state.type.indexOf(type)
      if (index === -1) {
        state.type.push(type)
      } else {
        state.type.splice(index, 1)
      }
    },
    togglePrice: (state, action) => {
      const { price } = action.payload
      const index = state.price.indexOf(price)
      if (index === -1) {
        state.price.push(price)
      } else {
        state.price.splice(index, 1)
      }
    },
    resetFilters: (state) => {
      state.color = []
      state.gender = []
      state.type = []
      state.price = []
    },
  },
})

export const filterActions = filterSlice.actions
export default filterSlice
