import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, Search, Moon, Sun } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const cart = useCartStore((state) => state.cart);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const { isDarkMode, toggleTheme } = useTheme();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <nav className="navbar tech-style">
            <div className="nav-content">
                <Link to="/" className="logo">
                    <ShoppingBag size={28} />
                    <span>Tech<strong>Store</strong></span>
                </Link>

                <div className="nav-links">
                    <Link to="/category/Hardware">Hardware</Link>
                    <Link to="/category/Software">Software</Link>
                    <Link to="/category/Firmware">Firmware</Link>
                </div>

                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        type="text"
                        placeholder="Search TechStore products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit"><Search size={18} /></button>
                </form>

                <div className="nav-actions">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Link to="/cart" className="cart-icon">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
