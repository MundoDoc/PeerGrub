import React from 'react';
import './index.css';
import Logo from '../../Assets/Logo.png';
import Cart from '../../Assets/Cart.png';

function Navigation() {
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            alert("You pressed enter! This does nothing for now.");
        }
    };

    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                {/* Group left-aligned items */}
                <div className="nav-left">
                    <a className="navbar-brand" href="/"><img src={Logo} alt="Logo" style={{ width: '50px' }} />Peer Grub</a>
                </div>
                
                {/* Place search bar in its own container for easier manipulation */}
                <div className="search-container">
                    <input type="text" placeholder='Search...' onKeyDown={handleEnter} className="search-bar"/>
                </div>
                
                {/* Group right-aligned items */}
                <div className="nav-right">
                    <ul className="navbar-nav">
                        <li className="nav-item navUnique">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li className="nav-item navUnique">
                            <a className="nav-link" href="/cart"><img src={Cart} alt="Cart" style={{ width: '60px' }} /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
