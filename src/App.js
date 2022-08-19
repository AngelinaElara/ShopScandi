import React from 'react'
import Header from './components/Header'
import MiniCart from './components/MiniCart'
import Home from './components/Home'
import Cards from './components/Cards'
import Card from './components/Card'
import Cart from './components/Cart'
import {Routes, Route} from 'react-router-dom'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {history} from './index'


class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    
    return (
      <Query
        query={gql`
          query Query {
            categories {
              name
              products {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                  id
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }
          }`
        }
      >
        {({loading, error, data}) => {
          if (loading) return
          if (error) return console.log(error)
          return (
            <>
              <Header categories={data.categories} />
              <MiniCart />
              <Routes>
                <Route
                  history={history}
                  path='/'
                  element={<Home product={data.categories[0]} />}
                />
                {data.categories.map((category, index) => (
                  <>
                    <Route
                      history={history}
                      path={`/${category.name}`}
                      element={<Cards category={category} />}
                      key={index}
                    />
                    {category.products.map((product, index) => (
                      <Route
                        history={history}
                        path={`/${category.name}/${product.id}`}
                        element={<Card product={product} onAddInCart={this.addToOrder} />}
                        key={index}
                      />
                    ))}
                  </>
                ))}
                  
                  <Route history={history} path='/cart' element={<Cart />} />
                </Routes>
              </>
          )
        }}
      </Query>
    )
  }
}

export default App