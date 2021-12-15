import React from 'react'
import './favoritos.css'

import {withRouter} from 'react-router-dom'

//REDUX
import {useDispatch, useSelector} from 'react-redux';
import {GetFavoritosAction, GetProductoAction, DeleteFavoritoAction} from '../../Redux/appDuck';

const Favoritos = (props) => {

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(GetFavoritosAction())
    }, [dispatch])

    const favoritos = useSelector(store => store.app.misFavoritos)


    const handleProducto = (item) => {

        props.history.push(`/producto/${item.id}`)
        dispatch(GetProductoAction(item))

    }

    const handleDelete = (id) => {
        dispatch(DeleteFavoritoAction(id))
    }
 
    return (
        <div className="fav-container">
            {   
                favoritos ?(
                    favoritos.length > 0 ? (
                        <div className="favoritos">
                        <h3 className="pb-1">GUARDADOS</h3>
                        <div className="row">
                            {
                                favoritos.map(item => (
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 r-card" key={item.id}>
                                        <div className="card">
                                            <div className="img-div">
                                                <img className="img-fluid" src={item.productoIMG} alt="Cardimagecap" />
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">{item.producto}</p>
                                            </div>
                                            <div className="description">
                                                <strong>{item.categoria}</strong>
                                                <h6>${item.precio}</h6>
                                            </div>
                                            <div>
                                                <button className="btn btn-block" onClick={() => handleProducto(item)}>Contactar</button>
                                                <button className="btn btn-danger mx-1" onClick={() => handleDelete(item.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                            </div>
                        </div>
                ):<div className="err-favs"><h2>NO HAY PRODUCTOS GUARDADOS</h2></div>
                ):<div className="lds-facebook"><div></div><div></div><div></div></div>
            }
          

        </div>
    )
}

export default withRouter(Favoritos)

/*
     <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 admin-card" key={item.id}>

                        onClick={() => handleProducto(props.item)}

                        <div className="card">
                            <img className="card-img-top" src={item.productoIMG} alt="Cardimagecap" />
                            <div className="card-body">
                                <p className="card-text">{item.producto}</p>
                            </div>
                            <div className="admin-controllers">
                                <button className="btn my-2 editar" onClick={() => handleEdit(item)}>Editar</button>
                                <button className="btn mx-1 my-2 delete" onClick={() => handleDelete(item.id)}>Eliminar</button>
                            </div>
                            <h6 className="text-end mx-2">${item.precio}</h6>
                        </div>
                    </div> 
*/