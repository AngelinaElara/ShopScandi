import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  
  className = 'cart'

  increment = (id) => {
    this.props.incrementQunatity(id)
  }

  decrement = (id) => {
    this.props.decrementQunatity(id)
  }

  deleteCartItem = (id) => {
    this.props.deleteCartItem(id)
  }

  // function to select attributes
  handleBtnAttrClick = (event) => {
    const $targetDiv = Array.from(event.target.closest('div').children)
    $targetDiv.forEach(btn => btn.classList.remove('active'))
    event.target.classList.add('active')
  }
  
  render() {
    let quantity = this.props.cartItems.reduce((a, b) => {return a + b.quantity}, 0)
    let tax = this.props.cartItems.reduce((a, b) => {return Math.round(a + (b.quantity * b.prices[0].amount) * 0.21)}, 0)
    let total = this.props.cartItems.reduce((a, b) => {return Math.round(a + (b.quantity * b.prices[0].amount)) }, 0) + tax
    return (
      <>
        {this.props.cartItems.length 
          ? <div className={this.className}>
            <h2 className={`${this.className}__title`}>Cart</h2>
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
                              {attribute.items.map(attr => {
                                return (
                                  <button
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

                  <button
                    className={`${this.className}__delete`}
                    onClick={() => this.deleteCartItem(item.id)}
                  >
                    Delete
                  </button>

                  <div className={`${this.className}__info`}>

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
                    <div className={`${this.className}__photos`}>
                      <button
                        className={`${this.className}__btnPhotoChange left`}
                      >
                        {`<`}
                      </button>
                      <img
                        id={`${item.id}__image`}
                        src={item.gallery[0]}
                        alt='Product photo'
                      />
                      <button
                        className={`${this.className}__btnPhotoChange right`}
                      >
                        {`>`}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={`${this.className}__orderInfo`}>
              <div className={`${this.className}__tax`}>
                <span>Tax 21%:</span>
                <span>
                  {this.props.cartItems[0].prices[0].currency.symbol}
                  {tax}
                </span>
              </div>

              <div className={`${this.className}__quantity`}>
                <span>Quantity:</span>
                <span>
                  {quantity}
                </span>
              </div>

              <div className={`${this.className}__totalPrice`}>
                <span>Total:</span>
                <span>
                  {this.props.cartItems[0].prices[0].currency.symbol}
                  {total}
                </span>
              </div>
            </div>

            <button className={`${this.className}__order`}>Order</button>
          </div>
          : <div className={this.className}>
              <h2 className={`${this.className}__title`}>Cart</h2>
            
            <p className={`${this.className}__add`}>There are no items in the cart...</p>
            </div>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQunatity: (id) => dispatch({type: 'QUANTITY_INC', id}),
    decrementQunatity: (id) => dispatch({type: 'QUANTITY_DEC', id}),
    deleteCartItem: (id) => dispatch({type: 'REMOVE_CART_ITEM', id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)