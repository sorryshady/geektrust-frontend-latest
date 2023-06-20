import axios from 'axios'
import { productActions } from './product-slice'
import { enqueueSnackbar } from 'notistack'

export const fetchProducts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
      )
      const data = response.data || []
      return data
    }
    try {
      dispatch(productActions.setLoadingState())
      const productData = await fetchData()
      dispatch(productActions.initialiseProductList(productData))
      dispatch(productActions.setFilteredList(productData))
      dispatch(productActions.setLoadingState())
    } catch (error) {
      enqueueSnackbar('Error encountered', {
        variant: 'error',
      })
    }
  }
}
