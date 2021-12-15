import React from 'react'

//Components
import Carousel from '../Components/Carousel/Carousel'
import Categorias from '../Components/categorias/Categorias'
import Footer from '../Components/Footer/Footer'
import Recientes from '../Components/Recientes/Recientes'
import Recomendados from '../Components/Recomendos/Recomendados'

const MainPage = () => {
    return (
        <React.Fragment>
            <Carousel/>

            <Recientes/>

            <Recomendados/>
            <Categorias/>
            <Footer/>
        </React.Fragment>
    )
}

export default MainPage
