import React, { Fragment } from 'react'
import styles from './Layout.module.css'
import Products from '../Products/Products'
import SearchSort from './SearchSort'
const Layout = () => {
  return (
    <Fragment>
      <div className={styles.searchSort}>
        <SearchSort />
      </div>
      <Products />
    </Fragment>
  )
}

export default Layout
