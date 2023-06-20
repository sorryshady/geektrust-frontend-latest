import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProducts } from './store/product-actions'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainHeader from './components/Layout/MainHeader'
import Cart from './components/Cart/Cart'
import Layout from './components/UI/Layout'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <Router>
      <div className='App'>
        <MainHeader />
        <Routes>
          {/*Route for product page/main page*/}
          <Route path='/' element={<Layout />} />
          {/*Route for cart page*/}
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
