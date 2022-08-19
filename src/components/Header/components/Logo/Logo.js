import React from 'react'
import {ReactComponent as BrandIcon} from '../../../../ui/BrandIcon.svg'

class Logo extends React.Component {
  constructor(props) {
    super(props)
    this.className = props.className
  }

  onLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  render() {
    return (
      <button
        onClick={this.onLogoClick}
        className={`${this.className}__logo`}
      >
        <BrandIcon />
      </button>
    )
  }
}

export default Logo