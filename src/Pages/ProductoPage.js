import React from 'react'

//Components
import Footer from '../Components/Footer/Footer'
import Producto from '../Components/Producto/Producto'

//Redux
import {useSelector} from 'react-redux'

const ProductoPage = () => {

    const messageExito = useSelector(store=>store.app.favorito)

    return (    
        <React.Fragment>
            {
                messageExito && (
                    <div style={{
                        position: 'fixed',
                        top: '9%',
                        
                        transition: '.5s'
                    }} className="alert alert-success">Guardado Correctamente</div>
                )
            }
            <Producto/>

            <Footer/>

        </React.Fragment>
    )
}

export default ProductoPage
