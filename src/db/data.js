import ApolloClient from 'apollo-boost'
import {gql, InMemoryCache} from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

export const categories = client
  .query({
    query: gql`
      query Categories {
        categories {
        name
        products {
          id
          name
          gallery
          inStock
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
            symbol
            label
          }
          amount
        }
        brand
      }}
    }`
  })
  // .then(result => console.log(result))

export const category = client
  .query({
    query: gql`
      query Query {
        category {
          products {
          id
          inStock
          name
          gallery
          description
          category
        attributes {
          id
          name
        items {
          displayValue
          value
          id
        }
      type
      }
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      brand
    }
  }
}`
  })
  // .then(result => console.log(result))

export const currency = client
  .query({
    query: gql`
      query Query{
        currencies {
          label
          symbol
        }
      }
    `
  })
  // .then(result => console.log(result))