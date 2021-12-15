import React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {SellerAction} from '../../Redux/Admin'

const Seller = () => {
    
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    //activar modo vendedor
    const handleSeller = () => {
        dispatch(SellerAction())
    }

    return (    
        <div style={{
            marginTop: '100px',
            minHeight: '454px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h3 className="text-center">Bienvenido {user.name}, empieza a vender inmediatamente con nosotros</h3>
            <h5 className="text-info">confirme su cuenta de vendedor</h5>
            <button className="btn btn-warning" onClick={handleSeller}>Confirmar AHORA</button>
        </div>
    )
}

export default Seller
