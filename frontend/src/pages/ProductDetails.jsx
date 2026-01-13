import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle, FaTimesCircle, FaExternalLinkAlt, FaStar, FaRobot } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Avis
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewMessage, setReviewMessage] = useState('');
    const { user } = useContext(AuthContext);

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(data);
            setLoading(false);
        } catch (err) {
            setError("Erreur chargement produit");
            setLoading(false);
        }
    };

    useEffect(() => { fetchProduct(); }, [id]);

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`http://localhost:5000/api/products/${id}/reviews`, { rating, comment }, config);
            setReviewMessage('Avis ajouté !');
            setComment('');
            fetchProduct(); // Recharger pour voir le nouvel avis
        } catch (err) {
            setReviewMessage(err.response?.data?.message || 'Erreur');
        }
    };

    if (loading) return <div className="container">Chargement...</div>;
    if (error) return <div className="container error">{error}</div>;

    return (
        <div className="container" style={{ marginTop: '20px', marginBottom: '50px' }}>
            <Link to="/" className="btn-back">← Retour</Link>
            <div className="details-grid">
                <div className="details-image" style={{ textAlign: 'center' }}>
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="details-info">
                    <div className="flex-row-spaced">
                        <span className="badge-brand">{product.brand}</span>
                        {product.inStock ?
                            <span className="stock-ok"><FaCheckCircle /> En Stock</span> :
                            <span className="stock-ko"><FaTimesCircle /> Rupture</span>
                        }
                    </div>
                    <h1>{product.title}</h1>
                    <div className="price-box">
                        <span className="big-price">{product.price} TND</span>
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="btn-view-source">
                            Voir sur {product.source} <FaExternalLinkAlt size={12} />
                        </a>
                    </div>
                    <div className="specs-box">
                        <h3>⚙️ Specs</h3>
                        <ul>
                            <li><strong>CPU:</strong> {product.specs?.cpu}</li>
                            <li><strong>GPU:</strong> {product.specs?.gpu}</li>
                            <li><strong>RAM:</strong> {product.specs?.ram}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="reviews-section">
                <h3>📢 Avis & IA</h3>
                {product.reviews.length === 0 && <p>Pas d'avis encore.</p>}
                {product.reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <div className="review-header">
                            <strong>{review.name}</strong>
                            <div className="stars">{[...Array(5)].map((_, i) => <FaStar key={i} color={i < review.rating ? "#ffc107" : "#ddd"} />)}</div>
                        </div>
                        <p>{review.comment}</p>
                        <div className={`ai-badge ${review.verification?.isFake ? 'fake' : 'real'}`}>
                            <FaRobot /> {review.verification?.isFake ? "Suspect (IA)" : "Vérifié par IA"}
                        </div>
                    </div>
                ))}

                <div className="add-review-box">
                    <h4>Donner votre avis</h4>
                    {user ? (
                        <form onSubmit={submitReviewHandler}>
                            {reviewMessage && <div className="info-message">{reviewMessage}</div>}
                            <select value={rating} onChange={e => setRating(e.target.value)}>
                                <option value="5">5 - Excellent</option><option value="4">4 - Très bien</option><option value="3">3 - Moyen</option><option value="2">2 - Passable</option><option value="1">1 - Mauvais</option>
                            </select>
                            <textarea rows="3" value={comment} onChange={e => setComment(e.target.value)} placeholder="Votre commentaire..." required />
                            <button type="submit" className="btn-primary">Publier</button>
                        </form>
                    ) : <Link to="/login" style={{ color: '#0056b3' }}>Connectez-vous pour commenter</Link>}
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;