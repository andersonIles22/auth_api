const db=require('../config/database');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {error}=require('../middleware/errorHandler');
const {HTTP_STATUS}=require('../constants/httpStatusCode');
const {MESSAGES_OPERATION}=require('../constants/statusMessages');
const { parseTime } = require('../helpers/parseTime');
const { user } = require('pg/lib/defaults');

const register=async (req,res,next)=>{
    try {
        //CHECK IF EMAIL ALREADY EXISTS
        const {email, password, name}=req.body;
        const queryRegister=await db.query('SELECT id FROM users_admin WHERE email=$1',[email]);
        
        if(queryRegister.rows.length>0){
            return error(HTTP_STATUS.BAD_REQUEST,MESSAGES_OPERATION.EMAIL_ALREADY_EXIST,next)
        }
        //HASH PASSWORD
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        // CREATE USER
        const result =await db.query('INSERT INTO users_admin (email,password,name) VALUES($1,$2,$3) RETURNING *',[email,hashedPassword,name]);
        const userCreated= result.rows[0];

        const token=jwt.sign(
            {id:userCreated.id, email:userCreated.email},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN||'12H'}
        );
        //RESPONSE
        res.status(HTTP_STATUS.CREATED).json({
            seccess:true,
            data:{
                userCreated:{
                    id:userCreated.id,
                    email:userCreated.email,
                    name:userCreated.name,
                    created_at:userCreated.created_at
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
}

const login=async(req,res,next)=>{
try {
    const { email, password } = req.body;
    
    // Verificar que usuario existe
    const result = await db.query(
      'SELECT * FROM users_admin WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return error(HTTP_STATUS.AUTHORIZATION_REQUIRED,MESSAGES_OPERATION.CREDENCIAL_INVALID,next);
    }
    
    const user = result.rows[0];
    // Verificar password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return error(HTTP_STATUS.AUTHORIZATION_REQUIRED,MESSAGES_OPERATION.CREDENCIAL_INVALID,next);
    }

    // Generar Refresh token
    const refreshToken=jwt.sign(
        {id:user.id},
        process.env.JWT_SECRET_REFRESH,
        {expiresIn:process.env.JWT_REFRESH_EXPIRES_IN||'7d'}
      );
    
    // Refresh Token Hasheada
    const saltTokenRefresh =await bcrypt.genSalt(10);
    const hashedTokenRefresh=await bcrypt.hash(refreshToken,saltTokenRefresh);
    
    // Tiempo de expiración del Refresh Token
    const refreshTokenExpiresAt= new Date(Date.now() + parseTime(process.env.JWT_REFRESH_EXPIRES_IN||'7d'));
    //  Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15min' }
    );
    // Almacenar el Refresh Token Hasheado en la base de datos
    await db.query(
      `INSERT INTO refresh_token (id_user,token,expires_at) VALUES ($1,$2,$3)`,[user.id,hashedTokenRefresh,refreshTokenExpiresAt]
    )

    // Enviar Refresh Token a una cookie segura
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      expires: refreshTokenExpiresAt
    });
    //  Responder (NO enviamos password)
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      }
    });
    
  } catch (error) {
    next(error);
  }
}

const refreshToken= async(req,res,next)=>{
  const {refreshToken}=req.cookies;
  try {
    if(!refreshToken) return error(401,MESSAGES_OPERATION.TOKEN_INVALID,next)
      //Validamos y decodificamos el JWT
    const decoded=jwt.verify(refreshToken,process.env.JWT_SECRET_REFRESH);
    const {id}=decoded;
  //Consultamos el refresh token de la db
    const querySearchTokenRefresh=await db.query(
      `SELECT token,expires_at,isrevoked FROM refresh_token WHERE id_user=$1`,[id]);
    //console.log(id,querySearchTokenRefresh,querySearchTokenRefresh.rows[0]);
    
      const {token,expires_at,isrevoked}=querySearchTokenRefresh.rows[0];

    //verificamos si coinciden el refresh token obtenido y el de la db
    const isMatch=await bcrypt.compare(refreshToken,token);
    if(!isMatch) return error(401,MESSAGES_OPERATION.CREDENCIAL_INVALID,next);
    
    //verificamos si el token ha expirado
    let dateToExpireToken= new Date(expires_at);
    if(Date.now>=dateToExpireToken) return error(401,MESSAGES_OPERATION.TOKEN_EXPIRED,next);

    //verificamos si el token ha sido revocado
    if(isrevoked===true) return error(401,MESSAGES_OPERATION.TOKEN_INVALID,next);

    //Creamos nuevo token
    const queryData=await db.query(
      `SELECT id,email FROM users_admin WHERE id=$1`,
      [id]
    )
    const user=queryData.rows[0];
    const newToken=jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15min' }
    );

    // Respondemos con el token nuevo
    res.json({
      accessToken: newToken
    });
  } catch (error) {
    next(error);
  }
}
const getAll=async(req,res,next)=>{
  try {
    const queryAllNotes=await db.query('SELECT id,name,email FROM users_admin');
    res.status(HTTP_STATUS.OK).json({
      success:true,
      data:queryAllNotes.rows
    });
  } catch (error) {
    next(error);
  }
}


module.exports={
    register,
    login,
    getAll,
    refreshToken
}