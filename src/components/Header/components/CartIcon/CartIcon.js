import React from 'react'
import {ReactComponent as CartImage} from '../../../../ui/CartIcon.svg'
import {connect} from 'react-redux'

class CartIcon extends React.Component {
  constructor(props) {
    super(props)
    this.className = props.className
  }

  quantityItemsInCart = () => {
    let items = 0
    if (this.props.cartItems.length) {
      let quantity = this.props.cartItems.reduce((a, b) => {
          return a + b.quantity
      }, 0)
      return quantity
    } else {
      return items
    }
  }

  handleLogoBtnClick = () => {
    const miniCart = document.querySelector('.miniCart')
    miniCart.classList.toggle('active')
  }

  render() {
    return (
      <>
        <button
          className={`${this.className}__cart`}
          onClick={this.handleLogoBtnClick}
        >
          <span className={`${this.className}__quantity`}>{this.quantityItemsInCart()}</span>
          <CartImage />
        </button>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart
  }
}

export default connect(mapStateToProps, null)(CartIcon)