import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
            login(data);
            navigate('/');
        } catch (err) { setError(err.response?.data?.message || 'Erreur connexion'); }
    };

    return (
        <div className="form-box">
            <h2 style={{ textAlign: 'center', color: '#0056b3' }}>Connexion</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
                <div className="form-group"><label>Mot de passe</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
                <button type="submit" className="btn-primary">Se connecter</button>
            </form>
            <p style={{ textAlign: 'center' }}>Pas de compte ? <Link to="/register">S'inscrire</Link></p>
        </div>
    );
};
export default Login;