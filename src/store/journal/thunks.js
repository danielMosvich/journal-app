import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmpyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice"
import { fileUpload, loadNotes } from "../../helpers"
export const startNewNote = () => {

    return async (dispatch, getState) => {
        dispatch(savingNewNote())
        const { uid } = getState().auth
        const newNote = {
            title: "",
            body: "",
            imageUrls: [],
            date: new Date().getTime()
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))

        await setDoc(newDoc, newNote)
        newNote.id = newDoc.id
        // dispatch
        dispatch(addNewEmpyNote(newNote))
        dispatch(setActiveNote(newNote))
        // dispatch new note
        // dispatch active
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        console.log(uid)
        if (!uid) throw new Error("No user logged in")
        const response = await loadNotes(uid)
        dispatch(setNotes(response))
    }
}
export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const { uid } = getState().auth
        const { active: note } = getState().journal
        // console.log(note.id)
        const noteToFireStore = {
            ...note
        }
        delete noteToFireStore.id
        // console.log(noteToFireStore)
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true })
        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))

        }
        const photosUrls = await Promise.all(fileUploadPromises)
        console.log(photosUrls)
        dispatch(setPhotosToActiveNote(photosUrls))
        // const response = await fileUpload(files[0])
        // {
        //     "0": {},
        //     "1": {}
        // }
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const { uid } = getState().auth
        const {active:note} = getState().journal
        
        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        dispatch(deleteNoteById(note.id))
    }
}