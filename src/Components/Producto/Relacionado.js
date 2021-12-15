import React from 'react'
import './relacionado.css'

//Compenets
import Card from '../Card/Card'

//REDUX
import {useSelector} from 'react-redux'

const Relacionado = ({produc, id}) => {

    const Rproductos = useSelector(store => store.app.productos)
    
    return (
        <>
        <div className="title-relacionado">
            <h2>Podría Interesarte</h2>
        </div>

        <div className="c-relacionado">
        {
            Rproductos.map(item => (
               item.categoria === produc && item.id !== id && (
                    <div className="col-10 col-sm-6 col-md-4 col-lg-3 mx-1" key={item.id}>
                    <Card
                        item={item}
                    />
                </div> 
              )
            ))
        }      
        </div>
        </>
    )
}

export default Relacionado
