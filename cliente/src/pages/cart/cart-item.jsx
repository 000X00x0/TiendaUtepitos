import React, { useContext } from "react"; // Importamos el hook useContext de react. Para actualizar el estado de un componente funcional
import { ShopContext } from "../../context/shop-context";// Importamos el contexto de la tienda

export const CartItem = (props) => { // Recibimos props como parámetro, que contendrá los datos del producto.
    const { id, nombre, precio, img1 } = props.data; // Con los props recibimos los datos extraidos de los productos y los almacenamos en las variables
    const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);// Extraemos las variables cartItems, addToCart y removeFromCart del contexto. Estas variables contienen los datos del carrito y las funciones para agregar y eliminar elementos del carrito.
    return  (
        <div className="cartItem"> {/* Muestra la imagen del producto, su nombre, precio y proporciona botones para disminuir o aumentar la cantidad del producto en el carrito. */}
            <img src={img1} />{/*se muestra la primera imagen del producto */}
            <div className="description">
                <p> 
                    <b> {nombre} </b>{/*se muestra el nombre del producto */}
                </p>
                <p> ${precio} </p>{/*se muestra el precio del producto */}
                <div className="countHandler">
                    <button onClick={() => removeFromCart(id)}> - </button>{/*utiliza la función removeFromCart pasando el id del producto como argumento para disminuir la cantidad del producto en el carrito.*/}
                    <input value={cartItems[id]} />{/*muestra la cantidad actual del producto en el carrito mediante la propiedad value. */}
                    <button onClick={() => addToCart(id)}> + </button>{/*utiliza la función addToCart pasando el id del producto como argumento para aumentar la cantidad del producto en el carrito. */}
                </div>
            </div>
        </div>
    );
};