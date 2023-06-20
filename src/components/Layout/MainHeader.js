import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import styles from './MainHeader.module.css'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCartOutlined } from '@mui/icons-material'

const MainHeader = () => {
  const location = useLocation()
  //checking to see which page we are on to apply styling
  const isProductsPage = location.pathname === '/'
  const isCartPage = location.pathname === '/cart'

  const cartQuantity = useSelector((state) => state.cart.totalQuantity)

  return (
    <Fragment>
      <header className={styles['header-container']}>
        <div className={styles.logo}>
          <Link className={styles.link} to='/'>
            TeeRex Store
          </Link>
        </div>
        <div className={styles['nav-buttons']}>
          <Link className={styles.link} to='/'>
            <button
              className={`${styles.button} ${
                isProductsPage ? styles['hover-button'] : ''
              } ${styles['hide-products']}`}
            >
              Products
            </button>
          </Link>
          <button
            className={`${styles.cart} ${
              isCartPage ? styles['hover-button'] : ''
            }`}
          >
            <Link className={styles.link} to='/cart'>
              <ShoppingCartOutlined className={styles.cart} />
              <span className={styles['cart-quant']}>{cartQuantity}</span>
            </Link>
          </button>
        </div>
      </header>
    </Fragment>
  )
}

export default MainHeader
