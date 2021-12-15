import React from 'react'
import './adminUser.css'

//Components
import MisProductos from './MisProductos'
import Seller from './Seller'

import {v4 as uuidv4}  from  'uuid' ;

//Categorias
import {categorias} from './CategoriaAdmin'

//REDUX
import {SaveProductoAction, UpdateProductoAction} from '../../Redux/Admin'
import {useDispatch, useSelector} from 'react-redux'


const AdminUser = () => {

    //Vendedor Activo
    const dispatch = useDispatch()
    const sellerActive = useSelector(store => store.admin.sellerActive)

    //Objeto de Productos
    const [producto, setProducto] = React.useState({
            id: uuidv4(),  
            producto: '',
            precio: '',
            productoIMG: '',
            descripcion: '' ,
            categoria: 'pc',
            email: '',
            whatsapp: '',
            fecha: Date.now()
    })

    //ESTADOS
        //ESTADO MODO EDITAR
        const [edit, setEdit] = React.useState(false)

    //Obtener data form en el SATATE
    const handleGetData = (e) => {

        setProducto({
            ...producto,  
           [e.target.name]: e.target.value
        })

    }


    //Guardar data del producto
    const handleSubmit = (e) =>{
    
        e.preventDefault()

        if(!producto.producto.trim() || !producto.precio.trim() || !producto.descripcion.trim() || !producto.whatsapp.trim() || !producto.email.trim()){
            console.log('campo vacios')
            return
        } 

        if(!edit){
            dispatch(SaveProductoAction(producto))
        }else{
            dispatch(UpdateProductoAction(producto))
        }   
        
        //Objeto de Productos
        setProducto({ 
                id: uuidv4(), 
                producto: '',
                precio: 0,
                productoIMG: '',
                descripcion: '' ,
                categoria: 'pc',
                email: '',
                whatsapp: '',
                fecha: Date.now()
        })

    }


    return sellerActive ?(
        <div className="adminUser-container">
           <div className="row adminUser">
                <div className="col-xs-12 col-sm-10 col-md-8 col-lg-5">
                    <h3>Agregar Producto</h3>
                </div>

                <div className="col-md-12 form-add">

                 <form className="col-md-5" onSubmit={handleSubmit}>
                        <label className="text-light">Ingresa Producto</label>
                        <input name="producto" className="form-control m-0" placeholder="Producto" type="text" onChange={handleGetData} value={producto.producto}/>

                        <label className="text-light">Ingresa Precio</label>
                        <input name="precio" className="form-control m-0" placeholder="$Precio" type="number" onChange={handleGetData} value={producto.precio}/>

                        <label className="text-light">Ingresa Foto</label>
                        <input name="productoIMG" className="form-control m-0" type="text" onChange={handleGetData} value={producto.productoIMG} placeholder="URL IMAGE"/>

                        <label className="text-light">Ingresa Descripción</label>
                        <textarea name="descripcion" className="form-control categoria-admin m-0" placeholder="Descripción" onChange={handleGetData} value={producto.descripcion}/>

                        <label className="text-light">Ingresa Categoria</label>
                            <select name="categoria" className="form-control m-0" onChange={handleGetData} value={producto.categoria}>
                               {
                                    categorias.map(categ => (
                                        <option value={categ} key={categ}>{categ}</option>
                                    ))
                                } 
                            </select>

                        <label className="text-light">Ingresa Email</label>
                        <input name="email" className="form-control m-0" placeholder="Email Contacto" type="text" onChange={handleGetData} value={producto.email}/>

                        <label className="text-light">Ingresa Numero de contacto</label>
                        <input name="whatsapp" className="form-control m-0" placeholder="Whatsap-Ejem 3794523593" type="number" onChange={handleGetData} value={producto.whatsapp}/>

                        {
                            !edit ? (
                                <button className="btn btn-success btn-block my-3">Publicar</button>
                            ):(
                                <button className="btn btn-warning btn-block my-3">Editar</button>
                            )   
                        }
                    </form>


                </div>
           </div> 

           
           <div className="row misProductosContainer">
                <MisProductos
                    setEdit={setEdit}
                    edit={edit}
                    setProducto={setProducto}
                />
            </div>
        </div>
    ):  <Seller/>
}

export default AdminUser
