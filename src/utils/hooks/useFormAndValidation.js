import {useState, useCallback} from 'react'

export const useFormAndValidation = (initialState = {}, oneInput = false) => {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState(false)

    const handleChange = (e) => {
        const {name, value, validationMessage} = e.target

        setValues({...values, [name]: value})
        setErrors({...errors, [name]: validationMessage});
        
    }
    const handleValid = (e) => {
        const errStatus = Object.values(errors).every((value) => value === '');
        if(oneInput) {
            const length = e.target.value.length > 0;
            if (length && errStatus) {
                setIsValid(true);
              } else {
                setIsValid(false);
              }
        } else {
            const length = Object.values(values).every((value) => value.length > 0 );
            if (length && errStatus) {
                setIsValid(true);
              } else {
                setIsValid(false);
              }
        } 
    }
    const resetForm = useCallback((newValue = {}, newError = {}, newIsValid = false) => {
        setValues(newValue)
        setErrors(newError)
        setIsValid(newIsValid)
    },[setValues, setErrors, setIsValid])

    return { values, handleChange, errors, resetForm, setValues, handleValid, isValid, setIsValid };
}