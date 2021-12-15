//Import firebase
import {db} from '../Firebase'

//Data Inicial
const dataInicial = {
    misProductos: [],
    sellerActive: false,
    admin: null
}


//Types
const SELLER_EXITO = 'SELLER_EXITO'
const MIS_PRODUCTOS = 'MIS_PRODUCTOS'


//Reducer
export default function adminReducer(state = dataInicial, action){
    switch(action.type){

        default:
            return {...state}

        case SELLER_EXITO:
            return {...state, sellerActive: true}

        case MIS_PRODUCTOS:
            return {...state, misProductos: action.payload}
    }
}


//Metodos/Acciones
//Crear Vendedor
export const SellerAction = () => async(dispatch, getState) => {
    
    try{

        const {user} = getState().user
        await db.collection('sellers').doc(user.email).set(user)
        
        dispatch({
            type: SELLER_EXITO
        })

    }catch(err){
        console.log(err)
    }

}

//LEER SI EL VENDEDOR ESTA REGISTRADO
export const ReadSellerAction = () => async(dispatch) => {
    try{
        if(localStorage.getItem('seller')){
            dispatch({
                type: SELLER_EXITO
            })
            return
        }else{
            if(localStorage.getItem('user')){
                const seller = JSON.parse(localStorage.getItem('user')) 
                const sellerDB = await db.collection('sellers').doc(seller.email).get()
        
                if(sellerDB.exists){
                    dispatch({
                        type: SELLER_EXITO
                    })
                    localStorage.setItem('seller', true)
                    return
                }else{
                    console.log('vendedor no exite')
                }
            }
        }
        
    }catch(err){
        console.log(err)
    }
   
}


//Subir Producto a la collección del usuario    
export const SaveProductoAction = (producto) => async(dispatch, getState) => {
    
    try{

        const {user} = getState().user

        await db.collection('sellers').doc(user.email).collection('productos').doc(producto.id).set(producto)
        await db.collection('allProductos').doc(producto.id).set(producto)

    }catch(err){
        console.log(err)
    }

}



//Obtener mis PRODUCTOS DE LA BASE DE DATOS
export const GetMisProductosAction = () => async(dispatch, getState) => {

    const {user} = getState().user

    try{

        const data = await db.collection('sellers').doc(user.email).collection('productos').get()
        const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))

        dispatch({
            type: MIS_PRODUCTOS,
            payload: arrayData
        })

    }catch(err){
        console.log(err)
    }
}


//Editar Producto
export const UpdateProductoAction = (update) => async(dispatch, getState) => {

    const {user} = getState().user
    const {misProductos} = getState().admin

    try{
        await db.collection('sellers').doc(user.email).collection('productos').doc(update.id).update(update)
        await db.collection('allProductos').doc(update.id).update(update)

        const arrayFilter = misProductos.map(producto => (
            producto.id === update.id ? update :producto
        ))

        dispatch({
            type: MIS_PRODUCTOS,
            payload: arrayFilter
        })

    }catch(err){
        console.log(err)
    }

}


//Delete Producto 
export const DeleteProductoAction = (id) => async(dispatch, getState) => {
    
    const {user} = getState().user
    const {misProductos} = getState().admin

    try{

        await db.collection('sellers').doc(user.email).collection('productos').doc(id).delete()
        await db.collection('allProductos').doc(id).delete()

        const arrayFiler = misProductos.filter(producto => (producto.id !== id))
        
        dispatch({
            type: MIS_PRODUCTOS,
            payload: arrayFiler
        })

    }catch(err){
        console.log(err)
    }


}
