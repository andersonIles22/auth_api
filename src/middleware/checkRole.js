const {error}= require('../middleware/errorHandler');
const { HTTP_STATUS } = require('../constants/httpStatusCode');
const { MESSAGES_OPERATION } = require('../constants/statusMessages');

const authorizeRoles=(...allowedRoles)=>{
    // Se debe retornar una función para poder pasar parametros al middleware en la ruta.
    return (req,res,next)=>{
        // Obtener rol
        const {role}=req.user;
        // Verificamos que el usuario este Autenticado;
        if(!role) return error(HTTP_STATUS.AUTHORIZATION_REQUIRED,MESSAGES_OPERATION.NOT_AUTHENTICATED,next)
        // Verificamos que el usario sea admin
        if(!allowedRoles.includes(role)) return error(HTTP_STATUS.FORBIDDEN,MESSAGES_OPERATION.DENIED_ACCESS,next)
        next();
    }
};
module.exports={
    authorizeRoles
}