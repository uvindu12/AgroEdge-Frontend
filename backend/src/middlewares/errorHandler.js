import { constants } from "../../constants.js";

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode: 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR :
            res.json({
                title:"Validation Failed!!",
                message:err.message,
                stackTrace:err.stack
            })

            case constants.UNAUTHORIZED:
                res.json({
                    title:"Unauthorized Error!!",
                    message:err.message,
                    stackTrace:err.stack
            })

            case constants.FORBIDDEN:
            res.json({
                title:"Forbidden Error!!",
                message:err.message,
                stackTrace:err.stack
            })

            case constants.SERVER_ERROR:
            res.json({
                title:"Server Error!!",
                message:err.message,
                stackTrace:err.stack
            }) 
               
            case constants.NOT_FOUND:
            res.json({
                title:"Not found Error!!",
                message:err.message,
                stackTrace:err.stack
            })
    } 
}
export default errorHandler;