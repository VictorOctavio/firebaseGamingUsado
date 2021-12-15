import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

//Page Components
import MainPage from './Pages/MainPage';
import Navbar from './Components/Navbar/Navbar';
import ProductoPage from './Pages/ProductoPage';
import ProductosPage from './Pages/ProductosPage';
import FavPage from './Pages/FavPage';
import Page404 from './Pages/Page404';
import LoginPage from './Pages/LoginPage';
import AdminUserPage from './Pages/AdminUserPage';
import RecientesPage from './Pages/RecientesPage';
import SugerenciaPage from './Pages/SugerenciaPage';

//REDUX
import {useDispatch} from 'react-redux'
import {GetProductosAction} from './Redux/appDuck'
import ScrollTop from './Components/ScrollTop'

function App() {

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(GetProductosAction())
  }, [dispatch])

  return (
    <React.Fragment>
      <Router>
        <ScrollTop/>
        <Navbar/>
        <Switch>

          <Route path="/" component={MainPage} exact/>

          <Route path={`/productos/:categoria`} component={ProductosPage} exact/>

          <Route path="/mis-favoritos" component={FavPage} exact/>

          <Route path="/ofertas" component={RecientesPage} exact/>

          <Route path="/mi-cuenta" component={AdminUserPage} exact/>
          
          <Route path={`/producto/:id`} component={ProductoPage} exact/>

          <Route path="/sugerencia" component={SugerenciaPage} exact/>

          <Route path="/login" component={LoginPage} exact/>

          <Route component={Page404} exact/>

        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
