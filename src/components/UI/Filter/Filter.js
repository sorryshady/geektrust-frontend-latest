import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Filter.module.css'
import { filterActions } from '../../../store/filter-slice'

const Filter = (props) => {
  const { type, values, name } = props
  const filters = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  //function to handle changes in checkboxes
  const handleCheckboxChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case 'color':
        dispatch(filterActions.toggleColor({ color: value }))
        break
      case 'gender':
        dispatch(filterActions.toggleGender({ gender: value }))
        break
      case 'type':
        dispatch(filterActions.toggleType({ type: value }))
        break
      case 'price':
        dispatch(filterActions.togglePrice({ price: value }))
        break
      default:
        break
    }
  }

  return (
    <div className={styles.filter}>
      <div className={styles.name}>{name}</div>
      <div className={styles.horizontalRule}></div>
      {values.map((item) => (
        <div className={styles.checkbox} key={item}>
          <input
            className={styles.input}
            id={item}
            type='checkbox'
            name={type}
            value={item}
            onChange={handleCheckboxChange}
            checked={filters[type].includes(item)}
          />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </div>
  )
}

export default Filter
