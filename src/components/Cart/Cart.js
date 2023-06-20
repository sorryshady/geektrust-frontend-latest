import React from 'react'
import styles from './Cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItem from './CartItem/CartItem'
import { enqueueSnackbar } from 'notistack'
import { cartActions } from '../../store/cart-slice'
import { productActions } from '../../store/product-slice'

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart)
  const productsList = useSelector((state) => state.products.productsList)
  const dispatch = useDispatch()

  //function to handle order button. Now it does not serve much purpose but can be modified to send data to backend
  const handleOrderClick = () => {
    enqueueSnackbar(`Placed Order`, { variant: 'success' })
    dispatch(cartActions.resetCart())
  }
  //function to handle item removal from cart using '-' button one at a time
  const cartItemRemoveHandler = (item) => {
    //dispatching to update cart slice (quantity and price)
    dispatch(cartActions.removeItemFromCart(item.id))
    item = { ...item, quantity: 1 }
    //dispatching to update product slice (quantity)
    dispatch(productActions.increaseInProductList(item))
  }
  //function to handle item addition to cart using '+' button one at a time
  const cartItemAddHandler = (item) => {
    const currentProductIndex = productsList.findIndex(
      (product) => product.id === item.id
    )
    const currentProduct = productsList[currentProductIndex]
    //checking if any quantity is available
    if (currentProduct.quantity === 0) {
      enqueueSnackbar(`Cannot add. Out of stock`, {
        variant: 'warning',
      })
    } else {
      item = { ...item, quantity: 1 }
      //dispatching to update product slice (quantity)
      dispatch(productActions.decreaseInProductList(item))
      //dispatching to update cart slice (quantity and price)
      dispatch(cartActions.addItemToCart(item))
    }
  }
  //function to handle complete removal of product from cart using delete button
  const deleteCartItem = (item) => {
    //dispatching to update cart slice (quantity and price)
    dispatch(cartActions.deleteItemFromCart(item.id))
    //dispatching to update product slice (quantity)
    dispatch(productActions.increaseInProductList(item))
  }

  const cartItems = (
    <ul className={styles['cart-items']}>
      {/**mapping through the cart to display each individual item */}
      {items.map((item) => (
        <CartItem
          key={item.id}
          img={item.imageURL}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item)}
          onAdd={() => cartItemAddHandler(item)}
          onDelete={() => deleteCartItem(item)}
        />
      ))}
    </ul>
  )

  return (
    <div className={styles['shopping-container']}>
      <p className={styles.heading}>Shopping Cart</p>
      {cartItems}
      {items.length > 0 ? (
        <>
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>Rs.{totalPrice}</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.button} onClick={handleOrderClick}>
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className={styles['no-items']}>
          No items in Cart. Click
          <Link to='/' className={styles.link}>
            here
          </Link>{' '}
          to continue shopping
        </div>
      )}
    </div>
  )
}

export default Cart
