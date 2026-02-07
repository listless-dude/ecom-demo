import { useState } from "react";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product) => {
        setCartItems(prev => [...prev, product]);
    };

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-left">
                    <h1>🛒 Product Catalog</h1>
                    <p>Browse available products</p>
                </div>

                <div className="header-actions">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button className="icon-btn cart-btn">
                        🛒
                        {cartItems.length > 0 && (
                            <span className="cart-badge">{cartItems.length}</span>
                        )}
                    </button>
                </div>
            </header>

            <main className="app-content">
                <ProductList
                    searchTerm={searchTerm}
                    onAddToCart={handleAddToCart}
                />
            </main>
        </div>
    );
}

export default App;
