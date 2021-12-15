import React from 'react';
import './login.css';

//REDUX
import {useDispatch, useSelector} from 'react-redux';
import {LoginUserAction} from '../../Redux/User';

//Redirec Router
import {withRouter} from 'react-router-dom'

import {AiOutlineGoogle} from 'react-icons/ai'

//logo
import logo from '../../Assets/log.png'


const Login = (props) => {

    //Señalizamos Dispath y Selector Loading
    const dispatch = useDispatch()
    const loading = useSelector(store => store.user.loading)
    const active = useSelector(store => store.user.active)

    //Leer su el usuario esta Activo
    React.useEffect(() => {
        if(active){
            props.history.push('/')
        }
    }, [active, props.history])

    const handleLoginGoole = () => {

         dispatch(LoginUserAction())

         if(active){
            props.history.push('/')
        }
    
    }

    return (
        <div className="login-container">
            <div className="row login">

                <img className="col-md-12" src={logo} alt="img-login"/>

                <div className="col-md-12 c-button">
                    <button className="btn btn-dark" onClick={handleLoginGoole} disabled={loading}><AiOutlineGoogle/> Ingresa con Google</button>
                </div>
            </div>


            <div className="login-description">
                <div className="description-texto">
                    <h2>publica o compra al mejor precio!</h2>
                    <p>Somos una pagina que te permite poner a la venta hardware que ya no usas, como tambien poder buscar y adquirir lo que necesitas.</p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
