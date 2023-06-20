import React from 'react'
import styles from './Products.module.css'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard/ProductCard'
import ScrollToTop from '../UI/ScrollToTop/ScrollToTop'
import CircularProgress from '@mui/material/CircularProgress'
const Products = () => {
  const filteredList = useSelector((state) => state.products.filteredList)
  const loading = useSelector((state) => state.products.loading)

  return (
    <div className={styles['products-container']}>
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress style={{ color: 'black' }} />
          <div>Loading Products List...</div>
        </div>
      ) : filteredList.length === 0 ? (
        <div className={styles.noProducts}>
          <p>No products found</p>
        </div>
      ) : (
        filteredList.map((item) => <ProductCard key={item.id} item={item} />)
      )}
      <ScrollToTop />
    </div>
  )
}

export default Products
