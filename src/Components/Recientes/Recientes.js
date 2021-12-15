import React from 'react'
import './recientes.css'

import {withRouter} from 'react-router-dom'

//Components
import Card from '../Card/Card'

//REDUX
import {useSelector} from 'react-redux'

import '../../Assets/Spiner.css'


const Recientes = (props) => {

    //OBTENER RECIENTES
    var Recientes = useSelector(store => store.app.productos)
    var pRecientes = Recientes.slice(0, 8)

    //IR PAGE RECIENTES
    const handleRecientes = () => {
        props.history.push('/ofertas')
    }



    return (
        <div className="recientes-container">
        {
             pRecientes !== null && pRecientes.length > 0 ? (
                <div className="recientes">
                <div className="title">
                    <h2>Ultimas Publicaciones</h2>
                   <strong onClick={handleRecientes}>VER MAS</strong>
                </div>
                
                <div className="row productos-list">
                    {
                       
                     pRecientes.map(item => (
                        <div className="col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={item.id}>
                        <Card
                        item={item}
                        />
                        </div>
                    ))
                    }
                </div>
                </div>
             ): <div className="lds-facebook" style={{top: '30px'}}><div></div><div></div><div></div></div>
        }
          
        </div>
    )
}

export default withRouter(Recientes)
