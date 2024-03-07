import React from 'react';
import './index.css';
import Logo from '../../Assets/Logo.png';
import SideCart from '../SideCart';

function Navigation() {

    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                {/* Group left-aligned items */}
                <div className="nav-left">
                    <a className="navbar-brand" href="/"><img src={Logo} alt="Logo" style={{ width: '50px' }} />Peer Grub</a>
                </div>
                
                {/* Group right-aligned items */}
                <div className="nav-right">
                    <ul className="navbar-nav">
                        <li className="nav-item navUnique">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li className="nav-item navUnique">
                            <SideCart />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
