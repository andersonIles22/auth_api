const jwt=require('jsonwebtoken');
const { error } = require('./errorHandler');
const { HTTP_STATUS } = require('../constants/httpStatusCode');
const { MESSAGES_OPERATION } = require('../constants/statusMessages');

const authMiddleware= (req,res,next)=>{
    const getAuth=req.headers.authorization;
    if(!getAuth || !getAuth.startsWith('Bearer')){
        return error(HTTP_STATUS.AUTHORIZATION_REQUIRED,"campo 1, ya estoi arto",next)
    }

    const onlyToken=getAuth.split(' ')[1];
    try {
        const decoded=jwt.verify(onlyToken,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (err) {
        return error(HTTP_STATUS.AUTHORIZATION_REQUIRED,"Campo 2, este wey",next);
    }
};

module.exports=authMiddleware