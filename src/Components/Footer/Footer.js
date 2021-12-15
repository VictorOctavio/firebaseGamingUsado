import React from 'react'
import './footer.css'

import {withRouter} from 'react-router-dom'

import {FaWhatsappSquare, FaInstagramSquare, FaFacebookSquare, FaLocationArrow} from 'react-icons/fa'
import {BiHelpCircle} from 'react-icons/bi'

const link = 'https://www.youtube.com/watch?v=X1NIDZyFkCY&ab_channel=DANIELHABIF'
const Footer = (props) => {

    const handleSugerencia = () => {
        props.history.push('/sugerencia')
    }

    return (
     
            <div className="footer-container">
                <div className="footer">
                    <div className="contacto">
                        <a href={link} target="_black"><FaWhatsappSquare/></a>
                        <a  href={link} target="_black" className="mx-2"><FaInstagramSquare/></a>
                        <a href={link} target="_black"><FaFacebookSquare/></a>
                    </div>

                    <div className="ubicacion">
                        <strong><FaLocationArrow/> Argentina, Corrientes</strong>
                    </div>

                    <div className="sugerencia">
                        <strong onClick={handleSugerencia}><BiHelpCircle/> Dejar sugerencia</strong>
                    </div>

                    <div className="autor">
                        <strong>©Todos los derechos reservados. Copyright</strong>
                    </div>
                </div>
            </div>
    )
}

export default withRouter(Footer)
