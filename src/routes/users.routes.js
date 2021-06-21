const { Router } = require("express");
const router = Router();

const { 
    renderRegister,
    register,
    renderLogin,
    login,
    logout
 } = require('../controllers/users.controller')
// REGISTRO
router.get('/users/register' , renderRegister ); // envia al formulario para registrar user
router.post('/users/register' , register); // manda los datos cargados en el form de register
// INICIO DE SESION 
router.get('/users/login' , renderLogin); // envia formulario para iniciar sesion
router.post('/users/login' , login); // manda los datos cargados en el form de login
// CERRAR SESION
router.get('/users/logout' , logout); // para cerrar la sesion

module.exports =  router;