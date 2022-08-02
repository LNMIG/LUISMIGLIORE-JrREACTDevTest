import React, { Component } from 'react';
import HeaderNavigation from '../header-Navigation/header-Navigation';
import HeaderActions from '../header-Actions/header-Actions';
import HeaderLogo from '../header-Logo/header-Logo';
import './header-Desktop.css';

export class HeaderDesktop extends Component {

    render() {
        return (
            <nav className="headerDesktopContainer">
                <HeaderNavigation />
                <HeaderLogo />
                <HeaderActions />
            </nav>
        )
    }
}

export default HeaderDesktop