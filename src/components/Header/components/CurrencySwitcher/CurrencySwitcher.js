import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props)
    this.className = props.className
  }

  render() {
    return (
      <div className={`${this.className}__currency`}>
        <Query
          query={gql`
            query Query{
            currencies {
            label
            symbol
          }}`}
        >
          {({loading, error, data}) => {
            if (loading) return
            if (error) return console.log(error)
            return (
              <select>
                {data.currencies.map((currency, index) => (
                  <>
                    <option
                      value={currency.symbol}
                      key={index}
                    >
                      {currency.symbol} 
                    </option>
                  </>
                ))}
              </select>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default CurrencySwitcher