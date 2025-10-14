import React from 'react';
import './App.css';
import img1 from './assets/wc.jpg';
import img2 from './assets/cn.jpg';
import img3 from './assets/dwm.jpg';

function App() {
  const bestSellers = [
    { id: 1, img: img1, title: 'wc', price: '$150' },
    { id: 2, img: img2, title: 'cn', price: '$19.99' },
    { id: 3, img: img3, title: 'dwm', price: '$159.99' },

  ];

  return (
    <div className="App">
      <header>
        <h1 className="header-title">  Online Book Store</h1>
        <form className="search-form" action="search-results.html" method="get">
          <label htmlFor="search-input" className="sr-only">Search for books</label>
          <input type="text" id="search-input" placeholder="Search books..." name="query" />
          <button type="submit" aria-label="Search"><i className="fa fa-search"></i> Search</button>
        </form>
        <nav>
          <a className="contact-link" href="contact.html">Contact Us</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <img src={img1} alt="A stack of diverse books" className="hero-image" />
          <div className="hero-text-overlay">
   

          </div>
        </section>

        <section>
          <h2 className="section-heading">Best Sellers</h2>
          <div className="products-grid">
            {bestSellers.map(product => (
              <div className="product-card" key={product.id}>
                <img src={product.img} alt={`Book cover: ${product.title}`} />
                <h2>{product.title}</h2>
                <p className="price">{product.price}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2023 BOOK: Online Book Store. All rights reserved. Created by 23DS30</p>
      </footer>
    </div>
  );
}

export default App;
