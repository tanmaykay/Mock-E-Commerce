import React, { useState } from 'react';
import useCartStore from '../store/useCartStore';
import { Trash2, ShoppingBag, CreditCard, ArrowLeft, Loader2, CheckCircle, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCartStore();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const openDeleteModal = (item) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            // Bypass the store's window.confirm by calling a filter-based remove locally if needed 
            // but the store already has confirm. I'll modify store's removeFromCart to NOT use confirm.
            removeFromCart(itemToDelete.id);
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        }
    };

    const handleCheckout = () => {
        setIsCheckoutModalOpen(true);
    };

    const confirmCheckout = () => {
        setIsCheckoutModalOpen(false);
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
            clearCart();
        }, 2000);
    };

    if (success) return (
        <div className="success-container tech-style">
            <CheckCircle size={64} color="#48bb78" />
            <h1>Order Successful!</h1>
            <p>Thank you for shopping at TechStore. Your technology items are being prepared.</p>
            <Link to="/" className="amazon-btn secondary">Continue Exploring</Link>
        </div>
    );

    if (cart.length === 0) return (
        <div className="empty-cart-container tech-style">
            <ShoppingBag size={64} color="#e2e8f0" />
            <h1>Your Shopping Cart is empty.</h1>
            <p>TechStore cart is ready for your hardware and software needs.</p>
            <Link to="/" className="amazon-btn secondary">Shop Now</Link>
        </div>
    );

    return (
        <main className="main-content full-width amazon-layout">
            <Modal
                isOpen={isDeleteModalOpen}
                type="confirm"
                title="Remove Item"
                message={`Are you sure you want to remove ${itemToDelete?.name} from your cart?`}
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />

            <Modal
                isOpen={isCheckoutModalOpen}
                type="confirm"
                title="Secure Checkout"
                message="Ready to proceed with your TechStore order?"
                onConfirm={confirmCheckout}
                onCancel={() => setIsCheckoutModalOpen(false)}
            />

            <div className="cart-header">
                <h1>TechStore Cart</h1>
                <p>Price</p>
            </div>

            <div className="cart-container">
                <div className="cart-list">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-row">
                            <div className="cart-product">
                                <img src={item.image_url} alt={item.name} />
                                <div className="product-details">
                                    <h3>{item.name}</h3>
                                    <span className="stock-label">Ships from TechStore</span>
                                    <span className="prime-label">Tech Prime</span>
                                    <div className="quantity-controls">
                                        <div className="qty-picker">
                                            <span>Qty:</span>
                                            <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                                            <span className="qty">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                                        </div>
                                        <div className="sep">|</div>
                                        <button onClick={() => openDeleteModal(item)} className="delete-btn">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-price">
                                <strong>${item.price.toFixed(2)}</strong>
                            </div>
                        </div>
                    ))}
                    <div className="cart-subtotal">
                        Subtotal ({cart.length} item): <strong>${total.toFixed(2)}</strong>
                    </div>
                </div>

                <div className="cart-checkout-panel">
                    <div className="checkout-content">
                        <div className="free-shipping">
                            <CheckCircle size={14} color="#067D62" />
                            <span>Your order qualifies for <strong>FREE Tech Shipping</strong>.</span>
                        </div>
                        <div className="total-display">
                            Subtotal ({cart.length} items): <strong>${total.toFixed(2)}</strong>
                        </div>
                        <button
                            className="checkout-proceed-btn"
                            onClick={handleCheckout}
                            disabled={submitting}
                        >
                            {submitting ? <Loader2 className="spinner-small" /> : 'Proceed to Checkout'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
