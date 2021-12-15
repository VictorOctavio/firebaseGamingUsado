import React from 'react'

//Components
import Footer from '../Components/Footer/Footer'
import AllRecientes from '../Components/AllRecientes/AllRecientes'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {RecientesAction, SiguienteAction} from '../Redux/appDuck'


import '../Assets/Spiner.css'


const RecientesPage = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(RecientesAction(setUltimo, setDesactivar))
    }, [dispatch])

    var productos = useSelector(store => store.app.recientes)
   

    //PAGINACION
    const [ultimo, setUltimo] = React.useState(1)
    const [desactivar, setDesactivar] = React.useState(false)

    const handleSiguiente = () => {
       dispatch(SiguienteAction(setUltimo, ultimo, setDesactivar))
    }

    return (
        <div>
          {
              productos.length > 0 ? ( 
                <>
                <AllRecientes 
                    productos={productos}
                />

                <div className="paginacion d-flex justify-content-center mt-3">
                    <button className="btn btn-sm btn-dark mx-1" onClick={handleSiguiente} disabled={desactivar}>ver más</button>
                </div>

                <Footer/>    
                </>
              ): <div className="lds-facebook" style={{top: '350px'}}><div></div><div></div><div></div></div>
          }
            
        </div>
    )
}

export default RecientesPage
