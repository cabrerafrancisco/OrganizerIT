const notesCtrl = {};

const dbNotas = require("../../db/db-notes");
const utils = require("../utils");

// Crear nota
//GET :
notesCtrl.renderNoteForm = (req, res) => {
  if (!req.session.email) {
    req.flash('notificacion' , ' --> Por favor iniciar sesion ')
    res.redirect("/users/login");
    return;
  }
  res.render("notes/new-note" , {
    userName: req.session.name,
  });
};
//POST :
notesCtrl.renderCreateNote = (req, res) => {
  if (!req.session.email) {
    req.flash('notificacion' , ' --> Por favor iniciar sesion ')
    res.redirect("/users/login");
    return;
  }
  const newNote = {
    title: req.body.title,
    description: req.body.description,
    email: req.session.email,
    lastUpdate: new Date()
  };
  dbNotas.createNote(newNote, utils.error, (resultado) => {
    req.flash('notificacion' , ' --> Nota creada ');
    res.redirect("/notes");
  }); // agrega a la db
};

notesCtrl.renderNotes = (req, res) => {
  if (!req.session.email) {
    req.flash('notificacion' , ' --> Por favor iniciar sesion ')
    res.redirect("/users/login");
    return;
  }
  dbNotas.getAllNotes(
    req.query.sortBy,
    req.session.email,
    (err) => {
      res.render("error", {
        error: err,
      });
    },
    (notes) => {
      const empty  = [];
      empty.push({text : `${req.session.name}` })
      if (notes!= '') {
        res.render("notes/all-notes", {
          notes: utils.formatNotesListForView(notes),
          userName: req.session.name,
        });
      }
      else{
        res.render("notes/all-notes", {
          notes: utils.formatNotesListForView(notes),
          userName: req.session.name,
          empty
        });
      }
    }
  );
};

notesCtrl.renderEditForm = (req, res) => {
  if (!req.session.email) {
    req.flash('notificacion' , ' --> Por favor iniciar sesion ')
    res.redirect("/users/login");
    return;
  }
  if (!req.query.id) {
    res.render("error", {
      error: "Información no válida",
    });
    return;
  }
  const myId = req.query.id;

  dbNotas.getNote(
    myId,
    (err) => {
      res.render("error", {
        error: err,
      });
    },
    (note) => {
      if (note.email != req.session.email) {
        const errors = [];
        req.session.destroy();
        res.redirect("/users/login");
        return;
      } else {
        res.render("notes/edit-note", {
          note: utils.formatNotesForView(note),
          userName: req.session.name,
        });
      }
    }
  );
}; 

notesCtrl.renderUpdateNote = (req, res) => {
  if (!req.session.email) {
    req.flash('notificacion' , ' --> Por favor iniciar sesion ')
    res.redirect("/users/login");
    return;
  }

  let notEdit = req.body;
  if (!req.body.id || !utils.isValidNoteData(notEdit)) {
    res.render("error", {
      error:
        "Alguno de los datos están vacíos o no son válidos para la edición",
    });
    return;
  }

  dbNotas.updateNote(
    notEdit.id,
    notEdit,
    (err) => {
      res.render("error", {
        error: err,
      });
    },
    () => {
      req.flash('notificacion' , ' --> Nota actualizada')
      res.redirect("/notes");
    }
  );
};

notesCtrl.renderDeleteNote = (req, res) => {
  if (!req.session.email) {
    req.flash('notificacion' , ' --> Por favor iniciar sesion ')
    res.redirect("/users/login");
    return;
  }
  console.log('AQUI VA EL ID DEL DELETE' , req.query.id);
  
  if (!req.query.id) {
    res.render("error", {
      error: "Información no válida",
    });
    return;
  }
  
  dbNotas.deteleNote(
    req.query.id, 
    (err) => {
      res.render("error", {
        error: err,
      });
    }, 
    () => {
      req.flash('notificacion' , ' --> Nota eliminada')
      res.redirect("/notes"); 
    }
  ); // borra a la db
};

module.exports = notesCtrl;
