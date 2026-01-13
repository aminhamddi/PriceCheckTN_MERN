import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data.products);
                setLoading(false);
            } catch (err) {
                setError("Impossible de contacter le serveur (Vérifiez le port 5000)");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="container" style={{ marginTop: '20px' }}>Chargement...</div>;
    if (error) return <div className="container error" style={{ marginTop: '20px' }}>{error}</div>;

    return (
        <div className="container">
            <h2 style={{ borderLeft: '4px solid #0056b3', paddingLeft: '10px', margin: '20px 0' }}>Nos Laptops</h2>
            <div className="grid">
                {products.map(product => (
                    <div key={product._id} className="card">
                        <img src={product.image} alt={product.title} />
                        <div className="card-body">
                            <h4 style={{ margin: '0 0 10px', fontSize: '1rem' }}>{product.title}</h4>
                            <p style={{ fontSize: '0.8rem', color: '#666' }}>{product.specs.cpu} / {product.specs.gpu}</p>
                            <div className="price">{product.price} TND</div>
                            <Link to={`/product/${product._id}`} className="btn-view">Voir Détails</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;