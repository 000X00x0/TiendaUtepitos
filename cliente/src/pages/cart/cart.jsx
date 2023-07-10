import React, {useContext} from 'react';
import { ShopContext } from "../../context/shop-context"; // Importamos el contexto
import { CartItem } from './cart-item'; // Importamos el componente CartItem para cada elemento en el carrito
import "./cart.css"; // Importamos el archivo CSS para los estilos
import { useNavigate } from 'react-router-dom'; // Importamos el hook useNavigate para la navegación
import axios from 'axios'; // Importamos axios para hacer peticiones al servidor
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'https://tienda2-0-blush.vercel.app/products/'; // Ruta base para las peticiones al servidor

export const Cart = () => {
    const context = useContext(ShopContext); // Obtenemos el contexto de la tienda
    const { cartItems, getTotalCartAmount } = useContext(ShopContext); // Obtenemos los elementos del carrito y la función para obtener el total de la compra
    const totalAmount = getTotalCartAmount(); // Obtenemos el total de la compra
    const navigate = useNavigate(); // Utilizamos el hook useNavigate para la navegación

    const [products, setProducts] = useState([]); // Estado para almacenar los productos

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => { // Función para obtener los productos del servidor
        const res = await axios.get(URI); // Realizamos una petición GET al servidor
        setProducts(res.data); // Actualizamos el estado con los productos obtenidos
    };

    const buy = async (e) => { // Función para procesar el pago y redirigir al portal de pago
        e.preventDefault();
        console.log(cartItems);
        await axios.put(URI + 'buy', { // Realizamos una petición PUT al servidor para procesar el pago
            "1": cartItems[1], // Enviamos los elementos del carrito al servidor
            "2": cartItems[2],
            "3": cartItems[3],
            "4": cartItems[4],
            "5": cartItems[5],
            "6": cartItems[6],
            "7": cartItems[7],
            "8": cartItems[8],
            "9": cartItems[9],
            "10": cartItems[10],
        })
        .then((res) => {
            alert(res);
        }).catch((err) => {
            alert(err.message);
        });
        context.setPayAumount(totalAmount); // Antes de redirigir al portal de pago, actualizamos el contexto con el valor de la compra
        navigate('/stripe'); // Navegamos hacia la página de pago
    };

    return (
        <div className="cart">
            <div> 
                <h1> Your Cart Items</h1> {/* Título del carrito */}
            </div>
            <div className="cartItems">
                {products.map((product) => { // Mapeamos los productos del carrito
                    if (cartItems[product.id] !== 0) { // Si el producto tiene una cantidad mayor a 0 en el carrito
                        return <CartItem data={product} />; // Renderizamos el componente CartItem para ese producto
                    }
                })}
            </div>
            {totalAmount > 0 ? // Si el total de la compra es mayor a 0
            <div className="checkout">
                <p> Subtotal: ${totalAmount}</p> {/* Muestra el subtotal de la compra */}
                <button onClick={() => navigate ("/shop")}> Continue Shopping</button> {/* Botón para volver a la tienda */}
                <button onClick={buy}> Checkout </button> {/* Botón para procesar el pago */}
            </div>
            : <h1> Your Cart is Empty </h1>} {/* Mensaje si el carrito está vacío */}
        </div>
    )
};
