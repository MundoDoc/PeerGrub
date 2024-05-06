import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import './index.css';
import Logo from '../../Assets/Logo.png';
import SideCart from '../SideCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Tabs, Tab } from '@mui/material';
import ImagePopup from '../ImagePopup';
import SchoolMap from "../../Assets/SchoolMap.png"

function Navigation() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [value, setValue] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    let navigate = useNavigate();
    const location = useLocation();
    
    const stopTab = () => {
        setValue(0);
    }

    const closePopup = () => setShowPopup(false);

    const showImagePopup = () => setShowPopup(true);

    useEffect(() => {
        if(location.pathname == "/"){
            setValue(0);
            handleChange();
        }
        console.log(location.pathname)
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/listings');
                break;
            case 2:
                navigate('/about');
                break;
            case 3:
                if(localStorage.getItem('access')===null){
                    navigate('/login');
                }else{
                    navigate('/profile');
                }
                break;
            default:
                navigate('/');
        }

    };

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <div>
            <nav className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container-fluid">
                    {/* Logo */}
                    <a className="navbar-brand" href="/" onClick={stopTab}><img src={Logo} alt="Logo" style={{ width: '50px' }} />Peer Grub</a>
                    
                    {/* Links and SideCart */}
                    <div className={`${isCollapsed ? 'collapsed' : ''}`}>
                        <ul className="navbar-nav">
                            {/* Collapsible items */}
                            <div className={`collapse-content ${isCollapsed ? 'hide' : 'show'}`}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Map" onClick={showImagePopup}/>
                                    <Tab label="Listings" />
                                    <Tab label="About" />
                                    {localStorage.getItem('access') === null && (
                                        <Tab label="Signup/Login" />
                                    )}
                                    {localStorage.getItem('access')!== null && (
                                        <Tab label="Profile" />
                                    )}
                                </Tabs>
                            </div>
                                            {/* Toggler Button */}
                            <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                                <MenuIcon />
                            </button>
                            {/* Always visible item */}
                                <a className='nav-item'><SideCart /></a>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* {localStorage.getItem('access') != null && (
                <div id="confPassword">
                <h1>Hello</h1>
                </div>
                )} */}
            <div className={`newCollapse ${isCollapsed ? 'hide' : 'show'}`}>
                <ul className="navbar-nav newNav">
                    <button className="nav-item navUnique navBottom" onClick={() =>{ setIsCollapsed(true); navigate('/listings')}}>
                        <a href="#" className="nav-link">Listings</a>
                    </button>
                    <button className="nav-item navUnique navBottom" onClick={() =>{ setIsCollapsed(true); navigate('/about')}}>
                        <a href="#" className="nav-link">About</a>
                    </button>
                    {localStorage.getItem('access') === null && (
                        <button className="nav-item navUnique navBottom" onClick={() =>{ setIsCollapsed(true); navigate('/login')}}>
                        <a href="#" className="nav-link">Login/Signup</a>
                    </button>
                    )}
                    {localStorage.getItem('access')!== null && (
                        <button className="nav-item navUnique navBottom" onClick={() =>{ setIsCollapsed(true); navigate('/profile')}}>
                        <a href="#" className="nav-link">Profile</a>
                    </button>
                    )}
                </ul>
            </div>
            <div className={`opacBack ${isCollapsed ? 'hide' : 'show'}`} onClick={() =>{ setIsCollapsed(true) }}></div>
            {showPopup && <ImagePopup imageUrl={SchoolMap} onClose={closePopup} />}
        </div>
    );
}

export default Navigation;