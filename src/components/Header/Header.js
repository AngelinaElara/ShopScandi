import React from 'react'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import CurrencySwitcher from './components/CurrencySwitcher'
import Cart from './components/CartIcon'

const className = 'header'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.categories = props.categories
  }


  render() {
    return (
      <header className={className}>
        <Navigation
          className={className}
          categories={this.categories}
        />

        <Logo
          className={className}
        />

        <div className={`${className}__actions`}>
          <CurrencySwitcher
            className={className}
          />

          <Cart
            className={className}
          />
        </div>
      </header>
    )
  }
}

export default Header