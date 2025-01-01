// src/components/ShopPage.js

import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/PrintfulAPI'; // Importing the function to fetch products from our API service

/**
 * ShopPage Component
 * 
 * This component fetches and displays a list of products from Printful.
 * It handles loading states, error messages, and renders product details.
 */
export default function ShopPage() {
  // State to hold the list of products fetched from the API
  const [products, setProducts] = useState([]);
  
  // State to indicate if the data is currently being fetched
  const [isLoading, setIsLoading] = useState(true);
  
  // State to hold any error messages if fetching products fails
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to check if component is still mounted after async operation

    // Asynchronous function to fetch products from Printful's API
    async function fetchProducts() {
        try {
          // Fetch products using the imported getProducts function
          const productList = await getProducts();
          
          // Only update state if the component is still mounted to avoid updating state of an unmounted component
          if (isMounted) {
            setProducts(productList); // Update the products state with fetched data
            setIsLoading(false); // Turn off loading state
          }
        } catch (error) {
          // If there's an error during fetching, set the error state with the error message
          if (isMounted) {
            setError('Failed to fetch products. Please try again later.');
            setIsLoading(false); // Ensure loading state is turned off even on error
          }
        }
      }
  
      // Call the fetch function immediately to start fetching products
      fetchProducts();
  
      // Cleanup function to run when component unmounts to prevent memory leaks
      return () => {
        isMounted = false; // Set to false to indicate the component is not mounted anymore
      };
    }, []); // Empty dependency array means this effect runs only once on mount
  
    // Render different UI based on the state of product fetching
    if (isLoading) {
      return <div>Loading products...</div>; // Show loading message while fetching
    }
  
    if (error) {
      return <div>{error}</div>; // Show error message if fetching products failed
    }
  
    // If no products or error, show no products message
    if (!products || products.length === 0) {
      return <div>No products available.</div>;
    }
  
    // Render the list of products
    return (
      <div className="shop-page">
        <h1>Our Products</h1>
        <ul className="product-list">
          {products.map(product => (
            <li key={product.id} className="product-item">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              {/* Add more product details here, like price, image, etc. */}
            </li>
          ))}
        </ul>
      </div>
    );
  }