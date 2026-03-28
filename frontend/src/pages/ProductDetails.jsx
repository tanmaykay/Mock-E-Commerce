import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import useCartStore from '../store/useCartStore';
import { Loader2, ArrowLeft, Star, ShoppingCart, CheckCircle, ChevronRight } from 'lucide-react';
import Modal from '../components/Modal';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            const alreadyExists = addToCart(product);
            setAdded(true);
            if (alreadyExists) {
                setModalMsg(`${product.name} quantity increased in your cart!`);
                setIsModalOpen(true);
            }
            setTimeout(() => setAdded(false), 2000);
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (reviewText.trim()) {
            try {
                const res = await api.post(`/products/${id}/reviews`, {
                    user_name: 'Guest User',
                    rating: reviewRating,
                    comment: reviewText
                });
                setProduct({
                    ...product,
                    reviews: [res.data, ...(product.reviews || [])]
                });
                setReviewText('');
            } catch (err) {
                console.error('Error submitting review:', err);
            }
        }
    };

    if (loading) return <div className="loading-container"><Loader2 className="spinner" /></div>;
    if (!product) return <div className="error-container">Product was not found.</div>;

    return (
        <main className="main-content full-width">
            <Modal
                isOpen={isModalOpen}
                title="Cart Update"
                message={modalMsg}
                onConfirm={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
            />

            <div className="breadcrumb">
                <Link to="/">TechStore Home</Link>
                <ChevronRight size={14} />
                <Link to={`/category/${product.category}`}>{product.category}</Link>
                <ChevronRight size={14} />
                <span>{product.name}</span>
            </div>

            <section className="product-details-container">
                <div className="detail-visuals">
                    <img src={product.image_url} alt={product.name} />
                </div>

                <div className="detail-info">
                    <div className="title-section">
                        <h1>{product.name}</h1>
                        <span className="category-tag">{product.category}</span>
                    </div>

                    <div className="rating-row">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} fill={i < Math.round(product.average_rating) ? "#ff9900" : "#e2e8f0"} stroke="none" size={18} />
                            ))}
                        </div>
                        <span className="rating-count">{product.average_rating} ({product.reviews?.length || 0} Customer Reviews)</span>
                    </div>

                    <div className="price-section">
                        <span className="tech-price">$<span className="big">{Math.floor(product.price)}</span>.{(product.price % 1).toFixed(2).split('.')[1]}</span>
                        <span className="shipping">FREE Delivery with Tech Prime</span>
                    </div>

                    <div className="inventory">
                        {product.stock > 0 ? (
                            <span className="in-stock">Available in stock.</span>
                        ) : (
                            <span className="out-of-stock">Out of stock.</span>
                        )}
                    </div>

                    <p className="product-desc">{product.description}</p>

                    <div className="action-buttons">
                        <button
                            className={`tech-btn prime ${added ? 'success' : ''}`}
                            onClick={handleAddToCart}
                            disabled={product.stock === 0 || added}
                        >
                            {added ? <CheckCircle size={20} /> : <ShoppingCart size={20} />}
                            {added ? "Added!" : "Add to Cart"}
                        </button>
                    </div>
                </div>

                <div className="review-hub">
                    <h2>Community Feedback</h2>

                    <div className="add-review">
                        <h3>Write a review</h3>
                        <p>Share your experience with the TechStore community</p>
                        <form onSubmit={submitReview}>
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className="star-input"
                                        fill={reviewRating >= star ? "#ff9900" : "#e2e8f0"}
                                        stroke="none"
                                        size={24}
                                        onClick={() => setReviewRating(star)}
                                    />
                                ))}
                            </div>
                            <textarea
                                placeholder="What did you like or dislike?..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                            <button type="submit" className="submit-btn" style={{ background: 'var(--tech-yellow)' }}>Submit Review</button>
                        </form>
                    </div>

                    <div className="customer-reviews">
                        {product.reviews?.map((review) => (
                            <div key={review.id} className="review-item">
                                <div className="user-info">
                                    <div className="avatar"></div>
                                    <span>{review.user_name}</span>
                                </div>
                                <div className="review-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} fill={i < review.rating ? "#ff9900" : "#e2e8f0"} stroke="none" size={14} />
                                    ))}
                                    <strong>{review.rating}.0 out of 5 stars</strong>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                <span className="review-date">TechStore Verified · {new Date(review.created_at).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductDetails;
