const mongodb = require("mongodb");
const connOptions = { useUnifiedTopology: true };
const database = require("../src/database");

// --- Buscar email de usuario --- ////
const userExist = (email, cbError, cbResultado) => {
  mongodb.MongoClient.connect(database.url, connOptions, (err, client) => {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbError(err);
      return;
    }

    const colUser = client.db(database.db).collection(database.colecciondos);

    colUser.findOne({ email: { $eq: email } }, (err, respuesta) => {
      if (err) {
        console.log("Hubo un error al consultar:", err);
        cbError(err);
        return;
      }
      client.close();
      cbResultado(respuesta);
    });
  });
}; 

// --- Guardar new user --- ////
const userNew = (newUser, cbError, cbResultado) => {
  mongodb.MongoClient.connect(database.url, connOptions, (err, client) => {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbError(err);
      return;
    }

    const colUser = client.db(database.db).collection(database.colecciondos);
 
    colUser.insertOne(newUser, (err, resultado) => {
      if (err) {
        console.log("Hubo un error al consultar:", err);
        cbError(err);
        return;
      }
      client.close();
      cbResultado();
    });
  });
};

// --- Validacion de login --- ////

const userLogin = (email,pass, cbError, cbResultado) => {
  mongodb.MongoClient.connect(database.url , connOptions , (err, client) => {
    if (err) {
      console.log('Hubo un error al conectar al servidor:' , err);
      cbError(err);
      return;
    }
    const colUser = client.db(database.db).collection(database.colecciondos);

    colUser.findOne({ $and: [{ email },{ pass }]}, (err, respuesta) => {
      if (err) {
        console.log('Hubo un error al consultar:' , err);
        cbError(err);
        return;
      }
      client.close();
      cbResultado(respuesta);
    });
  });
};

module.exports = {
  userExist,
  userNew,
  userLogin,
};
