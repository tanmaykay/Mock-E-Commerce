import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Loader2, Filter, Star } from 'lucide-react';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('popularity');
    const [topProductIndex, setTopProductIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = { sortBy };
                if (categoryName) params.category = categoryName;
                if (search) params.search = search;

                const response = await api.get('/products', { params });
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName, search, sortBy]);

    useEffect(() => {
        if (products.length > 0) {
            const timer = setInterval(() => {
                setTopProductIndex((prev) => (prev + 1) % Math.min(products.length, 3));
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [products]);

    if (loading) return (
        <div className="loading-container"><Loader2 className="spinner" /><p>Loading products...</p></div>
    );

    const topProduct = products[topProductIndex];

    return (
        <main className="main-content full-width">
            {topProduct && !search && (
                <div className="top-selling-banner">
                    <div className="banner-content">
                        <span className="badge">FEATURED DEAL</span>
                        <h1>{topProduct.name}</h1>
                        <p>{topProduct.description}</p>
                        <div className="banner-rating">
                            <Star fill="#ff9900" stroke="none" size={16} />
                            <span>{topProduct.average_rating} ({topProduct.popularity} views)</span>
                        </div>
                        <Link to={`/product/${topProduct.id}`} className="view-deal-btn">
                            Explore Now
                        </Link>
                    </div>
                    <div className="banner-image">
                        <img src={topProduct.image_url} alt="Top Selling" />
                    </div>
                </div>
            )}

            <div className="catalog-header">
                <header className="hero">
                    <h1>{categoryName ? `${categoryName} Store` : (search ? `Searching: "${search}"` : "TechStore Best Sellers")}</h1>
                    <p>Total {products.length} products found</p>
                </header>

                <div className="filter-controls">
                    <Filter size={18} />
                    <span>Sort by:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="popularity">Popularity</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            <section className="product-grid">
                {products.length > 0 ? products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                )) : (
                    <p className="no-results">No matches for this query.</p>
                )}
            </section>
        </main>
    );
};

export default CategoryPage;
