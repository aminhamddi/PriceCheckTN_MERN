import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/users', { name, email, password });
            login(data);
            navigate('/');
        } catch (err) { setError(err.response?.data?.message || 'Erreur inscription'); }
    };

    return (
        <div className="form-box">
            <h2 style={{ textAlign: 'center', color: '#0056b3' }}>Inscription</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Nom</label><input type="text" value={name} onChange={e => setName(e.target.value)} required /></div>
                <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
                <div className="form-group"><label>Mot de passe</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
                <button type="submit" className="btn-primary">S'inscrire</button>
            </form>
            <p style={{ textAlign: 'center' }}>Déjà inscrit ? <Link to="/login">Connexion</Link></p>
        </div>
    );
};
export default Register;