import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class MiniCart extends React.Component {
  constructor(props) {
    super(props)
  }

  className = 'miniCart'

  increment = (id) => {
    this.props.incrementQunatity(id)
  }

  decrement = (id) => {
    this.props.decrementQunatity(id)
  }

  handleBtnAttrClick = (event) => {
    const $targetDiv = Array.from(event.target.closest('div').children)
    $targetDiv.forEach(btn => btn.classList.remove('active'))
    event.target.classList.add('active')
  }


  handleViewBtnClick = () => {
    const miniCart = document.querySelector('.miniCart')
    miniCart.classList.remove('active')
  }

  render() {
    let tax = this.props.cartItems.reduce((a, b) => {return Math.round(a + (b.quantity * b.prices[0].amount) * 0.21)}, 0)
    let total = this.props.cartItems.reduce((a, b) => {return Math.round(a + (b.quantity * b.prices[0].amount))}, 0) + tax

    return (
      <>
        {this.props.cartItems.length
            ? <div className={this.className}>
              <div className={`${this.className}__info`}>
                <div className={`${this.className}__title`}>
                  <h2>My Bag,</h2> <p>{this.props.cartItems.length} items</p>
                </div>
                <ul className={`${this.className}__list`}>
                  {this.props.cartItems.map((item, index) => (
                    <li className={`${this.className}__item`} key={index}>
  
                      {/* Item description (Brand, Name, Attributes) */}
  
                      <div className={`${this.className}__description`}>
                        <h2 className={`${this.className}__brand`}>{item.brand}</h2>
                        <p className={`${this.className}__nameProduct`}>{item.name}</p>
                        <p className={`${this.className}__price`}>{item.prices[0].currency.symbol} {item.prices[0].amount}</p>
                        {item.attributes.map((attribute, index) => (
                          <div className={`${this.className}__attributes`} key={attribute.id}>
                            {attribute.name === 'Color'
                              ? <>
                                <p>
                                  {attribute.name}
                                </p>
  
                                <div
                                  className={`${this.className}__btns`}
                                  id={attribute.id}
                                >
                                  {attribute.items.map(attr => {
                                    return (
                                      <button
                                        key={attr.id}
                                        className={item.attributeSet[attribute.name] === attr.displayValue ? `${this.className}__btn color active` : `${this.className}__btn color`}
                                        id={attr.id}
                                        onClick={this.handleBtnAttrClick}
                                        style={attr.id === 'White' ? {background: `${attr.value}`, border: '1px solid #000'} : {background: `${attr.value}`}}
                                      >
                                      </button>
                                    )
                                  }
                                  )}
                                </div>
                              </>
                              : <>
                                <p>
                                  {attribute.name}
                                </p>
  
                                <div
                                  className={`${this.className}__btns`}
                                  id={attribute.id}
                                >
                                  {attribute.items.map((attr) => {
                                    return (
                                      <button
                                        key={attr.id}
                                        className={item.attributeSet[attribute.name] === attr.displayValue ? `${this.className}__btn active` : `${this.className}__btn`}
                                        id={attr.id}
                                        onClick={this.handleBtnAttrClick}
                                      >
                                        {attr.displayValue}
                                      </button>
                                    )
                                  }
                                  )}
                                </div>
                              </>
                            }
                          </div>
                        ))}
                      </div>
  
                      {/* Item counter */}
                      <div className={`${this.className}__counter`}>
                        <button
                          onClick={() => {this.increment(item.id)}}
                          className={`${this.className}__increment`}
                        >
                          <span></span>
                        </button>
                        <div className={`${this.className}__quantity`}>{item.quantity}</div>
                        <button
                          onClick={() => {this.decrement(item.id)}}
                          className={`${this.className}__decrement`}
                        >
                          <span></span>
                        </button>
                      </div>
  
                      {/* Item photos */}
                      <div className={`${this.className}__photo`}>
                        <img
                          src={item.gallery[0]}
                          alt='Product photo'
                        />
                      </div>
                    </li>
                  ))}
                </ul>
  
                <div className={`${this.className}__total`}>
                  <p>Total:</p>
                  <p> {this.props.cartItems[0].prices[0].currency.symbol} {total} </p>
                </div>
  
              </div>
  
  
              <div className={`${this.className}__infoBtns`}>
                <Link
                  to='/cart'
                  className={`${this.className}__view`}
                  onClick={this.handleViewBtnClick}
                >
                  VIEW BAG
                </Link>
                <button className={`${this.className}__check`}>CHECK OUT</button>
              </div>
            </div>
          : <div className={this.className}>
              <div className={`${this.className}__info`}>
                <div className={`${this.className}__title`}>
                  <h2>My Bag,</h2> <p>{this.props.cartItems.length} items</p>
                </div>
              <p className={`${this.className}__add`}>There are no items in the cart...</p>
              </div>
              <div className={`${this.className}__infoBtns`}>
                <Link
                  to='/cart'
                  className={`${this.className}__view`}
                  onClick={this.handleViewBtnClick}
                >
                  VIEW BAG
                </Link>
                <button className={`${this.className}__check`}>CHECK OUT</button>
              </div>
            </div>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.cart)
  return {
    cartItems: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQunatity: (id) => dispatch({type: 'QUANTITY_INC', id}),
    decrementQunatity: (id) => dispatch({type: 'QUANTITY_DEC', id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart)