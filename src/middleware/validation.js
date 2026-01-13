const {body,validationResult}=require('express-validator');
const {VALIDATION_VALUES}=require('../constants/validations');
const {MESSAGES_VALIDATION, MESSAGES_OPERATION}=require('../constants/statusMessages');
const {HTTP_STATUS}=require('../constants/httpStatusCode');

const validateRegister=[
    body('email')
        .trim()
        .isEmail().withMessage(MESSAGES_VALIDATION.EMAIL_INVALID)
        .isLength({max:VALIDATION_VALUES.MAX_LENGTH_EMAIL})
        .normalizeEmail(),
    body('password')
        .isLength({min:VALIDATION_VALUES.MIN_LENGTH_PASSWORD}).withMessage(MESSAGES_VALIDATION.PASSWORD_TOO_SHORT),
    body('name')
        .trim()
        .notEmpty().withMessage(MESSAGES_VALIDATION.NAME_REQUIRED)
        .isLength({max:VALIDATION_VALUES.MAX_LENGTH_NAME}).withMessage(MESSAGES_VALIDATION.NAME_TOO_LONG),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                errors:errors.array().map(err=>({
                    field:err.path,
                    message:err.msg
                }))
            })
        }
        next();
    }
];

const validateLogin=[
    body('email')
        .trim()
        .isEmail().withMessage(MESSAGES_VALIDATION.EMAIL_INVALID)
        .normalizeEmail(),
    body('password')
        .trim()
        .notEmpty().withMessage(MESSAGES_VALIDATION.PASSWORD_EMPTY),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                errors:errors.array().map(err=>({
                    field:err.path,
                    message:err.msg
                }))
            })
        }
        next();
    }
]

module.exports={
    validateRegister,
    validateLogin   
};