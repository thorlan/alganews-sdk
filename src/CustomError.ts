import { AlgaNews } from "./";

export type ErrorData = AlgaNews.components["schemas"]["Problem"];

export type ErrorType = 
    'BusinessError' | 
    'ForbiddenError' | 
    'GenericError' | 
    'InvalidDataError' | 
    'SystemError' | 
    'ResourceNotFoundError';

class CustomError {
    
    static type: ErrorType;

    message?: string;
    data?: ErrorData;

    constructor(data: ErrorData){
         this.message = data.userMessage || data.detail;
         this.data = data;
    }
}

export default CustomError;