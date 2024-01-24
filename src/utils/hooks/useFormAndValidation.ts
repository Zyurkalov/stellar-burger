import {useState, useCallback, ChangeEvent, FormEvent, SyntheticEvent} from 'react'

type TInput = {email: string} | {name: string, email: string, password: string} | {email: string, password: string} | {password: string, token: string}

export const useFormAndValidation = <T extends TInput>(initialState: T = {} as T, oneInput = false) => {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, validationMessage} = e.target

        setValues({...values, [name]: value})
        setErrors({...errors, [name]: validationMessage});
        
    }
    const handleValid = (e: ChangeEvent<HTMLInputElement>) => {
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