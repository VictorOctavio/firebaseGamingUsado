import React from 'react'
import './recomendados.css'

//Components
import Card from '../Card/Card'

//REDUX
import {useSelector} from 'react-redux'

const Recomendados = () => {

    //OBTENER RECIENTES
    var Recomendados = useSelector(store => store.app.productos)
    var pRecomendados = Recomendados.slice(8, 20)

    return (
        <div className="recomendados-container">
            <div className="recomendados">

                <div className="r-title">
                    <h2>Recomendados</h2>
                </div>

                <div className="row recomendado-list">
                    {
                        pRecomendados.map(item => (
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 r-card" key={item.id}>
                                <Card
                                    item={item}
                                />
                            </div>  
                        ))
                    }
                    
                </div>

            </div>
        </div>
    )
}

export default Recomendados
