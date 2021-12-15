import {db} from '../Firebase'

//dataInicial 
const dataInicial = {
    loadingData: false,
    productos: [],
    categoria: null,
    producto: null,
    favorito: false,
    misFavoritos: null,
    recientes: []
}


//Typer
const LOADING_DATA = "LOADING_DATA"
const GET_PRODUCTOS = "GET_PRODUCTOS"
const GET_PRODUCTO = "GET_PRODUCTO"
const GET_CATE = "GET_CATE"
const EXITO_MESSAGE = "EXITO_MESSAGE"
const GET_FAVORITOS = "GET_FAVORITOS"
const GET_RECIENTES = "GET_RECIENTES"



//Reducer
export default function AppReducer(state = dataInicial, action){

    switch (action.type) {

        case LOADING_DATA:
            return {...state, loadingData: true}

        case GET_PRODUCTOS:
            return {...state, loadingData: false, productos: action.payload}
        
        case GET_PRODUCTO:
            return {...state,  loadingData: false, producto: action.payload}

        case GET_CATE:
            return {...state, categoria: action.payload}

        case EXITO_MESSAGE:
            return {...state, favorito: action.payload}     
            
        case GET_FAVORITOS:
            return {...state, misFavoritos: action.payload}

        case GET_RECIENTES:
            return {...state, recientes: action.payload}

        default:
            return {...state}

    }
}


//ACTIONS
export const GetProductosAction = () => async(dispatch) => {

    dispatch({
        type: LOADING_DATA
    })

    try{   

        const data = await db.collection('allProductos').orderBy('fecha', 'desc').limit(20).get()
        const dataFilter = data.docs.map(doc => ({id: doc.id, ...doc.data()}))

        dispatch({
            type: GET_PRODUCTOS,
            payload: dataFilter
        })

    }catch(err){console.log(err)}

}


export const GetProductoAction = (idd) => async(dispatch) => {

    try{ 
        var URLactual = window.location.pathname;
        var splitURL = URLactual.split('/');
        var id = splitURL[2];

        const data = await db.collection('allProductos').doc(id).get()
        
        dispatch({
            type: GET_PRODUCTO,
            payload: data.data()
        })

    }catch(err){
        console.log(err)
    }        
}


export const CategoriaActive = (categoriaa) => async(dispatch, getState) => {

    const {productos} = getState().app

    try{

        if(categoriaa === undefined){
            var URLactual = window.location.pathname;
            var splitURL = URLactual.split('/');
            var categoria = splitURL[2];

            const data = await db.collection('allProductos').get()
            const dataFilter = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
            const resul = dataFilter.filter(producto => (producto.categoria === categoria))

            dispatch({
                type: GET_CATE,
                payload: resul
            })
            return
        }else{

        const filterProductos = productos.filter(producto => (producto.categoria === categoriaa))
    
        dispatch({
            type: GET_CATE,
            payload: filterProductos
         })
 
        return
        }
        

    }catch(err){console.log(err)}
}



//ACCION SAVEFAVORITO
export const FavoritosAction = (producto) => async(dispatch, getState) => {
    
    const {user} = getState().user

    try{

        
        await db.collection('users').doc(user.email).collection('mis-favoritos').doc(producto.id).set(producto)

        dispatch({
            type: EXITO_MESSAGE,
            payload: true
        })
    
        setTimeout(() => {
            dispatch({
                type: EXITO_MESSAGE,
                payload: false
            })
        }, 2000)

    }catch(err){console.log(err)}

}


//ACCION GETFAVORITO
export const GetFavoritosAction = () => async(dispatch, getState) => {

    const {user} = getState().user

    try{

        const data = await db.collection('users').doc(user.email).collection('mis-favoritos').get()
        const arrayData = data.docs.map(doc => ({id:doc.id, ...doc.data()}))

        dispatch({
            type: GET_FAVORITOS,
            payload: arrayData
        })

    }catch(err){console.log(err)}

}
//DELETE FAVORITO
export const DeleteFavoritoAction = (id) => async(dispatch, getState) => {

    const {user} = getState().user
    const {misFavoritos} = getState().app

    try{ 
         
    await db.collection('users').doc(user.email).collection('mis-favoritos').doc(id).delete()
    const arrayData = misFavoritos.filter(favs => (favs.id !== id))

    dispatch({
        type: GET_FAVORITOS,
        payload: arrayData
    })

    }catch(err){
        console.log(err)
    }
}



//RECIENTES PAGE ACTION
export const RecientesAction = (setUltimo, setDesactivar) => async(dispatch) => {

        setDesactivar(true)
      
        try{
                const data = await db.collection('allProductos').orderBy('fecha', 'desc').limit(16).get()
                const dataFilter = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
                dispatch({
                    type: GET_RECIENTES,
                    payload: dataFilter
                })

                setUltimo(data.docs[data.docs.length - 1])

                const query = await db.collection('allProductos').orderBy('fecha', 'desc').limit(16).startAfter(data.docs[data.docs.length - 1]).get()
                if(query.empty){
                    setDesactivar(true)
                }else{
                    setDesactivar(false)
                }

        }catch(err){

        }

}
//PAGINACION
export const SiguienteAction = (setUltimo, ultimo, setDesactivar) => async(dispatch, getState) => {

    const {recientes} = getState().app
    console.log(recientes)
    try{
            const data = await db.collection('allProductos').orderBy('fecha', 'desc').limit(16).startAfter(ultimo).get()
            const Filter = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
            
            const dataFilter = recientes.concat(Filter)

            console.log(dataFilter)
            dispatch({
                type: GET_RECIENTES,
                payload: dataFilter
            })

            setUltimo(data.docs[data.docs.length - 1])
            
            const query = await db.collection('allProductos').orderBy('fecha', 'desc').limit(16).startAfter(data.docs[data.docs.length - 1]).get()
            if(query.empty){
                setDesactivar(true)
            }else{
                setDesactivar(false)
            }

    }catch(err){

    }

}







//FILTROS
export const FilterAction = (filtro) => async(dispatch, getState) => {
    try{

        var min = parseInt(filtro.min)
        var max = parseInt(filtro.max) 

        var URLactual = window.location.pathname;
        var splitURL = URLactual.split('/');
        var categoria = splitURL[2];

        const {productos} = getState().app
        const filtrado = await productos.filter(producto => parseInt(producto.precio) >= min && parseInt(producto.precio) <= max && producto.categoria === categoria)

        dispatch({
            type: GET_CATE,
            payload: filtrado
        })

    }catch(err){console.log(err)}
}


//SUGERENCIAS 
export const sendSugerenciaAction = (sugerencia) => async(dispatch) => {
    try{

        await db.collection('sugerencias').add(sugerencia)

    }catch(err){
        console.log(err)
    }
}