import React, { createContext, useState } from 'react';
import axios from 'axios';//se importa axios para generar peticiones al servidor
import { useEffect } from 'react';

export const ShopContext = createContext(null); //contexto de la tienda, funciones y hooks 
const URI = 'http://localhost:3001/products/';//esta sera la ruta a la cual se generaran peticiones en este caso sera para los productos

const getDefaultCart = () => {  // Función para obtener un carrito por defecto con todas las cantidades de productos establecidas en cero
    let cart = {}  // Objeto para almacenar las cantidades de productos del carrito
    for (let i = 1; i < 12; i++) {  // Iteramos desde 1 hasta 11 (12 productos en total)
        cart[i] = 0  // Establecemos la cantidad del producto i en cero
    }
    return cart;  // Retornamos el carrito por defecto con las cantidades de productos establecidas en cero
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());  // Estado para almacenar los productos ingresados en el carrito, inicializado con el carrito por defecto
    const [payAumount, setPayAumount] = useState(0);  // Estado para almacenar el monto total de la compra, inicializado en cero

    const [products, setProducts] = useState([]);  // Estado para almacenar todos los productos obtenidos de la base de datos, inicializado como un arreglo vacío
    useEffect(() => {
        getProducts();  // Obtenemos los productos al cargar el componente
    }, []);

    const [logged, setLogged] = useState(0);  // Estado para verificar si hay un usuario logueado en la página, inicializado en cero
    const loggedChanger = (value) => setLogged(value);  // Función para cambiar el valor del estado 'logged'

    const [admin, setAdmin] = useState(false);  // Estado para verificar si el usuario es un administrador, inicializado en falso
    const AdminChanger = (value) => setAdmin(value);  // Función para cambiar el valor del estado 'admin'

    const getProducts = async () => {  // Función asincrónica para obtener todos los productos de la base de datos
        const res = await axios.get(URI);  // Realizamos una petición GET a la URL especificada para obtener los productos
        setProducts(res.data);  // Actualizamos el estado 'products' con los datos obtenidos de la base de datos
    }

    const getTotalCartAmount = () => {  // Función para obtener el monto total de la compra en el carrito
        let totalAmount = 0;  // Variable para almacenar el monto total, inicializada en cero
        for (const item in cartItems) {  // Iteramos sobre los items del carrito
            if (cartItems[item] > 0) {  // Verificamos si la cantidad del item es mayor a cero
                let itemInfo = products.find((product) => product.id === Number(item));  // Obtenemos la información del producto correspondiente al item
                totalAmount += cartItems[item] * itemInfo.precio;  // Calculamos el subtotal multiplicando la cantidad por el precio del producto
            }
        }
        return totalAmount;  // Retornamos el monto total de la compra
    };

    const addToCart = async (itemId) => {  // Función para agregar un producto al carrito, recibiendo como parámetro el ID del producto
        await axios.get('http://localhost:3001/products/book/'+ itemId + '?f=book')  // Realizamos una petición GET para reservar el producto en el servidor
        .then(({ data }) => {
            data === 'Booked' ? setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 })) : void(0);  // Si el estado retornado es 'Booked', incrementamos la cantidad del producto en el carrito
            data === 'Stockout' ? alert('Empty product') : void(0);  // Si el estado retornado es 'Stockout', mostramos una alerta indicando que el producto está vacío
        })
        .catch(error => {
            console.log(error.message);  // Si ocurre un error, lo mostramos en la consola
        }) 
    };

    const removeFromCart = async (itemId) => {  // Función para remover un producto del carrito, recibiendo como parámetro el ID del producto
        await axios.get('http://localhost:3001/products/book/'+ itemId + '?f=unbook')  // Realizamos una petición GET para cancelar la reserva del producto en el servidor
        .then(({ data }) => {
            data === 'Unbooked' ? setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 })) : void(0);  // Si el estado retornado es 'Unbooked', decrementamos la cantidad del producto en el carrito
        })
        .catch(error => {
            console.log(error.message);  // Si ocurre un error, lo mostramos en la consola
        }) 
    };

    const contextValue = {  // Objeto que contiene todas las funciones y estados que se compartirán en el contexto
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        loggedChanger,
        logged,
        AdminChanger,
        admin,
        payAumount,
        setPayAumount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}  // Renderizamos los componentes hijos que se pasen a través de las propiedades
        </ShopContext.Provider>
    );
};
