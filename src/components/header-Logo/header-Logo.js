import React, { Component } from 'react';
import Logo from '../../assets/a-logo.png'
import './header-Logo.css'

export class HeaderLogo extends Component {

    render() {
        return (
            <img id="a-logo" src={Logo} className="logo" alt="a-logo" />
        )
    }
}

export default HeaderLogo