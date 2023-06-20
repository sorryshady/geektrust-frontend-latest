import { productActions } from '../store/product-slice'
//helper function to apply search keyword filtering
export const searchFilterProducts = (search, catalogue, dispatch) => {
  const searchKeywords = search.toLowerCase().split(' ')
  const filteredItems = catalogue.filter((item) => {
    const itemKeywords = `${item.name} ${item.color} ${item.type}`.toLowerCase()
    const hasSearchKeywords = searchKeywords.every((keyword) =>
      itemKeywords.includes(keyword)
    )
    return hasSearchKeywords
  })
  dispatch(productActions.setFilteredList(filteredItems))
  return filteredItems
}
//helper function to apply filters
export const applyFiltersToProducts = (filters, item) => {
  const isColorMatch =
    filters.color.length === 0 ||
    filters.color.includes(item.color.toLowerCase())
  const isGenderMatch =
    filters.gender.length === 0 ||
    filters.gender.includes(item.gender.toLowerCase())
  const isTypeMatch =
    filters.type.length === 0 || filters.type.includes(item.type.toLowerCase())
  const isPriceRangeMatch =
    filters.price.length === 0 ||
    filters.price.some((priceRange) => isPriceInRange(item.price, priceRange))
  return isColorMatch && isGenderMatch && isTypeMatch && isPriceRangeMatch
}
//helper function to check if price is within range
const isPriceInRange = (price, priceRange) => {
  const [minPrice, maxPrice] = priceRange.split('-').map(Number)
  return price >= minPrice && price <= maxPrice
}
