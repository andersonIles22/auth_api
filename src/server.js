const express = require('express');
const {HTTP_STATUS}=require('./constants/httpStatusCode');
const {MESSAGES_OPERATION}=require('./constants/statusMessages');
const { errorHandler, error } = require('./middleware/errorHandler');
const { router } = require('./routes/authPublicRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Auth API is running',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me (protected)'
    }
  });
});

app.use('/api/auth',router);

// Error handling
app.use((req,res,next)=>{
    error(HTTP_STATUS.NOT_FOUND,MESSAGES_OPERATION.URL_NO_FOUND(req.originalUrl),next);
})
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Auth API running on port ${PORT}`);
});