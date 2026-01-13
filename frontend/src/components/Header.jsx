import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header>
            <div className="container header-flex">
                <Link to="/" className="logo">💻 TechCheck <span style={{ color: '#ffc107' }}>TN</span></Link>
                <nav className="nav-links">
                    {user ? (
                        <>
                            <span>Bonjour, {user.name}</span>
                            <button onClick={logout} className="btn-logout"><FaSignOutAlt /> Déco</button>
                        </>
                    ) : (
                        <Link to="/login"><FaUser /> Connexion</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};
export default Header;