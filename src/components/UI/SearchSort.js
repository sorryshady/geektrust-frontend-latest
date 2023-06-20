import React, { Fragment, useState } from 'react'
import styles from './SearchSort.module.css'
import FilterSection from './Filter/FilterSection'
import { useDispatch, useSelector } from 'react-redux'
import { filterActions } from '../../store/filter-slice'
import { productActions } from '../../store/product-slice'
import {
  applyFiltersToProducts,
  searchFilterProducts,
} from '../../helpers/filterList'
const SearchSort = (props) => {
  const clicked = useSelector((state) => state.filters.clicked)
  const filters = useSelector((state) => state.filters)
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')

  //function to handle if filter panel is open or not
  const clickHandler = () => {
    dispatch(filterActions.setClicked())
  }
  //function to handle search query change
  const searchChange = (event) => {
    const query = event.target.value
    dispatch(filterActions.setSearch(query))
    setSearchQuery(query)
    if (query === '') {
      dispatch(filterActions.setSearch(query))
      dispatch(productActions.setFilteredList(products.productsList))
      const finalFilterList = products.productsList.filter((item) =>
        applyFiltersToProducts(filters, item)
      )
      dispatch(productActions.setFilteredList(finalFilterList))
    }
  }
  //function to handle search functionality when search button is clicked
  const searchHandler = () => {
    const filterList = searchFilterProducts(
      filters.search,
      products.filteredList,
      dispatch
    )
    const finalFilterList = filterList.filter((item) =>
      applyFiltersToProducts(filters, item)
    )
    dispatch(productActions.setFilteredList(finalFilterList))
  }

  return (
    <Fragment>
      <div id='search' className={styles.input}>
        <button
          className={`${styles.button} ${styles.filter}`}
          onClick={clickHandler}
        >
          Filters
        </button>
        {clicked && <FilterSection />}
        <input
          className={styles.searchBar}
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={searchChange}
        />
        <button className={styles.button} onClick={searchHandler}>
          Search
        </button>
      </div>
    </Fragment>
  )
}

export default SearchSort
