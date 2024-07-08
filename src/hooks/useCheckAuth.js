import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
    const { status } = useSelector((state) => state.auth);
    const dispath = useDispatch();
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispath(logout());
            const { uid, email, displayName, photoURL } = user;
            dispath(login({ uid, email, displayName, photoURL }));
            dispath(startLoadingNotes());
        });

    }, []);

    return  status 
}