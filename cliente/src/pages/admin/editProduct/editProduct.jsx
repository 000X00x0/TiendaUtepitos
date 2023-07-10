import React from 'react';
import { Product } from './Product';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './editProduct.css';
const URI = 'http://localhost:3001/products/'; // Aquí se hacen las peticiones

export const EditProduct = () => {

    const [products, setProducts] = useState([]); // Aquí se guardan los productos

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => { // Aquí se hace la solicitud
        const res = await axios.get(URI);
        setProducts(res.data);
    };

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>Edit Products</h1>
            </div>
            <div className="products"> 
                {products.map((product) => (
                    <Product data={product} /> // Se muestran todos los productos que están en el arreglo
                ))}
            </div>
        </div>
    );
};
