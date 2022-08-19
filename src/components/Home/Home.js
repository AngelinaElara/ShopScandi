import React from 'react'
import {Link} from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.category = props.product
  }

  className = 'cards'

  render() {
    return (
      <div className={this.className}>
        <h1 className={`${this.className}__title`}>{this.category.name}</h1>
        <div className={`${this.className}__list`}>
          {this.category.products.map((product, index) => (
            <>
              <Link
                to={`/${this.category.name}/${product.id}`}
                className={`${this.className}__link`}
                id={product.id}
                key={product.id}
              >
                {product.inStock
                  ? <div className={`${this.className}__image`}>
                    <div className={`${this.className}__sales`}>
                      out of stock
                    </div>
                    <img
                      src={product.gallery[0]}
                      alt={product.name}
                    />
                  </div>
                  : <>
                    <div className={`${this.className}__image`}>
                      <img
                        src={product.gallery[0]}
                        alt={product.name}
                      />
                    </div>
                  </>}

                <div className={`${this.className}__info`}>
                  <h2>{product.name}</h2>
                  <p className={`${this.className}__price`}> {product.prices[0].currency.symbol} {product.prices[0].amount} </p>
                </div >
              </Link >
            </>
          ))}
        </div>
      </div>
    )
  }
}

export default Home