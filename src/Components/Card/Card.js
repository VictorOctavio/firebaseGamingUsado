import React from 'react'
import './card.css'

import {withRouter} from 'react-router-dom'

//REDUX
import {useDispatch} from 'react-redux'
import {GetProductoAction} from '../../Redux/appDuck'

const Card = (props) => {

    const dispatch = useDispatch()

    const handleProducto = (item) => {
        props.history.push(`/producto/${item.id}`)
        dispatch(GetProductoAction(item.id))
    }

    return (
        <div className="card">
            <div className="img-div">
                <img className="img-fluid" src={props.item.productoIMG} alt="Cardimagecap" />
            </div>
            <div className="card-body">
                <p className="card-text mb-0">{props.item.producto}</p>
            </div>
            <div className="description">
                <strong>{props.item.categoria}</strong>
                <h6>${props.item.precio}</h6>
            </div>
           <button className="btn btn-block" onClick={() => handleProducto(props.item)}>Contactar</button>
        </div>
    )
}

export default withRouter(Card)
