import React from 'react'
import Footer from '../Components/Footer/Footer'

import {withRouter} from 'react-router-dom'

const Page404 = (props) => {
    return (
        <>
        <div className="row c-404 " style={{
            width: '75%',
            margin: '0 auto',
            marginTop: '100px'
        }}> 
        <div className="col-md-6" style={{
            display: 'flex',
            justifyContent:'flex-end'
        }}>
            <img src={'https://imagenpng.com/wp-content/uploads/2015/03/188.png'} alt="404" width="400px"/>
        </div>
        
        <div className="col-md-6" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center'
        }}>
            <h3 className="mb-0">La página solicitada no fue encontrada</h3>
            <stron style={{color: 'orange'}} className="mb-3">OCURRIO ALGO INESPERADO</stron>
            <button className="btn btn-warning btn-sm" style={{width: '30%'}} onClick={() => props.history.push("/")}>Ir la Inicio</button>        
        </div>
        </div>
        <Footer/>
        </>
        
    )
}

export default withRouter(Page404)
