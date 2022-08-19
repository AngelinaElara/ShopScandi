import React from 'react'
import {connect} from 'react-redux'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.product = props.product
    this.state = {
      attributeSet: {}
    }
  }

  className = 'card'

  handleImageClick = (event) => {
    const mainImage = document.querySelector('.card__img')
    mainImage.src= event.target.src
  }

  handleBtnOrderOutOfStockClick = () => {
    alert('This item is out of stock!')
  }

  handleBtnOrderClick = () => {
    if (this.props.product.attributes.length === Object.keys(this.state.attributeSet).length) {
      const quantity = {quantity: 1}
      const attr = {attributeSet: {...this.state.attributeSet}}
      this.props.addToCart(Object.assign(this.product, attr, quantity))
    } else {
      alert('Please select product attributes')
    }
  }

  render() {
    return (
        <div className={`${this.className}`}>
              <div className={`${this.className}__images`}>
                {this.product.gallery.map((photo, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={photo}
                        alt={`${this.product.name}`}
                        onClick={this.handleImageClick}
                      />
                    </div>
                  )
                })}
              </div>
        
              <div className={`${this.className}__info`}>

                <div className={`${this.className}__mainImage`}>
                  <img
                    src={this.product.gallery[0]}
                    alt={`${this.product.name}`}
                    className={`${this.className}__img`}
                  />
                </div>

                <div>
                  <h2 className={`${this.className}__title`}>{this.product.brand}</h2>
                  <h3 className={`${this.className}__productName`}>{this.product.name}</h3>

                  <div className={`${this.className}__attributes`}>
                    {this.product.attributes.map(attribute => {
                      return (
                        <>
                          {attribute.name === 'Color'
                            ?
                            <>
                              <p>
                                {attribute.name}
                              </p>

                              <div
                                className={`${this.className}__btns`}
                                id={attribute.id}
                              >
                                {attribute.items.map(item => {
                                  return (
                                    <button
                                      key={item.id}
                                      className={this.state.attributeSet[attribute.name] === item.displayValue
                                        ? `${this.className}__btn color active`
                                        : `${this.className}__btn color`}
                                      id={item.id}
                                      onClick={() => this.setState({attributeSet: {...this.state.attributeSet, [attribute.name]: item.displayValue}})}
                                      style={item.id === 'White' ? {background: `${item.value}`, border: '1px solid #000'}: {background: `${item.value}`}} 
                                    >
                                    </button>
                                  )
                                }
                                )}
                              </div>
                            </>
                            :
                            <>
                              <p>
                                {attribute.name}
                              </p>

                              <div
                                className={`${this.className}__btns`}
                                id={attribute.id}
                              >
                                {attribute.items.map(item => {
                                  return (
                                    <button
                                      key={item.id}
                                      className={this.state.attributeSet[attribute.name] === item.displayValue ? `${this.className}__btn active` : `${this.className}__btn`}
                                      id={item.id}
                                      onClick={() => this.setState({attributeSet: {...this.state.attributeSet, [attribute.name]: item.displayValue}})}
                                    >
                                      {item.displayValue}
                                    </button>
                                  )
                                }
                                )}
                              </div>
                            </>
                          }
                        </>
                      )
                    })}

                  </div>

                  <div className={`${this.className}__price`}>
                    <h2>Price:</h2>
                    <p>{this.product.prices[0].currency.symbol} {this.product.prices[0].amount}</p>
                  </div>
                  
                  {this.product.inStock
                    ? <button
                        className={`${this.className}__orderBtn`}
                        data-id={`${this.product.id}`}
                        onClick={this.handleBtnOrderOutOfStockClick}
                      >
                        <p>Add to cart</p>
                      </button>
                    : <button
                        className={`${this.className}__orderBtn`}
                        data-id={`${this.product.id}`}
                        onClick={this.handleBtnOrderClick}
                        disabled={this.props.cartItems.find(item => item.id === this.product.id ? true : false)}
                      >
                        <p>Add to cart</p>
                      </button>
                  }
                  
                  <div
                    className={`${this.className}__description`}
                    dangerouslySetInnerHTML={{__html: this.product.description}}
                  />
                </div>
              </div>
        </div>
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
    addToCart: (product) => dispatch({type: 'ADD_TO_CART', product})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)


      