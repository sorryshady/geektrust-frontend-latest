import React, { useState } from 'react'
import styles from './ProductCard.module.css'
import Card from '../../UI/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { cartActions } from '../../../store/cart-slice'
import { productActions } from '../../../store/product-slice'
import ProductItemForm from '../../UI/ProductItemForm/ProductItemForm'

const ProductCard = ({ item }) => {
  const [clicked, setClicked] = useState(false)
  const [count, setCount] = useState(1)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const productsList = useSelector((state) => state.products.productsList)

  //to check if Product Card button was clicked (Select Quantity/Add to Cart)
  const clickHandler = (e) => {
    if (clicked) {
      setClicked(false)
      submitHandler(e)
    } else {
      setClicked(true)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const newItem = productsList.find((product) => product.id === item.id)
    //checking if quantity is zero and modifying message suitably
    const message = !newItem.quantity
      ? 'Out of Stock'
      : `Only ${newItem.quantity} available`
    //checking if required quantity is available
    if (count > newItem.quantity) {
      enqueueSnackbar(`Cannot add ${count} nos. ${message}`, {
        variant: 'warning',
      })
    } else {
      const newItem = { ...item, quantity: count }
      //dispatching to update cart slice(items, quantity and price)
      dispatch(cartActions.addItemToCart(newItem))
      //dispatching to update product slice(quantity)
      dispatch(productActions.decreaseInProductList(newItem))
      enqueueSnackbar('Added to Cart', { variant: 'success' })
    }
    setCount(1)
  }

  const buttonText = clicked ? 'Add to cart' : 'Select Quantity'

  return (
    <div className={styles['product-card']}>
      <Card>
        <img src={item.imageURL} alt={item.name} className={styles.image} />
        <p className={styles.name}>{item.name}</p>
        <p className={styles.price}>{`Rs. ${item.price}`}</p>
        {clicked && (
          <ProductItemForm id={item.id} onClick={setCount} count={count} />
        )}
        <button className={styles['add-to-cart-button']} onClick={clickHandler}>
          {buttonText}
        </button>
      </Card>
    </div>
  )
}

export default ProductCard
