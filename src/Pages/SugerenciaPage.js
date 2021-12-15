import React from 'react'

import {useDispatch} from 'react-redux'
import {sendSugerenciaAction} from '../Redux/appDuck'

import {withRouter} from 'react-router-dom'

const SugerenciaPage = (props) => {

    const dispatch = useDispatch()

    const [sugerencia, setSugerencia] = React.useState({
        nombre: '',
        titulo: '',
        sugerencia: ''
    })
    const [err, setErr] = React.useState(false)
    const [exito, setExito] = React.useState(false)


    const getSugerencia = (e) => {
        setSugerencia({
            ...sugerencia,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!sugerencia.nombre.trim() || !sugerencia.titulo.trim() || !sugerencia.sugerencia.trim()){
            setErr(true)
            return
        }

        setExito(true)
        dispatch(sendSugerenciaAction(sugerencia))
        setTimeout(() => {
            props.history.push('/')
        }, 2000)
    }

    return (
        <div className="container">
        <div className="row" style={{
            minHeight: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="col-md-12 mt-5" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 style={{textAlign: 'center', fontWeight: 300}}>DEJAR SUGERENCIA</h2>

                <form className="col-xs-12 col-sm-10 col-lg-8 col-xl-6 mt-2" onSubmit={handleSubmit}>
                    {
                        err && (
                        <div className="alert alert-danger" role="alert">Completa los campos!</div>
                        )   
                    }
                    

                    <div className="col-md-12" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0px'
                    }}>
                        <div className="col-md-6" >             
                            <input className="form-control" name="nombre" onChange={getSugerencia} placeholder="Nombre:"/>
                        </div>

                        <div className="col-md-6"> 
                            <input className="form-control" name="titulo" onChange={getSugerencia} placeholder="Titulo:"/>
                        </div>
                    </div>
                    

                    <div className="col-md-12  mt-2">
                        <textarea className="form-control" name="sugerencia" onChange={getSugerencia} placeholder="Dejar tu sugerencia:" style={{
                            minHeight: '150PX',
                            maxHeight: '150px'
                        }}></textarea>
                    </div>
                    
                    <button className="col-12 btn btn-success my-2">Enviar</button>
                    {
                    exito &&  <div className="alert alert-success" role="alert">Gracias!! lo tendremos en cuenta</div>
                    }
                </form>
            </div>
        </div>
        </div>
       
    )
}

export default withRouter(SugerenciaPage)
