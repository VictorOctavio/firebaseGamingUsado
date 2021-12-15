import React from 'react'
import './producto.css'

import {FaWhatsapp, FaPhoneAlt} from 'react-icons/fa'
import Relacionado from './Relacionado'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {GetProductoAction, FavoritosAction} from '../../Redux/appDuck'

import '../../Assets/Spiner.css'

const Producto = () => {

    const dispatch = useDispatch()

    const useActive = useSelector(store => store.user.active)
    const producto = useSelector(store => store.app.producto)

    React.useEffect(() => {
        dispatch(GetProductoAction())
    }, [dispatch])
 

    //HANDLE ADD FAVORITO
    const handleFavorito = (producto) => {
        if(!useActive){
            alert(`Necesitas ingresar sesión para guardar ${producto.producto}`)
        }
        dispatch(FavoritosAction(producto))
    }

    return (
        
        <div className="producto-container">
            {
            producto !== null ? (
            <>
            <div className="c-producto">
                <div className="row producto">
 
                     <div className="p-image col-12 col-lg-5">
                         <img src={producto.productoIMG} alt="producto"/>
                     </div>
 
                     <div className="p-description col-12 col-md-7">
                         <div className="p-texto">
                             <h3>{producto.producto}</h3>
                             <strong>{producto.categoria}</strong>
                         </div>
 
                         <div className="p-detalles">
                             <div className="detalles">
                                 <h6>Descipcion del vendedor</h6>
                                 <p>{producto.descripcion}</p>
                             </div>
                             <strong>${producto.precio}</strong>
                         </div>
 
                         <div className="p-contacto">
                             <div className="contac">
                             <strong>Contacto: {producto.email}</strong>
                             <p className="text-light mb-0"><FaPhoneAlt/> {producto.whatsapp}</p>
                             </div>
                             
                             <div className="">
                             <button className="btn btn-warning" onClick={() => handleFavorito(producto)}>GUARDAR</button>
                             <a className="btn btn-outline-success mx-2" href={`https://api.whatsapp.com/send?phone=54${producto.whatsapp}&text=Preguntar%20Sobre%20${producto.producto}`} target="_black"><FaWhatsapp/> Contactarse</a>
                             </div>
                             
                         </div>
                     </div>
 
                 </div>
             </div>
             <Relacionado 
                produc={producto.categoria}
                id={producto.id}
            /> 
            </>
            ): <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
           
             
           
            
        </div>
    )
}

export default Producto
