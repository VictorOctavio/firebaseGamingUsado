import React from 'react'
import './adminUser.css'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {GetMisProductosAction, DeleteProductoAction} from '../../Redux/Admin'
    

const MisProductos = ({edit, setEdit, setProducto}) => {

    

    //Señalizamos dispatch  
    const dispatch = useDispatch()

    //LLAMAMOS A LOS PRODUCTOS 
    React.useEffect(() => {

        const getData = () => {
            dispatch(GetMisProductosAction())
        }
        getData()

    }, [dispatch])

    //OBTENEMOS LOS PRODUCTOS
    const misProductos = useSelector(store => store.admin.misProductos)

    //EDITAR 
    const handleEdit = (item) => {

        setEdit(true)
        console.log(item)
        setProducto({
            id: item.id,
            producto: item.producto,
            precio: item.precio,
            productoIMG: item.productoIMG,
            descripcion: item.descripcion,
            categoria: item.categoria,
            email: item.email,
            whatsapp: item.whatsapp,
            fecha: item.fecha
        })
    }

    //DELETE PRODUCTO
    const handleDelete = (id) => {
        dispatch(DeleteProductoAction(id))
    }

    return (
        <>
        <div className="col-md-12">
            <h3>MIS PRODUCTOS</h3>
        </div>

        <div className="row mis-productos">
            {
            misProductos !== null || misProductos.length > 0 ? (
                misProductos.map(item => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 admin-card" key={item.id}>
                        <div className="card">

                            <div className="img-div">
                            <img className="card-flui" src={item.productoIMG} alt="Cardimagecap" />
                            </div>

                            <div className="card-body">
                                <p className="card-text">{item.producto}</p>
                            </div>
                            <div className="admin-controllers">
                                <div>
                                    <button className="btn my-2 editar" onClick={() => handleEdit(item)}>Editar</button>
                                    <button className="btn mx-1 my-2 delete" onClick={() => handleDelete(item.id)}>Eliminar</button>
                                </div>
                                <h6 className="mx-2">${item.precio}</h6>
                            </div>
                        </div>
                    </div> 
                ))
            ):<stron>No hay productos existentes</stron>                
            }
           
        </div>
        </>
    )
}

export default MisProductos
