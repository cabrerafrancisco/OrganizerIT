const mongoClient = require("mongodb").MongoClient;
const dbURL = process.env.DBURL;

mongoClient.connect(dbURL , {useUnifiedTopology:true} , (err , client) => {
    if (err) {
        console.log("Hubo un error:" , err);
        return;
    }
    console.log("No hubo error");
});

module.exports = {
    url : dbURL,
    db: "organizarIT",
    coleccion: "notas",
    colecciondos : "users"
};