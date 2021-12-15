import React from 'react'
import './productos.css'

//Components
import Footer from '../Footer/Footer'
import Card from '../Card/Card'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {CategoriaActive, FilterAction} from '../../Redux/appDuck'

import '../../Assets/Spiner.css'

const Productos = () => {

    //STATE
    const [filter, setFilter] = React.useState({
        min: 0,
        max: 0
    })

    const dispatch = useDispatch()

    const productos = useSelector(store => store.app.productos)
    const categoriaActive = useSelector(store => store.app.categoria)

    React.useEffect(() => {
        dispatch(CategoriaActive())
    }, [dispatch])

    //GET FILTROS
    const getFilter = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    //HANDLE FILTER
    const handleFilter = () => {
        if(parseInt(filter.max) <= 0 || parseInt(filter.max) < 600 ){
            console.log('campos vacios')
            return
        } 
        dispatch(FilterAction(filter))
    }

    return (    
        <>
        {
            categoriaActive !== null ? (
            <>
             <div className="row productos-container">
                 
            <div className="productos-filtros col-12">
                <ul>
                    <h6 className="text-center">Filtrar:</h6>
                    <input className="form-control" placeholder="Minimo" name="min" type="number" onChange={getFilter} value={filter.min}/> 
                    <input className="form-control" placeholder="Máximo" name="max" type="number" onChange={getFilter} value={filter.max}/>
                    <button className="btn btn-dark" onClick={handleFilter}>Filtrar</button> 
                </ul>
            </div>

            <div className="productos col-12">

                {   
                categoriaActive !== null ? (
                    categoriaActive.length > 0 ? (
                        categoriaActive.map(item => (
                            <div className="col-12 col-md-5 col-lg-3 r-card" key={item.id}>
                                    <Card
                                    item={item}
                                />
                            </div> 
                            ))
                    ):(<div className="err-results">
                        <h2>NO SE ENCONTRARON RESULTADOS</h2>
                    </div>
                )   
                ):(
                  productos.map(item => (
                    <div className="col-12 col-md-5 col-lg-3 r-card" key={item.id}>
                        <Card
                        item={item}
                        />
                    </div> 
                    ))
                )
                }
            </div> 


        </div>


        <Footer/>
            </>
            ): <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
       
        
        </>
    )
}

export default Productos
    