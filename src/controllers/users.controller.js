const usersCtrl = {};
const dbUsers = require("../../db/db-users");
const { db } = require("../database");

// get del register
usersCtrl.renderRegister = (req, res) => {
  res.render("users/register");
};
// analiza el mail ingresado y acepta o no al nuevo user
// post del register
usersCtrl.register = (req, res) => {
  const errors = []; // array que almacenara los msj de error
  const { name, email, pass, passrepeat } = req.body;

  if (pass != passrepeat) {
    errors.push({ text: "Passwords no coinciden" });
  }
  if (pass == name) {
    errors.push({ text: "Password coincide con el nombre" });
  }
  if (errors.length > 0) {
    res.render("users/register", {
      errors,
      name,
      email,
    });
    return;
  }
  dbUsers.userExist(
    email,
    (err) => {
      res.render("error", {
        error: err,
      });
      return;
    },
    (resp) => {
      if (resp != null) {
        errors.push({ text: "Usuario ya registrado, intente nuevamente" });
        res.render("users/register", {
          errors,
          name,
          email,
        });
        return;
      } else {
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          pass: req.body.pass,
        };
        dbUsers.userNew(
          newUser,
          (err) => {
            res.render("error", {
              error: err,
            });
            return;
          },
          () => {
            req.flash('notificacion' , '  --> Usuario creado con Exito ')
            res.redirect("/users/login");
          }
        );
      }
    }
  );
};
// get del login
usersCtrl.renderLogin = (req, res) => {
  res.render("users/login");
};
// post del login
usersCtrl.login = (req, res) => {
  const errors = [];
  const { email, pass } = req.body;
  dbUsers.userLogin(
    email,
    pass,
    (err)=> {
      res.render('error' , {
        error:err,
      });
      return;
    },
    (result) => {
      if(result == null){
        errors.push({ text: "Usuario inexistente o campos mal ingresados"});
        res.render('users/login', {
          errors,
          email,
        });
        return;
      }else{
        req.session.name = result.name;
        req.session.email = result.email;
        res.redirect("/");
      }
    }
  );
};

usersCtrl.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = usersCtrl;
