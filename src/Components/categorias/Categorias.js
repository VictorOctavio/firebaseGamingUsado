import React from 'react'
import './categorias.css'
import AllCategorias from './categoriasItems'

import {withRouter} from 'react-router-dom'

//REDUX
import {useDispatch} from 'react-redux'
import {CategoriaActive} from '../../Redux/appDuck'

const Categorias = (props) => {

    const dispatch = useDispatch()
    
    const handleCategoria =(categoria)=> {
        props.history.push(`/productos/${categoria}`)
        dispatch(CategoriaActive(categoria))
    }

    return (
        <div className="c-container">
            <div className="p-categorias">

                <div className="row c-lista">
                    {
                      AllCategorias.map(item => (
                        <div className="c-card col-4 col-lg-2 col-xl-1" key={item.name} onClick={() => handleCategoria(item.name)}>
                            <div className="icon">
                                {item.icon}
                            </div>

                            <div className="c-name">
                                <p>{item.name}</p>
                            </div>
                        </div>
                      ))  
                    
                    }
                </div>

            </div>
        </div>
    )
}

export default withRouter(Categorias)

/*
   
*/