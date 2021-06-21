const mongodb = require("mongodb");
const connOptions = { useUnifiedTopology: true };
const database = require("../src/database");

// --- MOSTRAR TODAS LAS NOTAS --- ////
const getAllNotes = (sortBy, emailSession ,cbError, cbDatos) => {
  mongodb.MongoClient.connect(database.url,connOptions ,(err, client) => {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbError(err);
      return;
    }

    const colNotas = client.db(database.db).collection(database.coleccion);

    let sortObject;

    switch (sortBy) {
      case "title":
        sortObject = { title: 1 };
        break;
      case "description":
        sortObject = { description: 1 };
        break;
      case "email":
        sortObject = { email: 1 };
        break;
      default:
        sortObject = {};
        break;
    }
 
    colNotas.find({ email: { $eq: emailSession } }).sort(sortObject).toArray(function (err, notas) {
        if (err) {
          console.log("Hubo un error convirtiendo la consulta a Array:", err);
          cbError(err);
          return;
        }
        client.close();
        cbDatos(notas);
      }
    );

  });
};
// --- MOSTRAR UNA NOTA --- ////
const getNote = (id, cbError, cbResultado) => {
  mongodb.MongoClient.connect(database.url,connOptions,(err, client) => {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbError(err);
      return;
    }
    const colNotas = client.db(database.db).collection(database.coleccion);
    colNotas.findOne({ _id: mongodb.ObjectId(id) }, (err, nota) => {
      if (err) {
        console.log("Hubo un error al consultar:", err);
        cbError(err);
        return;
      }
      client.close();
      cbResultado(nota);
    });
  });
};
// --- ACTUALIZA NOTA --- ////
const updateNote = (id, newData, cbError, cbResultado) => {
  mongodb.MongoClient.connect(database.url,connOptions , (err, client) => {
    if (err) {
      cbError(err);
      return;
    }
    const colNotas = client.db(database.db).collection(database.coleccion);
    colNotas.updateOne(
      { _id: mongodb.ObjectId(id) },
      {
        $set: {
          title: newData.title,
          description: newData.description,
        },
      },
      (err, resultado) => {
        if (err) {
          cbError(err);
          return;
        }
        client.close;
        cbResultado();
      }
    );
  });
};

// --- CREAR NOTAS --- ////
const createNote = (nota, cbError, cbResultado) => {
  mongodb.MongoClient.connect(database.url, connOptions, (err, client) => {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbError(err);
      return;
    }

    const colNotas = client.db(database.db).collection(database.coleccion);
    
    colNotas.insertOne(nota, (err, resultado) => {
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

// --- BORRAR NOTAS --- ////
const deteleNote = (id, cbError, cbResultado) => {
  mongodb.MongoClient.connect(database.url,connOptions , (err, client) => {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbError(err);
      return;
    }

    const colNotas = client.db(database.db).collection(database.coleccion);

    colNotas.deleteOne({ _id: mongodb.ObjectId(id) }, (err, result) => {
        if (err) {
          console.log("Hubo un error buscando el id:", err);
          cbError(err);
          return;
        }
        client.close();
        cbResultado();
      });
  });
};

module.exports = {
  getAllNotes,
  createNote,
  deteleNote,
  getNote,
  updateNote,
};
