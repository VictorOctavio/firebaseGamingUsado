import React from 'react'
import './allRecientes.css'

//Components
import Card from '../Card/Card'

//Moment
import moment from 'moment'
import 'moment/locale/es' // Pasar a español
//ICONS
import {IoIosTime} from 'react-icons/io'


const AllRecientes = ({productos}) => {

    return (
    
                <div className="allRecientesContainer">
                        
                    <div className="col-md-12 text-center">
                        <h2>Publicados Recientes</h2>
                    </div>
                    <div className="allRecientes">
                        {
                        productos.map(item => (
                            <div className="col-12 col-md-5 col-lg-3 r-card" key={item.id}>
                                <Card
                                item={item}
                                />
                                <span><IoIosTime/><b>{moment(item.fecha).startOf('hour').fromNow()}</b></span>
                            </div>
                        ))

                        }
                    </div>
                </div>

      
    )
}

export default AllRecientes
