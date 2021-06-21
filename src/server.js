const express = require("express");
const exphbs = require('express-handlebars');
const path = require("path");
const flash = require('connect-flash');
const session = require('express-session');

// Initializations
const app = express();

// Setting
app.set('PORT' , process.env.PORT || 3000); //le digo que use el puerto que entrega el sistema sino el puerto 3k
app.set('views' , path.join(__dirname, 'views'));
app.engine('.hbs' , exphbs({
    defaultLayout: 'main',
    layoutsDir : path.join(app.get('views') , 'layouts'),
    partialsDir: path.join(app.get('views') , 'partials'),
    extname:'.hbs' // Se agrega para no estar poniendo '.hbs' todo el tiempo
}));
app.set("view engine", ".hbs");

// Middlewares
app.use(express.urlencoded({ extended: false })); //sea capas de entender los datos del form de un HTML
app.use(session({ 
    secret: "2C44-4D44-WppQ38S", // palabra secreta
    resave: true,
    saveUninitialized: true
}));// modulo que nos va a ayudar los mensajes en el servidor 
app.use(flash());// este modulo nos ayuda a mostrar los mensajes desp de una accion

// Global variables
app.use((req, res, next) => {
    res.locals.notificacion = req.flash('notificacion');
    next();
})
// Routes

app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// Public files
app.use(express.static(path.join(__dirname, 'public'))); // basicamente le indica a node 'aqui esta la carpeta publica' 

module.exports = app;