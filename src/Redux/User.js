//Import firebase
import {firebase, auth, db} from '../Firebase'

//Data Inicial
const dataInicial = {
    loading: false,
    user: null
}


//Types
const LOADING = 'LOADING'
const EXITO_USER = 'EXITO_USER'
const LOGOUT_USER = 'LOGOUT_USER'


//Reducer
export default function userReducer(state = dataInicial, action){
    switch(action.type){

        case LOADING:
            return {...state, loading: true}

        case EXITO_USER:
            return {...state,loading: false, user: action.payload}

        case LOGOUT_USER: 
            return {...dataInicial}

        default:
            return {...state}

    }
}


//Metodos/Acciones

//Ingreso del usuario con GOOGLE
export const LoginUserAction = () => async(dispath) =>  {
    
    dispath({
        type: LOADING
    })

    try{

        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider);
        
        const user = {
            name: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL
        }

        //GUARDAR USUARIO DB
        const userDB = await db.collection('users').doc(user.email).get()
        //Verificar si Existe
        if(userDB.exists){
            console.log(userDB.data())
            //Devolve el usuario
            dispath({
                type: EXITO_USER,
                payload: userDB.data()
            })
            localStorage.setItem('user', JSON.stringify(userDB.data()))
            return
        }else{
            //Creame el usuario
            await db.collection('users').doc(user.email).set(user)

            dispath({
                type: EXITO_USER,
                payload: user
            })

            localStorage.setItem('user', JSON.stringify(user))
        } 
        
    }catch(err){
        console.log(err)
    }

}



//Leer Sesion Iniciada del Usuario
export const ReadUserAction = () => (dispatch) => {
    if(localStorage.getItem('user')){
        dispatch({
            type: EXITO_USER,
            payload: JSON.parse(localStorage.getItem('user')) 
        })
    }
} 



//Logout Sesion
export const LogoutUserAction  = () => (dispatch) => {
    auth.signOut()
    dispatch({
        type: LOGOUT_USER
    })
    localStorage.removeItem('user')
    if(localStorage.getItem('seller')){
        localStorage.removeItem('seller')
    }
}