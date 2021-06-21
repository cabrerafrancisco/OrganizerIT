require('dotenv').config(); // hace que si un archivo esta en .env declarado como variable lo traiga process.env.VARIABLE

const app = require('./server');
require('./database');

app.listen(app.get('PORT'), () => {
    console.log('server en el puerto:' , app.get('PORT'))
}) 