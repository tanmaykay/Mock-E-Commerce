import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import Modal from './Modal';

const ProductCard = ({ product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const handleAddToCart = (e) => {
        e.preventDefault();
        const wasIn = addToCart(product);
        if (wasIn) {
            setModalMsg(`${product.name} quantity increased in your TechStore cart!`);
        } else {
            setModalMsg(`${product.name} added to your TechStore cart!`);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="product-card tech-style">
            <Modal
                isOpen={isModalOpen}
                title="Cart Update"
                message={modalMsg}
                onConfirm={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
            />

            <Link to={`/product/${product.id}`} className="image-wrapper">
                <img src={product.image_url} alt={product.name} />
            </Link>
            <div className="product-info">
                <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
                <div className="rating">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} fill={i < Math.round(product.average_rating) ? "#febd69" : "#e2e8f0"} stroke="none" size={14} />
                    ))}
                    <span className="rating-count">{product.average_rating}</span>
                </div>
                <div className="price-row">
                    <span className="amazon-price">$<span className="big">{Math.floor(product.price)}</span>.{(product.price % 1).toFixed(2).split('.')[1]}</span>
                </div>
                <div className="tech-prime">
                    <span>Tech Prime</span>
                    <span className="shipping">FREE Delivery</span>
                </div>
                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
