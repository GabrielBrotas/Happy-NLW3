import { ErrorRequestHandler } from 'express' // para saber a typagem dos erros que formos receber
import {ValidationError } from 'yup'

interface ValidationErrors {
    // todas as chaves serão um array de string, ex: 'name': ["obrigatorio", "minimo de caracteres"...]
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {

    // se o erro vim do yup (validationerrors)
    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {};
        
        error.inner.forEach( (err: any) => {
            errors[err.path] = err.errors
        }) 
        return response.status(400).json({message: "validation fails", errors})
    }
    console.log(error)
    return response.status(500).json({message: "Internal Server Error"})
};

export default errorHandler