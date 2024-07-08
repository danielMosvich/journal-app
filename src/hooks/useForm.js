import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, validations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({})
    useEffect(() => {
        createValidators()
    }, [formState])
    useEffect(()=>{
        setFormState(initialForm)
    },[initialForm])
    const onInputChange = ({ target: { name, value } }) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const onResetForm = () => {
        setFormState(initialForm);
    }
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false
        }
        return true
    }, [formValidation])
    const createValidators = () => {
        // console.log(Object.keys(validations)[2]);
        const formCheckValues = {}
        for (const formField of Object.keys(validations)) {
            const [fn, errorMessage = "Este campo es requerido"] = validations[formField]
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }
        setFormValidation(formCheckValues)
    }
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}