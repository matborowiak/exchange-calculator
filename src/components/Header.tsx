import React from 'react'

import logo from '../assets/logo_revolut.png'
import './Header.scss'

const Header = () => (
  <header className="Header">
    <img
      data-testid="logo"
      className="Header__logo"
      alt="Logo Revolut"
      src={logo}
    />
  </header>
)

export default Header
