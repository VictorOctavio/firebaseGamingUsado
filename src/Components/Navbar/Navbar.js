import React from 'react'
import './navbar.css'

//React router
import {Link, NavLink, withRouter} from 'react-router-dom'

//Categoris array
import {categoriasItem, perifericosItem} from './cateItem'

//Reacr Icon
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';

//REDUX
import {useDispatch, useSelector} from 'react-redux';
import {LogoutUserAction} from '../../Redux/User';
import {CategoriaActive} from '../../Redux/appDuck';

//logo
import logo from '../../Assets/log.png'


const Navbar = (props) => {

    //DISPATCH SELCETOR
    const dispatch = useDispatch()
    const userActive = useSelector(store => store.user.active)

    const [categorias, setCategorias] = React.useState(false)

    //Desplegar Categoria
    const handleCategoria = () => {
        setCategorias(!categorias)
    }

    //Logout USER
    const handleLogout = () => {
        dispatch(LogoutUserAction())

        props.history.push('/login')

    }
    
    //handleHome
    const handleHome = () => {
        setCategorias(false)
    }

    //categoria
    const handleCategoriaPage = (categoria) => {

        setCategorias(false)

        props.history.push(`/productos/${categoria}`)

        dispatch(CategoriaActive(categoria))
                
    }
    

    return (
        <div className="navegacion">
            <nav className="nav-primary">
                <Link to="/" onClick={handleHome}><img src={logo} alt="Logo"/></Link>

                <div className="item-primary">
                    {
                        userActive ? (  
                         <NavLink to="/mi-cuenta" onClick={() => setCategorias(false)} className="vender">MI CUENTA :)</NavLink>
                        ):
                            <NavLink to="/login" onClick={() => setCategorias(false)} className="vender">Empieza a vender</NavLink>
                    } 
                </div>
            </nav>

            <nav className="nav-secondary">
                <div className="nav-left">
                    <button className="btn" onClick={handleCategoria}>Categorias{categorias?<IoMdArrowUp/>:<IoMdArrowDown/> } </button>
                </div>

                <div className="nav-rigth">
                    {
                        !userActive ? (
                            <NavLink to="/login" className="ingresar mx-2" onClick={() => setCategorias(false)}>INGRESAR</NavLink>
                        ):(
                            <>
                            <button className="ingresar mx-2 btn" onClick={handleLogout}>SALIR</button>
                            <NavLink to="/mis-favoritos">
                                <button className="notification btn" onClick={() => setCategorias(false)}><span className="px-2">GUARDADOS</span></button>
                            </NavLink>
                            </>
                        ) 
                    }
                   
                </div>
            </nav>




            {
                categorias && (
                <div className="categorias-container">
                    <div className="categorias row"> 
                        <div className="cate-items col-12 col-lg-8">
                            <ul className="hardware">
                                <h6>HARDWARE</h6>
                                {
                                categoriasItem.map(categoria => (
                                    <li onClick={() => handleCategoriaPage(categoria)} key={categoria}>{categoria}</li>
                                ))
                                }
                                
                            </ul>

                            <ul className="perifericos">
                                <h6>PERIFERICOS</h6>
                                {
                                    perifericosItem.map(periferico => (
                                        <li onClick={() => handleCategoriaPage(periferico)} key={periferico}>{periferico}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        
                        <div className="img col-12 col-md-4">
                            <img src={logo} alt="img"/>
                        </div>                        
                    </div>
                </div>
                )
            }            
        </div>
    )
}

export default withRouter(Navbar)
