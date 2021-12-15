import React from 'react'

//Components
import Footer from '../Components/Footer/Footer'
import Favoritos from '../Components/Favoritos/Favoritos'

//RouterDOM
import {withRouter} from 'react-router-dom'

//Redux
import {useSelector} from 'react-redux'

const FavPage = (props) => {

    const user = useSelector(store => store.user.active)

    if(!user){
        props.history.push('/');
    }

    return (
        <div>
            <Favoritos/>
            <Footer/>
        </div>
    )
}

export default withRouter(FavPage)
