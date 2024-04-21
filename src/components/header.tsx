import React from 'react';
import './header.css';
import { Image } from 'antd';
import { useLocation } from 'react-router-dom';
const Header: React.FC = () => {
    const { pathname } = useLocation();
    return (
        <div className='head-container'>
            <header>
                <div className="logo">
                    {/* <Image
                        width={20}
                        src='loo-removebg-preview.png'
                    /> */}
                </div>
                <nav>
                    <ul>
                        <li><a href="/home" className={pathname === '/home' ? 'active' : ''}>Home</a></li>
                        <li><a href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>Dashboard</a></li>
                        <li><a href="/billing" className={pathname === '/billing' ? 'active' : ''}>Billing</a></li>
                        <li><a href="/">Logout</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;
