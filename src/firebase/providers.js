import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        // !!En caso no sea mejor usar redirect que el popup
        //           // Before
        //   // ==============
        //   signInWithRedirect(auth, new GoogleAuthProvider());
        //   // After the page redirects back
        //   const userCred = await getRedirectResult(auth);

        //   // After
        //   // ==============
        //   const userCred = await signInWithPopup(auth, new GoogleAuthProvider());


        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        // console.log({credentials})
        const { displayName, email, photoURL, uid } = result.user
        return {
            ok: true,
            // others,
            displayName,
            email,
            photoURL,
            uid,
        }

    } catch (error) {
        console.log(error)
        const errorMessage = error.message
        return {
            ok: false,
            errorMessage
        }
    }
}
export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {
    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = response.user
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return {
            ok: true,
            uid,
            photoURL,
            displayName
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}
export const loginWithEmailAndPassword = async ({ email, password }) => {
    // *singInWithEmailAndPassword
    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName } = response.user
        return {
            ok: true,
            uid,
            photoURL,
            displayName,
            email,
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async()=>{
    return await FirebaseAuth.signOut()
    
}