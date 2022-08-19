import React from 'react'
import {NavLink} from 'react-router-dom'


class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.className = props.className
    this.categories = props.categories
  }

  onButtonClick = (event) => {
    const target = event.currentTarget
    const $title = document.querySelector('cards__title')

    $title.textContent = target.textContent.charAt(0).toUpperCase() + target.textContent.slice(1).toLowerCase()
  }

  render() {
    return (
      <>
        <nav className={`${this.className}__nav`}>
          {this.categories.map((category, index) => (
            <NavLink
              to={`/${category.name}`}
              className={`${this.className}__button`}
              onClick={this.onButtonClick}
              key={index}
            >
              {category.name}
            </NavLink>
          ))}
        </ nav>
      </>
    )
  }
}

export default Navigation