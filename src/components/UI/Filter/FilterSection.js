import React from 'react'
import styles from './FilterSection.module.css'
import Filter from './Filter'
import { useDispatch, useSelector } from 'react-redux'
import { filterActions } from '../../../store/filter-slice'
import { productActions } from '../../../store/product-slice'
import {
  applyFiltersToProducts,
  searchFilterProducts,
} from '../../../helpers/filterList'
const FilterSection = (props) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'black']
  const gender = ['men', 'women']
  const type = ['polo', 'hoodie', 'basic']
  const price = ['0-250', '251-400', '451-1000']
  const filters = useSelector((state) => state.filters)
  const { productsList, filteredList } = useSelector((state) => state.products)
  const dispatch = useDispatch()

  //function to handle applying filters and dispatching filtered list when clicking 'apply filters' button
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(filterActions.setClicked())
    const filterList = filteredList.filter((item) =>
      applyFiltersToProducts(filters, item)
    )
    const finalFilterList = searchFilterProducts(
      filters.search,
      filterList,
      dispatch
    )
    dispatch(productActions.setFilteredList(finalFilterList))
  }
  //function to handle resetting of filters when 'reset filters' button is clicked
  const resetHandler = () => {
    dispatch(filterActions.resetFilters())
    dispatch(productActions.setFilteredList(productsList))
    const filterList = searchFilterProducts(
      filters.search,
      productsList,
      dispatch
    )
    dispatch(productActions.setFilteredList(filterList))
    dispatch(filterActions.setClicked())
  }
  return (
    <div className={styles.filterSection}>
      <form className={styles.filterForm} onSubmit={submitHandler}>
        <div className={styles.filterContainer}>
          <Filter values={colors} type='color' name='Color' />
          <Filter values={gender} type='gender' name='Gender' />
          <Filter values={type} type='type' name='Type' />
          <Filter values={price} type='price' name='Price Range(Rs.)' />
        </div>
        <div>
          <button
            type='button'
            className={styles.filterButtons}
            onClick={resetHandler}
          >
            Reset Filters
          </button>
          <button className={styles.filterButtons}>Apply Filters</button>
        </div>
      </form>
    </div>
  )
}

export default FilterSection
