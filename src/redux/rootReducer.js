const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
        localStorage.setItem('cart', JSON.stringify([...state.cart, action.product]))
      return {
        ...state,
        cart: [...state.cart, action.product]
      }
    
    case 'REMOVE_CART_ITEM':
      const newBag = state.cart.filter(cartItem => cartItem.id !== action.id)
      localStorage.setItem('cart', JSON.stringify(newBag))

      return {
        ...state,
        cart: newBag
      }
    
    case 'QUANTITY_INC': 
      const newCart = state.cart.map(item => {
        if (item.id === action.id) {
          const newQuantity = item.quantity + 1
          return {
            ...item,
            quantity: Number(newQuantity)
          }
        } else {
          return item
        }
      })

      localStorage.setItem('cart', JSON.stringify(newCart))

      return {
        ...state,
        cart: newCart
      }
    
    case 'QUANTITY_DEC':
      const updateCart = state.cart.map(item => {
        if (item.id === action.id) {
          if (item.quantity > 1) {
            const newQuantity = item.quantity - 1
            return {
              ...item,
              quantity: Number(newQuantity)
            }
          } else return item

        } else return item
      })

      localStorage.setItem('cart', JSON.stringify(updateCart))

      return {
        ...state,
        cart: updateCart
      }
    default:
      return state
  }
}

export default rootReducer