// four parameters represent the error object, the request object, 
// the response object and the next middleware function in the middleware
// chain.

// Status code 500 -> Internal  Server Error

// err.message vs err.stack

const {constants} = require("../constants") ; 

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 ; 
    switch (statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed", 
                message: err.message, 
                stackTrace : err.stack,
            }) ;
            break; 
        case constants.NOT_FOUND: 
            res.json({
                title: "Not Found", 
                message: err.message, 
                stackTrace : err.stack,
            }) ; 
        case constants.UNAUTHORIZED: 
            res.json({
                title: "Unauthorized", 
                message: err.message, 
                stackTrace : err.stack,
            }) ;
        case constants.FORBIDDEN: 
            res.json({
                title: "Forbidden", 
                message: err.message, 
                stackTrace : err.stack,
            }) ;
        case constants.SERVER_ERROR: 
            res.json({
                title: "Server Error", 
                message: err.message, 
                stackTrace : err.stack,
            }) ;      
        default: 
            console.log("No error. All good") ; 
            break ; 
    }
    
    
}

module.exports = errorHandler ; 