import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"

// eslint-disable-next-line no-unused-vars
export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}
// eslint-disable-next-line no-unused-vars
export const startGoogleSingIn = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await singInWithGoogle()
        if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }))
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, errorMessage = "" } = await registerUserWithEmailAndPassword({ email, password, displayName })
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, photoURL, displayName, email }))
    }
}
export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, errorMessage, displayName } = await loginWithEmailAndPassword({ email, password })
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, photoURL, email, displayName }))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase()
        dispatch((logout()))
        dispatch(clearNotesLogout())
    }
}