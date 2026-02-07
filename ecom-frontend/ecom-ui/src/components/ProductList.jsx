import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import "./ProductList.css";

function ProductList({ searchTerm, onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (filteredProducts.length === 0) return <p>No products found</p>;

    return (
        <>
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div
                        className="product-card square clickable"
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                    >
                        <div className="product-header">
                            <h3 title={product.name}>{product.name}</h3>
                            <span
                                className={`badge ${
                                    product.available ? "available" : "unavailable"
                                }`}
                            >
                {product.available ? "In" : "Out"}
              </span>
                        </div>

                        <p className="category">{product.category}</p>
                        <div className="price">₹{product.price}</div>
                        <div className="footer">Qty: {product.quantity}</div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="close-btn"
                            onClick={() => setSelectedProduct(null)}
                        >
                            ✖
                        </button>

                        <h2>{selectedProduct.name}</h2>
                        <p className="modal-category">{selectedProduct.category}</p>

                        <p className="modal-desc">
                            {selectedProduct.description}
                        </p>

                        <div className="modal-info">
                            <span>💰 ₹{selectedProduct.price}</span>
                            <span>📦 Qty: {selectedProduct.quantity}</span>
                            <span>
                {selectedProduct.available ? "✅ Available" : "❌ Out of stock"}
              </span>
                        </div>
                        <button
                            className="add-to-cart-btn"
                            onClick={() => {
                                onAddToCart(selectedProduct);
                                setSelectedProduct(null);
                            }}
                        >
                            🛒 Add to Cart
                        </button>

                    </div>
                </div>
            )}
        </>
    );
}

export default ProductList;
