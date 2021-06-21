const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  renderCreateNote,
  renderNotes,
  renderEditForm,
  renderUpdateNote,
  renderDeleteNote 
} = require("../controllers/notes.controller");

// Crear notas
router.get("/notes/add", renderNoteForm); // envio el formulario del servidor para crear nota
router.post("/notes/new-note", renderCreateNote); // recibo los datos que el usuario envio

// Obtener notas
router.get("/notes", renderNotes); // muestra una lista de notas creada en la base de datos
router.get("/notes/all-notes");
// Actualizar notas
router.get("/notes/edit", renderEditForm); // envio un formulario para editar datos
router.post("/notes/edit", renderUpdateNote); // recibo los datos del formulario

// Borrar notas
router.post("/notes/delete", renderDeleteNote); // recibo el id del post de la nota que quiero eliminar

module.exports = router;
